import vine from '@vinejs/vine'

export const serviceCreate = vine.compile(vine.object({
  name: vine.string().toLowerCase().trim(),
  img_url: vine.string().url().optional(),
  description: vine.string(),
  openAtSec: vine.number().min(0).max(24 * 60 * 60 * 60),
  closeAtSec: vine.number().min(0).max(24 * 60 * 60 * 60),
}))
