import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_slot_info_id').references('service_slot_info.id')
      table.integer('service_membership_info_id').references('service_membership_info.id')
      table.integer('user_id').references('users.id')
      table.timestamp('start_at').notNullable()
      //table.enu('payment_mode',['upi','cash'])
      //table.boolean('payment_status').defaultTo('false')
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
