import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import ServiceSlotInfos from './service_slot_info.js'
import * as relations from '@adonisjs/lucid/types/relations'
import ServiceMembershipInfos from './service_membership_info.js'
import Booking from './booking.js'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare imgUrl: string

  @column()
  declare description: string

  @column()
  declare openAtSec: number

  @column()
  declare closeAtSec: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ServiceSlotInfos)
  declare slotInfos: relations.HasMany<typeof ServiceSlotInfos>

  @hasMany(() => ServiceMembershipInfos)
  declare membershipInfos: relations.HasMany<typeof ServiceMembershipInfos>

  @hasMany(() => Booking)
  declare bookings: relations.HasMany<typeof Booking>
}
