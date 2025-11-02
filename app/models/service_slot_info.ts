import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Service from './service.js'
import * as relations from '@adonisjs/lucid/types/relations'

export default class ServiceSlotInfo extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serviceID: number

  @column()
  declare durationSec: number

  @column()
  declare priceInr: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'serviceId'
  })
  declare service: relations.BelongsTo<typeof Service>
}
