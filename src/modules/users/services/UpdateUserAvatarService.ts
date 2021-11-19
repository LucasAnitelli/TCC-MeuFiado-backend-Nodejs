import AppError from "../../../shared/errors/AppError";
import { getRepository } from "typeorm";
import User from "../infra/typeorm/entities/User";
import { AvatarDTO } from "../dtos/ResponseDTO";
import DiskStorageDebtor from "../../../shared/container/debtors/StorageDebtor/implementations/DiskStorageDebtor";

interface Request {
  user_id: string;
  avatarFile: string;
}

const storageDebtor = new DiskStorageDebtor();

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFile }: Request): Promise<AvatarDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    if (user.avatar) {
      await storageDebtor.deleteFile(user.avatar);
    }

    const fileName = await storageDebtor.saveFile(avatarFile);

    user.avatar = fileName;

    await usersRepository.save(user);

    //@ts-expect-error
    delete user.password;

    const bodyData: AvatarDTO = {
      Success: true,
      Data: {
        avatar: user.avatar,
        id: user.id
      },
    }

    return bodyData;
  }
}

export default UpdateUserAvatarService;
