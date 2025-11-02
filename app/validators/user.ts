import vine from '@vinejs/vine'

export const userRegister = vine.compile(vine.object({
  name: vine.string().minLength(3).trim(),
  email: vine.string().email().normalizeEmail().trim().optional(),
  role: vine.enum(['admin', 'client']),
  password: vine.string().minLength(8),
  phoneNo: vine.string().regex(/^\d{10}$/).optional()
}))

export const userUpdate = vine.compile(vine.object({
  name: vine.string().minLength(3).trim(),
  email: vine.string().email().trim().normalizeEmail().optional(),
  password: vine.string().minLength(8),
  phoneNo: vine.string().regex(/^\d{10}$/).optional()
}))
