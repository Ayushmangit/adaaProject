import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('name', 100).notNullable().unique() //TODO: remove limit
      table.enu('role', ['admin', 'client']).notNullable().defaultTo('client')
      table.string('email', 254).nullable().unique()
      table.string('password', 255).notNullable()
      table.string('phone_no', 10).nullable()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
