import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "periods";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("period_name");
      table.string("period_month", 10);
      table.integer("period_year");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
