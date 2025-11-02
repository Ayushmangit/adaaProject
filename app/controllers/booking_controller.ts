import Booking from '#models/booking'
import type { HttpContext } from '@adonisjs/core/http'

export default class BookingController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const bookings = await Booking.query().preload('serviceSlotInfos')
      .preload('user').preload('serviceMembershipInfos')
    return response.ok({ msg: 'all the bookings', data: bookings })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.all()

    const booking = await Booking.create(data)
    return response.created({
      msg: 'Booking  created successfully',
      data: booking
    })

  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const booking = await Booking.query().where("id", params.id).preload('serviceSlotInfos').first()
    if (!booking) return response.notFound({ msg: 'not found' })

    return response.ok({ msg: 'Record Found', data: booking })
  }

  /**
   * Handle form submission for the edit action
   */ async update({ params, request, response }: HttpContext) {
    const payload = request.all()
    const bookingToUpdate = await Booking.query().where('id', params.id).preload('serviceSlotInfos').first()
    if (!bookingToUpdate) return response.notFound({ msg: 'Resource not found' })
    bookingToUpdate.merge(payload)
    await bookingToUpdate.save()
    return response.ok({ msg: 'Booking updated successfully', data: bookingToUpdate })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const bookingToDelete = await Booking.query().where('id', params.id).preload('serviceSlotInfos')
    if (!bookingToDelete) return response.notFound({ msg: 'Resource not found' })
    return response.ok({ msg: 'Booking deleted successfully' })
  }
}
