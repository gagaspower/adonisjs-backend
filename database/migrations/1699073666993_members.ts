import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "members";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("member_name");
      table.string("gender");
      table.string("religion");
      table.integer("age");
      table.integer("user_id_reference").unsigned();
      table.timestamp("created_at").defaultTo(this.now());
      table.timestamp("updated_at").defaultTo(this.now());
      table.index("user_id_reference");
      table.foreign("user_id_reference").references("users.id");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
