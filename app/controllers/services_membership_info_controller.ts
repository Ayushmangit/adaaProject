import ServiceMembershipInfos from '#models/service_membership_info'
import type { HttpContext } from '@adonisjs/core/http'

export default class ServicesMembershipInfoController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const servicesWithMembership = await ServiceMembershipInfos.query().preload('service')
    return response.ok({ msg: 'all the services with memberships', data: servicesWithMembership })
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
    const membershipCreated = await ServiceMembershipInfos.create(data)
    return response.ok({ msg: 'membership created successfully', data: membershipCreated })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const membership = await ServiceMembershipInfos.query().where('id', params.id).preload('service')
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    return response.ok({ msg: 'membership found', data: membership })
  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const payload = request.all()
    const membership = await ServiceMembershipInfos.find(params.id)
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    membership.merge(payload)
    await membership.save()
    return response.ok({ msg: 'updated successfully', membership })
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const membership = await ServiceMembershipInfos.find(params.id)
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    membership.delete()
    return response.ok({ msg: 'deleted successfully' })
  }
}
