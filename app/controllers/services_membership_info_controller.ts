import ServiceMembershipInfos from '#models/service_membership_info'
import { membershipCreate, membershipUpdate } from '#validators/service_membership'
import type { HttpContext } from '@adonisjs/core/http'
import { DurationMonths, MembershipType } from '../enum/Membership.js'

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
    const data = await membershipCreate.validate(request.all())
    const membershipCreated = await ServiceMembershipInfos.create({
      ...data,
      durationMonths: data.durationMonths as DurationMonths,
      type: data.type as MembershipType,
    })
    return response.ok({ msg: 'membership created successfully', data: membershipCreated })
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const membership = await ServiceMembershipInfos.query().where('id', params.service_membership_info_id).preload('service')
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
    const payload = await membershipUpdate.validate(request.all())
    const membership = await ServiceMembershipInfos.find(params.service_membership_info_id)
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    membership.merge({
      serviceId: payload.serviceId,
      durationMonths: payload.durationMonths as DurationMonths,
      priceInr: payload.priceInr,
      type: payload.type as MembershipType,
    })
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
