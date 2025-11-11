import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'service_membership_infos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_id').references('services.id').unsigned().onDelete('CASCADE')
      table.enu('duration_months', [1, 3, 6, 12]).notNullable()
      table.integer('price_inr').notNullable().unsigned()
      table.enu('type', ['single', 'couple', 'family']).notNullable()
      table.timestamps(true, true)
      table.unique(['service_id', 'type', 'duration_months'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
