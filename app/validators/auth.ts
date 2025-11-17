import vine from '@vinejs/vine'


export const registerUser = vine.compile(vine.object({
  name: vine.string().minLength(3).trim().toLowerCase(),
  role: vine.enum(['admin', 'client']),
  email: vine.string().email().normalizeEmail().unique(async (db, value) => {
    const match = await db.from('users').select('id').where('name', value).first()
    return !match
  }),
  password: vine.string().minLength(8),
  phoneNo: vine.string().regex(/^\d{10}$/).optional()
}))

export const updateUser = vine.compile(vine.object({
  name: vine.string().minLength(3).trim().toLowerCase().optional(),
  role: vine.enum(['admin', 'client']).optional(),
  email: vine.string().email().normalizeEmail().trim().optional(),
  password: vine.string().minLength(8).optional(),
  phoneNo: vine.string().regex(/^\d{10}$/).optional()
}))

export const loginUser = vine.compile(vine.object({
  name: vine.string().minLength(3).trim().toLowerCase(),
  password: vine.string().minLength(8)
}))
