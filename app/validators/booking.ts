import vine from '@vinejs/vine'
import { DateTime } from 'luxon'


export const bookingCreate = vine.compile(
  vine.object({
    userId: vine.number().positive(),
    serviceId: vine.number().positive(),
    serviceSlotInfoId: vine.number().positive().optional(),
    serviceMembershipInfoId: vine.number().positive().optional(),
    startAt: vine.date({ formats: ['iso8601'] }).after(() => DateTime.now().toISODate())
  })
)
// Booking update validator
export const bookingUpdate = vine.compile(
  vine.object({
    startAt: vine.date({ formats: ['iso8601'] }).after(() => DateTime.now().toISODate()),
    serviceSlotInfoId: vine.number().positive().optional(),
    serviceMembershipInfoId: vine.number().positive().optional(),
  })
)

