import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.string('img_url').notNullable()
      table.text('description').nullable()
      table.enu('status', ['coming Soon', 'active', 'maintainance']).notNullable().defaultTo('active')
      table.integer('open_at_sec').notNullable()
      table.integer('close_at_sec').notNullable()
      table.check('open_at_sec < close_at_sec')
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
