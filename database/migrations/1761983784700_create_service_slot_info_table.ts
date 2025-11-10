import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'service_slot_infos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('service_id').references('services.id').unsigned().onDelete('CASCADE')
      table.integer('duration_sec').notNullable() //TODO: make it unsigined
      table.integer('price_inr').notNullable().unsigned()

      //TODO: table.unique(["service_id", 'duration_sec])
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
