import vine from '@vinejs/vine'
import { DurationMonths, MembershipType } from '../enum/Membership.js'

export const membershipCreate = vine.compile(vine.object({
  serviceId: vine.number().positive(),
  durationMonths: vine.enum(Object.values(DurationMonths)),
  priceInr: vine.number().positive(),
  type: vine.enum(Object.values(MembershipType)),
}))

export const membershipUpdate = vine.compile(vine.object({
  serviceId: vine.number().positive().optional(),
  durationMonths: vine.enum(Object.values(DurationMonths)).optional(),
  priceInr: vine.number().positive().optional(),
  type: vine.enum(Object.values(MembershipType)).optional()
}))



