"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ensureAuthenticated_1 = __importDefault(require("../../../../../modules/users/infra/http/middlewares/ensureAuthenticated"));
var express_1 = require("express");
var DebtorsController_1 = __importDefault(require("../controllers/DebtorsController"));
var debtorsRouter = (0, express_1.Router)();
var debtorsController = new DebtorsController_1.default();
debtorsRouter.use(ensureAuthenticated_1.default);
debtorsRouter.get('/listen', debtorsController.listFilter);
debtorsRouter.post("/create", debtorsController.create);
debtorsRouter.get('/pagination', debtorsController.listPagination);
debtorsRouter.put("/:id", debtorsController.put);
debtorsRouter.delete("/:id", debtorsController.delete);
exports.default = debtorsRouter;
