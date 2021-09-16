import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express'
import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/create', celebrate({
  [Segments.BODY]: {
    nameEstablishment: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}), usersController.create)

export default usersRouter
