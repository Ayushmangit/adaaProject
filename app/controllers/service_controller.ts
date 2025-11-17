import Service from '#models/service'
import { serviceCreate, serviceUpdate } from '#validators/service'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServiceController {
  async index({ response }: HttpContext) {
    const services = await Service.query()
    return response.ok(services)
  }

  async create({ }: HttpContext) { }

  async store({ request, response }: HttpContext) {
    const service = await serviceCreate.validate(request.all())
    if (service.openAtSec > service.closeAtSec) return response.badRequest('The closing time should be greater than opening time')
    const createdService = await Service.create(service)
    response.ok(createdService)
  }

  async show({ params, response }: HttpContext) {
    const service = await Service.find(params.service_id)
    if (!service) return response.notFound({ msg: `Service with id: ${params.service_id} does not exist` })
    return response.ok(service)
  }

  async update({ params, request, response }: HttpContext) {
    const data = await serviceUpdate.validate(request.all())
    console.log(params.service_id)
    const serviceToUpdate = await Service.find(params.service_id)
    if (!serviceToUpdate) return response.notFound({ msg: `No service with id: ${params.service_id} exist` })
    serviceToUpdate.merge(data)
    await serviceToUpdate.save()
    return response.ok(serviceToUpdate)
  }

  async destroy({ params, response }: HttpContext) {
    const serviceToDelete = await Service.find(params.service_id)
    if (!serviceToDelete) return response.notFound({ msg: 'Service not found' })
    await serviceToDelete.delete()
    return response.ok({ msg: 'Service deleted successfully' })
  }
}
