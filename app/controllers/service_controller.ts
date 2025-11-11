import Service from '#models/service'
import { serviceCreate, serviceUpdate } from '#validators/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServiceController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const services = await Service.query()
    return response.ok({ msg: 'All services', services })
  }

  /**
   * Display form to create a new record
   */
  async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const service = await serviceCreate.validate(request.all())
    if (service.openAtSec > service.closeAtSec) return response.badRequest('The closing time should be greater than opening time')
    const createdService = await Service.create(service)
    response.ok({ msg: 'Service created successfully,', createdService })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const service = await Service.find(params.service_id)
    if (!service) return response.notFound({ msg: `Service with id: ${params.service_id} does not exist` })
    return response.ok({ msg: 'Single service', service })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await serviceUpdate.validate(request.all())
    console.log(params.service_id)
    const serviceToUpdate = await Service.find(params.service_id)
    if (!serviceToUpdate) return response.notFound({ msg: `No service with id: ${params.service_id} exist` })
    serviceToUpdate.merge(data)
    await serviceToUpdate.save()
    return response.ok({ msg: 'Service updated successfully', serviceToUpdate })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const serviceToDelete = await Service.find(params.service_id)
    if (!serviceToDelete) return response.notFound({ msg: 'Service not found' })
    await serviceToDelete.delete()
    return response.ok({ msg: 'Service deleted successfully' })
  }
}
