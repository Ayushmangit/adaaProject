import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'services'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable().unique()
      table.string('img_url', 255).notNullable() // TODO: remove limit
      table.text('description').nullable()
      table.boolean('is_active').defaultTo('true') // TODO: make it a enum: ["comming soon", "active", "maitaince..."] (default: activ)
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
