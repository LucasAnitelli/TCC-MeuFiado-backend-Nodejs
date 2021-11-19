"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var debtors_routes_1 = __importDefault(require("../../../../modules/debtors/infra/http/routes/debtors.routes"));
var sessions_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));
var users_routes_1 = __importDefault(require("../../../../modules/users/infra/http/routes/users.routes"));
var express_1 = require("express");
var routes = (0, express_1.Router)();
routes.use("/users", users_routes_1.default);
routes.use("/sessions", sessions_routes_1.default);
routes.use("/debtors", debtors_routes_1.default);
exports.default = routes;
