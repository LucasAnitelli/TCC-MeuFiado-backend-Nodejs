import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import routes from "./routes";
import "../typeorm";
import AppError from "@shared/errors/AppError";

const app = express();

app.use(express.json());
app.use(routes);
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          Status: "error",
          Message: err.message,
          Data: {},
          Success: false,
        });
      }
  
      console.log(err);
      return response.status(500).json({
        Status: "error",
        Message: "Erro no Server",
        Data: {},
        Success: false,
      });
    }
  );


app.listen(3333, () => {
    console.log("🚀 Server started on port 3333!");
  });
