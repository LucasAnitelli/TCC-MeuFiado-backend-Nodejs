import ensureAuthenticated from "../../../../../modules/users/infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import DebtorsController from "../controllers/DebtorsController";

const debtorsRouter = Router();
const debtorsController = new DebtorsController();

debtorsRouter.use(ensureAuthenticated);

debtorsRouter.get('/listen', debtorsController.listFilter);
debtorsRouter.post("/create", debtorsController.create);
debtorsRouter.get('/pagination', debtorsController.listPagination);
debtorsRouter.put("/:id", debtorsController.put);
debtorsRouter.delete("/:id", debtorsController.delete)

export default debtorsRouter;