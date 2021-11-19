import debtorsRouter from "../../../../modules/debtors/infra/http/routes/debtors.routes";
import sessionsRouter from "../../../../modules/users/infra/http/routes/sessions.routes";
import usersRouter from "../../../../modules/users/infra/http/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/debtors", debtorsRouter);


export default routes;