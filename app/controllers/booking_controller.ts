import Booking from '#models/booking'
import { bookingCreate, bookingUpdate } from '#validators/booking'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BookingController {
  async index({ response }: HttpContext) {
    const bookings = await Booking.query().preload('serviceSlotInfos')
      .preload('user').preload('serviceMembershipInfos')
    return response.ok(bookings)
  }


  async store({ request, response }: HttpContext) {
    const data = await bookingCreate.validate(request.all())
    console.log(data)

    if (data.serviceMembershipInfoId && data.serviceSlotInfoId) {
      return response.badRequest({ msg: 'either slot or membership can be chosen at once' })
    }
    if (!data.serviceMembershipInfoId && !data.serviceSlotInfoId) {
      return response.badRequest({ msg: 'either one slot or a membership should be selected' })
    }
    const booking = await Booking.create({ ...data, startAt: DateTime.fromJSDate(data.startAt) })
    return response.created(booking)

  }

  async show({ params, response }: HttpContext) {
    const booking = await Booking.query().where("id", params.booking_id).preload('serviceSlotInfos').first()
    if (!booking) return response.notFound({ msg: 'not found' })

    return response.ok(booking)
  }


  async update({ params, request, response }: HttpContext) {
    const payload = await bookingUpdate.validate(request.all)
    const bookingToUpdate = await Booking.query().where('id', params.booking_id).preload('serviceSlotInfos').first()
    if (!bookingToUpdate) return response.notFound({ msg: 'Resource not found' })
    if (payload.serviceMembershipInfoId && payload.serviceSlotInfoId) {
      return response.badRequest({ msg: 'either slot or membership can be chosen at once' })
    }
    if (!payload.serviceMembershipInfoId && !payload.serviceSlotInfoId) {
      return response.badRequest({ msg: 'either one slot or a membership should be selected' })
    }
    let startAtConverted
    if (payload.startAt) {
      startAtConverted = DateTime.fromJSDate(payload.startAt)
    }
    bookingToUpdate.merge({ ...payload, startAt: startAtConverted })
    await bookingToUpdate.save()
    return response.ok(bookingToUpdate)
  }

  async destroy({ params, response }: HttpContext) {
    const bookingToDelete = await Booking.query().where('id', params.booking_id).preload('serviceSlotInfos')
    if (!bookingToDelete) return response.notFound({ msg: 'Resource not found' })
    return response.ok({ msg: 'Booking deleted successfully' })
  }
}
