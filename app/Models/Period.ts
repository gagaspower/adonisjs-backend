import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Period extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public periodName: string;

  @column()
  public periodMonth: string;

  @column()
  public periodYear: number;
}
