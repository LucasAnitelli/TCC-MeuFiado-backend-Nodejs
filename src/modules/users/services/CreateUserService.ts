import AppError from '../../../shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import { ResponseDTO } from '../dtos/ResponseDTO';
import User from '../infra/typeorm/entities/User';


interface Request {
  nameEstablishment: string;
  email: string;
  password: string;
}

class CreateUserService {

  public async execute({ nameEstablishment, email, password }: Request): Promise<ResponseDTO> {

    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError("Email já cadastrado, por favor coloque outro.");
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      nameEstablishment,
      email,
      password: hashedPassword,
    });

    const resp = await usersRepository.save(user);

    //@ts-expect-error
    delete user.password;

    const bodyData: ResponseDTO = {
      Success: true,
      Data: user,
    }
    return bodyData;
  }
}

export default CreateUserService;