import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Service from './service.js'
import * as relations from '@adonisjs/lucid/types/relations'
import { DurationMonths, MembershipType } from '../enum/Membership.js'

export default class ServiceMembershipInfos extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serviceId: number

  @column()
  declare durationMonths: DurationMonths

  @column()
  declare priceInr: number

  @column()
  declare type: MembershipType

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Service, {
    foreignKey: 'serviceId',
  })
  declare service: relations.BelongsTo<typeof Service>
}
