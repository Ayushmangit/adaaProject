import Service from '#models/service'
import ServiceSlotInfo from '#models/service_slot_info'
import { slotCreation, slotUpdate } from '#validators/slot_info'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesSlotInfoController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const slotInfo = await ServiceSlotInfo.query().preload('service')
    return response.ok({ msg: 'All the services with slot Info', slotInfo })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = await slotCreation.validate(request.all())
    const service = await Service.find(data.serviceId)
    if (!service) return response.notFound({ msg: 'Service not found' })
    if (service.serviceType !== 'slot') return response.badRequest({ msg: 'Slots can\'t be created for memberships' })

    const slotInfoCreation = await ServiceSlotInfo.create(data)
    return response.ok({ msg: 'slot created successfully', slotInfoCreation })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const serviceSlotToShow = await ServiceSlotInfo.query().where('id', params.service_slot_info_id).preload('service').first()
    if (!serviceSlotToShow) return response.notFound({ msg: 'slot information not found' })
    return response.ok({ msg: 'service slot retrieved successfully', data: serviceSlotToShow })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await slotUpdate.validate(request.all())
    const slotToUpdate = await ServiceSlotInfo.query().where('id', params.service_slot_info_id).preload('service').first()
    if (!slotToUpdate) return response.notFound({ msg: `No available slot for the id:${params.service_slot_info_id}` })
    slotToUpdate.merge(data)
    await slotToUpdate.save()

    return response.ok({ msg: 'Slot updated Successfully', data: slotToUpdate })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const slotToDelete = await ServiceSlotInfo.query().where('id', params.service_slot_info_id).preload('service').first()
    if (!slotToDelete) return response.notFound({ msg: `No slot found with the id: ${params.service_slot_info_id}` })
    await slotToDelete.delete()
    return response.ok({ msg: 'slot deleted' })
  }
}
