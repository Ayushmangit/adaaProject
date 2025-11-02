import vine from '@vinejs/vine'

export const userRegister = vine.compile(vine.object({
  name: vine.string().minLength(3),
  email: vine.string().email().normalizeEmail().optional(),
  role: vine.enum(['admin', 'client']),
  password: vine.string().minLength(8),
  phone_no: vine.string().maxLength(10).minLength(10).optional()
}))

export const userUpdate = vine.compile(vine.object({
  name: vine.string().minLength(3),
  email: vine.string().email().normalizeEmail().optional(),
  password: vine.string().minLength(8),
  phone_no: vine.string().maxLength(10).minLength(10).optional()
}))
