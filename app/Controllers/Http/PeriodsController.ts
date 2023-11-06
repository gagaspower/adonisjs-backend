import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Period from "App/Models/Period";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class PeriodsController {
  public async index({ response }: HttpContextContract) {
    const period: Period[] = await Period.all();

    return response.ok({
      message: "Success",
      data: period,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const newSchemaPeriod = schema.create({
      periodName: schema.string(),
      periodMonth: schema.string(),
      periodYear: schema.number(),
    });

    const newSchemaPeriodMessage = {
      "periodName.required": "Period name is required",
      "periodMonth.required": "Period month is required",
      "periodYear.required": "Period year is required",
    };

    const payload: any = await request.validate({
      schema: newSchemaPeriod,
      messages: newSchemaPeriodMessage,
    });

    const period: Period = await Period.create(payload);

    return response.created({
      message: "Period has been created",
      data: period,
    });
  }

  public async update({ request, params, response }: HttpContextContract) {
    const newSchemaPeriod = schema.create({
      periodName: schema.string(),
      periodMonth: schema.string(),
      periodYear: schema.number(),
    });

    const newSchemaPeriodMessage = {
      "periodName.required": "Period name is required",
      "periodMonth.required": "Period month is required",
      "periodYear.required": "Period year is required",
    };

    const payload: any = await request.validate({
      schema: newSchemaPeriod,
      messages: newSchemaPeriodMessage,
    });

    const { id } = params;
    const period: any = await Period.find(id);
    period.periodName = payload.periodName;
    period.periodMonth = payload.periodMonth;
    period.periodYear = payload.periodYear;
    await period.save();

    return response.created({
      message: "Period has been update",
      data: period,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const period: any = await Period.find(id);

    await period.delete();

    return response.ok({
      message: "Period has been deleted",
    });
  }
}
