"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
require("reflect-metadata");
var routes_1 = __importDefault(require("./routes"));
require("../typeorm");
var cors_1 = __importDefault(require("cors"));
var AppError_1 = __importDefault(require("../../../shared/errors/AppError"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (err, request, response, _next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            Status: "error",
            Message: err.message,
            Data: {},
            Success: false,
        });
    }
    return response.status(500).json({
        Status: "error",
        Message: "Erro no Server",
        Data: {},
        Success: false,
    });
});
app.listen(process.env.PORT || 3333, function () {
    console.log("\uD83D\uDE80 Server started on port ".concat(process.env.PORT, "!"));
});
