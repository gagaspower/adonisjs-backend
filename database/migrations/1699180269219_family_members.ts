import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "family_members";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("member_id").unsigned();
      table.string("family_member_name");
      table.string("religion");
      table.string("gender");
      table.integer("age");
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at").defaultTo(this.now());
      table.timestamp("updated_at").defaultTo(this.now());
      table.index("member_id");
      table.foreign("member_id").references("members.id");
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
