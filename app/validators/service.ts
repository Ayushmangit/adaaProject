import vine from '@vinejs/vine'

export const serviceCreate = vine.compile(vine.object({
  name: vine.string().toLowerCase().trim(),
  imgUrl: vine.string().url(),
  description: vine.string(),
  serviceType: vine.enum(['membership', 'slot']),
  openAtSec: vine.number().min(0).max(24 * 60 * 60),
  closeAtSec: vine.number().min(0).max(24 * 60 * 60),

}))



export const serviceUpdate = vine.compile(vine.object({
  name: vine.string().toLowerCase().trim().optional(),
  imgUrl: vine.string().url().optional(),
  description: vine.string().optional(),
  serviceType: vine.enum(['membership', 'slot']).optional(),
  openAtSec: vine.number().min(0).max(24 * 60 * 60 * 60),
  closeAtSec: vine.number().min(0).max(24 * 60 * 60 * 60),
}))

