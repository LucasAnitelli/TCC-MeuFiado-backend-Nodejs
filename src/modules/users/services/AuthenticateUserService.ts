
import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../infra/typeorm/entities/User";
import { TokenDTO } from "../dtos/ResponseDTO";
import AppError from "@shared/errors/AppError";
import authConfig from '@config/auth';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<TokenDTO> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError("Email/Senha incorreto.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Email/Senha incorreto.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    const bodyData: TokenDTO = {
      Success: true,
      Data: {
        id: user.id,
        nameEstablishment: user.nameEstablishment,
        email: user.email,
        token,
        avatar: user.avatar,
      },
    }

    return bodyData;
  }
}

export default AuthenticateUserService;