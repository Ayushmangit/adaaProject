import vine from '@vinejs/vine'

export const slotCreation = vine.compile(vine.object({
  serviceId: vine.number().positive(),
  durationSec: vine.number().positive().min(3600),
  priceInr: vine.number().positive()
}))

export const slotUpdate = vine.compile(vine.object(
  {
    durationSec: vine.number().positive().min(3600).optional(),
    priceInr: vine.number().positive().optional()
  }
))
