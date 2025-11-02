import vine from '@vinejs/vine'


export const bookingCreate = vine.compile(
  vine.object({
    userId: vine.number().positive(),
    serviceSlotInfoId: vine.number().positive().optional(),
    serviceMembershipInfoId: vine.number().positive().optional(),
    startAt: vine.date({ formats: ['iso'] }).after('now')
  })
)
// Booking update validator
export const bookingUpdate = vine.compile(
  vine.object({
    startAt: vine.date({ formats: ['iso'] }).after('now').optional(),
    serviceSlotInfoId: vine.number().positive().optional(),
    serviceMembershipInfoId: vine.number().positive().optional(),
  })
)

