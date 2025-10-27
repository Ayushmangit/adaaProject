import vine from '@vinejs/vine'

export const updateServiceValidator = vine.compile(vine.object(
  {
    name: vine.string().minLength(3),
    start: vine.string().maxLength(4),
    end: vine.string().maxLength(4),
    price: vine.number().positive().withoutDecimals(),
  }
))
