import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bookings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('users.id').onDelete('CASCADE')
      table.integer('service_id').references('services.id').notNullable().onDelete('CASCADE')
      table.integer('service_slot_info_id').references('service_slot_infos.id').nullable()
        .onDelete('SET NULL')
      table.integer('service_membership_info_id').references('service_membership_infos.id').nullable().onDelete('CASCADE')
      table.timestamp('start_at').notNullable()
      //table.enu('payment_mode',['upi','cash'])
      //table.boolean('payment_status').defaultTo('false')
      table.unique(['service_id', 'service_slot_info_id', 'start_at'])
      table.unique(['service_id', 'service_membership_info_id', 'start_at'])
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
    this.schema.raw(`
      ALTER TABLE ${this.tableName}
      ADD CONSTRAINT only_one_service_type
      CHECK (
        (service_slot_info_id IS NULL AND service_membership_info_id IS NOT NULL)
        OR
        (service_slot_info_id IS NOT NULL AND service_membership_info_id IS NULL)
      )
    `)
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
