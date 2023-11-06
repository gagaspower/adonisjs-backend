import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Role from "App/Models/Role";
import { schema } from "@ioc:Adonis/Core/Validator";

export default class RolesController {
  public async index({ response }: HttpContextContract) {
    const result = await Role.all();

    return response.ok({
      message: "Success",
      data: result,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const payload: any = await request.validate({
      schema: schema.create({
        roleName: schema.string({ trim: true }),
      }),
    });

    const role: Role = await Role.create(payload);
    return response.created({
      message: "Success",
      data: role,
    });
  }

  public async update({ request, params, response }: HttpContextContract) {
    const payload: any = await request.validate({
      schema: schema.create({
        roleName: schema.string({ trim: true }),
      }),
    });
    const { id } = params;

    const role: any = await Role.find(id);

    if (!role) {
      return response.notFound({ errors: "Role not found!!" });
    }

    role.roleName = payload.roleName;
    await role.save();

    return response.created({
      message: "Update success",
      data: role,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const role: any = await Role.find(id);

    if (!role) {
      return response.notFound({ errors: "Role not found!!" });
    }
    await role.delete();

    return response.ok({
      message: "Delete role success",
    });
  }
}
