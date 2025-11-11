import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import * as relations from '@adonisjs/lucid/types/relations'
import ServiceMembershipInfos from './service_membership_info.js'
import User from './user.js'
import ServiceSlotInfos from './service_slot_info.js'
import Service from './service.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serviceId: number

  @column()
  declare serviceSlotInfoId: number | null

  @column()
  declare serviceMembershipInfoId: number | null

  @column()
  declare userId: number

  @column.dateTime()
  declare startAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ServiceSlotInfos, {
    foreignKey: 'serviceSlotInfoId',
  })
  declare serviceSlotInfos: relations.BelongsTo<typeof ServiceSlotInfos>

  @belongsTo(() => ServiceMembershipInfos, {
    foreignKey: 'serviceMembershipInfoId',
  })
  declare serviceMembershipInfos: relations.BelongsTo<typeof ServiceMembershipInfos>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: relations.BelongsTo<typeof User>

  @belongsTo(() => Service, {
    foreignKey: 'serviceId'
  })
  declare service: relations.BelongsTo<typeof Service>
}


