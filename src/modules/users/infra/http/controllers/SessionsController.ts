import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import AuthenticateUserService from '../../../../../modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { Data, Success } = await authenticateUser.execute({
      email,
      password,
    });

    const responseJson = {
      Data: Data,
      Success: Success
    }

    return response.json(classToClass(responseJson));
  }
}