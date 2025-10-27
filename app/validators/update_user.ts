import vine from '@vinejs/vine'

export const updateUserValidator = vine.compile(vine.object({
  name: vine.string().trim().minLength(3),
  email: vine.string().email().normalizeEmail(),
  password: vine.string().minLength(8),
  roleId: vine.number().exists({ table: 'roles', column: 'id' }),
  membership: vine.boolean().optional()
}))
