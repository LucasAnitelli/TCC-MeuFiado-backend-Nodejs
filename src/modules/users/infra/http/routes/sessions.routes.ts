import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import SessionsController from "../controllers/SessionsController";
import uploadConfig from "@config/upload";
import multer from "multer";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import UserAvatarController from "../controllers/UserAvatarController";

const sessionsRouter = Router();
const upload = multer(uploadConfig.multer);
const sessionsController = new SessionsController();
const userAvatarController = new UserAvatarController();

sessionsRouter.post("/login", celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
}),
  sessionsController.create);

sessionsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.saveImg)

export default sessionsRouter;