import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";
import { classToClass } from "class-transformer";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class UserAvatarController {

  public async saveImg(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const updateUserPhoto = container.resolve(UpdateUserAvatarService);
    if (request.file) {
      const fileName = request.file.filename;
      const user = await updateUserPhoto.execute({
        user_id: user_id,
        avatarFile: fileName,
      });
      return response.json(classToClass(user));
    }
  }
}