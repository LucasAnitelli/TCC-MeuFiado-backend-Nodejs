"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var celebrate_1 = require("celebrate");
var SessionsController_1 = __importDefault(require("../controllers/SessionsController"));
var upload_1 = __importDefault(require("../../../../../config/upload"));
var multer_1 = __importDefault(require("multer"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var UserAvatarController_1 = __importDefault(require("../controllers/UserAvatarController"));
var sessionsRouter = (0, express_1.Router)();
var upload = (0, multer_1.default)(upload_1.default.multer);
var sessionsController = new SessionsController_1.default();
var userAvatarController = new UserAvatarController_1.default();
sessionsRouter.post("/login", (0, celebrate_1.celebrate)((_a = {},
    _a[celebrate_1.Segments.BODY] = {
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    },
    _a)), sessionsController.create);
sessionsRouter.patch('/avatar', ensureAuthenticated_1.default, upload.single('avatar'), userAvatarController.saveImg);
exports.default = sessionsRouter;
