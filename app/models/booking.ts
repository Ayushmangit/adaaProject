import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ServiceSlotInfo from './service_slot_info.js'
import * as relations from '@adonisjs/lucid/types/relations'
import ServiceMembershipInfo from './service_membership_info.js'
import User from './user.js'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare serviceSlotInfoId: number

  @column()
  declare serviceMembershipInfoId: number

  @column()
  declare userId: number

  @column.dateTime()
  declare startAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => ServiceSlotInfo, {
    foreignKey: 'serviceSlotInfoId',
  })
  declare serviceSlotInfo: relations.BelongsTo<typeof ServiceSlotInfo>

  @belongsTo(() => ServiceMembershipInfo, {
    foreignKey: 'serviceMembershipInfoId',
  })
  declare serviceMembershipInfo: relations.BelongsTo<typeof ServiceMembershipInfo>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: relations.BelongsTo<typeof User>
}


