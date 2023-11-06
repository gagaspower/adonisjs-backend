import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Member from "App/Models/Member";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import User from "App/Models/User";

export default class MembersController {
  public async index({ response }: HttpContextContract) {
    const members: Member[] = await Member.query().preload("family");
    return response.ok(members);
  }

  public async store({ request, response }: HttpContextContract) {
    const newMemberSchema = schema.create({
      memberName: schema.string([rules.trim()]),
      gender: schema.enum(["L", "P"] as const),
      religion: schema.enum([
        "Islam",
        "Protestan",
        "Katolik",
        "Hindu",
        "Buddha",
        "Konghuchu",
      ] as const),
      age: schema.number(),
      userIdReference: schema.number(),
    });

    const newSchemaMessage = {
      "memberName.required": "Nama member wajib diisi",
      "gender.required": "Jenis kelamin wajib diisi",
      "religion.required": "agama wajib diisi/dipilih",
      "age.required": "Umur wajib diisi",
      "userIdReference.required": "User Id wajib diisi",
      "gender.enum":
        "jenis kelamin setidaknya salah satu dari : {{ options.choices }}",
      "religion.enum":
        "Agama setidaknya salah satu dari :{{ options.choices }}",
      "age.number": "Umur hanya berupa angka",
    };

    const payload: any = await request.validate({
      schema: newMemberSchema,
      messages: newSchemaMessage,
    });

    const checkUser: any = await User.find(payload.userIdReference);

    if (!checkUser) {
      return response.notFound({
        message: "Ketua RT tidak ditemukan",
      });
    }

    const result: Member = await Member.create({
      memberName: payload.memberName,
      gender: payload.gender,
      religion: payload.religion,
      age: payload.age,
      userIdReference: payload.userIdReference,
    });

    return response.created({
      message: "Member has been saved!",
      data: result,
    });
  }

  public async update({ request, params, response }: HttpContextContract) {
    const { id } = params;
    const newMemberSchema = schema.create({
      memberName: schema.string([rules.trim()]),
      gender: schema.enum(["L", "P"] as const),
      religion: schema.enum([
        "Islam",
        "Protestan",
        "Katolik",
        "Hindu",
        "Buddha",
        "Konghuchu",
      ] as const),
      age: schema.number(),
      userIdReference: schema.number.optional(),
    });

    const newSchemaMessage = {
      "memberName.required": "Nama member wajib diisi",
      "gender.required": "Jenis kelamin wajib diisi",
      "religion.required": "agama wajib diisi/dipilih",
      "age.required": "Umur wajib diisi",
      "gender.enum":
        "jenis kelamin setidaknya salah satu dari : {{ options.choices }}",
      "religion.enum":
        "Agama setidaknya salah satu dari :{{ options.choices }}",
      "age.number": "Umur hanya berupa angka",
    };

    const payload: any = await request.validate({
      schema: newMemberSchema,
      messages: newSchemaMessage,
    });

    const checkUser: any = await User.find(payload.userIdReference);

    if (!checkUser) {
      return response.notFound({
        message: "Ketua RT tidak ditemukan",
      });
    }

    const result: any = await Member.find(id);
    result.memberName = payload.memberName;
    result.gender = payload.gender;
    result.religion = payload.religion;
    result.age = payload.age;
    result.userIdReference = payload.userIdReference;
    await result.save();

    return response.created({
      message: "Member has been updated!",
      data: result,
    });
  }

  public async destroy({ params, response }: HttpContextContract) {
    const { id } = params;

    const checkMember: Member | null = await Member.find(id);

    if (!checkMember) {
      return response.notFound({
        message: "Member tidak ditemukan",
      });
    }

    await checkMember.delete();

    return response.ok({
      message: "Member has been deleted!",
    });
  }
}
