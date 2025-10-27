import vine from '@vinejs/vine'

export const updateRoleValidator = vine.compile(vine.object({
  name: vine.string().minLength(3),
}))
