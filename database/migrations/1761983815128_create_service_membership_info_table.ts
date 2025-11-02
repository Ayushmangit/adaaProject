import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'service_membership_info'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_id').references('services.id')
      table.integer('duration_months').notNullable()
      table.integer('price_inr').notNullable()
      table.enu('type', ['single', 'couple', 'family'])
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
