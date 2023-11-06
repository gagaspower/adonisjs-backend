import { DateTime } from "luxon";
import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import FamilyMember from "./FamilyMember";

export default class Member extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public memberName: string;

  @column()
  public gender: string;

  @column()
  public religion: string;

  @column()
  public age: number;

  @column()
  public userIdReference: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => FamilyMember)
  public family: HasMany<typeof FamilyMember>;
}
