import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import {
  column,
  beforeSave,
  BaseModel,
  belongsTo,
  BelongsTo,
  scope,
} from "@ioc:Adonis/Lucid/Orm";
import Role from "./Role";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public rememberMeToken: string | null;

  @column()
  public rolesId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }

  /** scope where */
  public static isEmail = scope((query: any, value: any) => {
    query.whereNot("id", value.id).where("email", "=", value.email);
  });

  @belongsTo(() => Role, {
    foreignKey: "rolesId",
  })
  public roles: BelongsTo<typeof Role>;
}
