import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";
import Hash from "@ioc:Adonis/Core/Hash";
import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
  public async create({ auth, request, response }: HttpContextContract) {
    const { email, password } = request.body();

    const authData = schema.create({
      email: schema.string([rules.email(), rules.trim()]),
      password: schema.string([
        rules.maxLength(8),
        rules.minLength(6),
        rules.alphaNum(),
        rules.trim(),
      ]),
    });

    await request.validate({
      schema: authData,
    });

    // Lookup user manually
    const user = await User.query().where("email", email).firstOrFail();

    // Verify password
    if (!(await Hash.verify(user.password, password))) {
      return response.unauthorized("Invalid credentials");
    }

    // Generate token
    const token = await auth.use("api").generate(user, {
      expiresIn: "1 days",
    });
    return response.status(200).json({
      data: {
        access_token: token.token,
        exp_token: token.expiresAt,
      },
    });
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const { email, password } = request.body();

      const user = await User.create({
        email: email,
        password: password,
      });

      return response.status(200).json({
        message: "Success",
        data: user,
        errors: null,
      });
    } catch (error) {
      return response.status(500).json({
        message: "Error",
        data: null,
        errors: error.message,
      });
    }
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.use("api").revoke();
    return response.status(200).json({
      message: "Logout successfully!",
    });
  }
}
