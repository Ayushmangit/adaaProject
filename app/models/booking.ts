import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import Service from './service.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId'
  })

  declare user: BelongsTo<typeof User>

  @column()
  declare serviceId: number

  @belongsTo(() => Service, {
    foreignKey: 'serviceId'
  })
  declare service: BelongsTo<typeof Service>

  @column()
  declare timeSlot: string

  @column()
  declare paymentMode: string

  @column()
  declare paymentStatus: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
