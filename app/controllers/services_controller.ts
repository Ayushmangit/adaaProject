import Service from '#models/service'
import { createServiceValidator } from '#validators/create_service'
import { updateServiceValidator } from '#validators/update_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const services = await Service.query()
    if (!services) return response.notFound('Bhai khali hai services')
    return response.ok({ msg: 'testing will delete later', services })
  }


  async store({ request, response }: HttpContext) {
    const data = await createServiceValidator.validate(request.all())
    const service = await Service.create(data)
    return response.ok({ msg: 'Service is created', data: service })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const service = await Service.find(params.id)
    if (!service) return response.notFound('Service not found')
    return response.ok(service)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const data = await updateServiceValidator.validate(request.all())
    const service = await Service.find(params.id)
    if (!service) return response.notFound('Service not found')
    service.merge(data)
    await service.save()

    return response.ok({ msg: 'Service updated successfully', data: service })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const service = await Service.find(params.id)
    if (!service) return response.notFound('Service not found')
    service.delete()
    return response.ok('Service deleted successfully')
  }
}
