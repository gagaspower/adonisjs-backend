import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class UsersController {
  public async index({ response }: HttpContextContract) {
    const result: User[] = await User.query().preload("roles");

    return response.ok({
      message: "Success",
      data: result,
    });
  }

  public async store({ request, response }: HttpContextContract) {
    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      email: schema.string([
        rules.email(),
        rules.unique({
          table: "users",
          column: "email",
          caseInsensitive: true,
        }),
      ]),
      password: schema.string([
        rules.trim(),
        rules.alphaNum(),
        rules.minLength(6),
        rules.maxLength(8),
      ]),
      rolesId: schema.number(),
    });

    const payload: any = await request.validate({
      schema: newUserSchema,
      messages: {
        "name.required": "Name required",
        "email.required": "Email required",
        "password.required": "Password required",
        "rolesId.required": "User role required",
        "email.email": "Email not valid",
        "email.unique": "Email already exists",
        "password.alphaNum": "Password only alphabet and or number",
        "password.minLength": "Passwonrd min {{ options.minLength }} char",
        "password.maxLength": "Password max {{ options.maxLength }} char",
      },
    });

    const user: User = await User.create(payload);

    return response.created({
      message: "Success",
      data: user,
    });
  }

  public async show({ params, response }: HttpContextContract) {
    const { id } = params;
    const user: User | null = await User.query()
      .preload("roles")
      .where("id", id)
      .first();
    if (!user) {
      return response.notFound({
        message: "User not found",
      });
    }

    return response.ok({
      message: "Success",
      data: user,
    });
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params;
    const newUserSchema = schema.create({
      name: schema.string({ trim: true }),
      password: schema.string.nullableAndOptional(),
      rolesId: schema.number(),
    });

    const payload: any = await request.validate({
      schema: newUserSchema,
      messages: {
        "name.required": "Name required",
        "email.required": "Email required",
        "rolesId.required": "User role required",
        "email.email": "Email not valid",
        "email.unique": "Email already exists",
      },
    });

    const { email } = request.body();

    /** email check if exists where not id in params */
    const emailChek: User | null = await User.query()
      .withScopes((scopes) =>
        scopes.isEmail({
          email,
          id,
        })
      )
      .first();

    if (emailChek) {
      return response.status(422).json({
        message: "Email already exists",
      });
    }

    const user: User | null = await User.find(id);

    if (!user) {
      return response.notFound({ message: "User not exists" });
    }

    user.name = payload.name;
    user.email = payload.email;
    user.password = payload.password;
    await user.save();

    return response.created({
      message: "Success",
      data: user,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const user: User | null = await User.find(id);
    if (!user) {
      return response.notFound({
        message: "User not found",
      });
    }

    await user.delete();
    return response.ok({
      message: "User has been deleted",
    });
  }
}
