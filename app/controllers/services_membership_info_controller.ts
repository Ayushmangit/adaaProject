import ServiceMembershipInfos from '#models/service_membership_info'
import { membershipCreate, membershipUpdate } from '#validators/service_membership'
import type { HttpContext } from '@adonisjs/core/http'
import { DurationMonths, MembershipType } from '../enum/Membership.js'

export default class ServicesMembershipInfoController {
  async index({ response }: HttpContext) {
    const servicesWithMembership = await ServiceMembershipInfos.query().preload('service')
    return response.ok(servicesWithMembership)
  }



  async store({ request, response }: HttpContext) {
    const data = await membershipCreate.validate(request.all())
    const membershipCreated = await ServiceMembershipInfos.create({
      ...data,
      durationMonths: data.durationMonths as DurationMonths,
      type: data.type as MembershipType,
    })
    return response.ok(membershipCreated)
  }

  async show({ params, response }: HttpContext) {
    const membership = await ServiceMembershipInfos.query().where('id', params.service_membership_info_id).preload('service')
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    return response.ok(membership)
  }


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
    return response.ok(membership)
  }

  async destroy({ params, response }: HttpContext) {
    const membership = await ServiceMembershipInfos.find(params.service_membership_info_id)
    if (!membership) return response.notFound({ msg: 'No membership exist' })
    membership.delete()
    return response.ok({ msg: 'deleted successfully' })
  }
}
