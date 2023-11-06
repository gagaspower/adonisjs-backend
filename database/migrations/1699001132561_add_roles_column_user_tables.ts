import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer("roles_id").unsigned();
      table.index("roles_id");
      table.foreign("roles_id").references("roles.id");
    });
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn("roles_id");
      table.dropForeign("roles_id");
    });
  }
}
