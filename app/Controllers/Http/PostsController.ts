import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Post from "App/Models/Post";
export default class PostsController {
  public async index({ response }: HttpContextContract) {
    const data = await Post.all();
    return response.status(200).json({
      message: "Success",
      data: data,
    });
  }

  public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try {
      const { title, content } = request.body();

      const post = await Post.create({
        title: title,
        content: content,
      });

      return response.status(200).json({
        message: "Create Success",
        data: post,
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

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
