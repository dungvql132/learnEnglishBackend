import express, { type Application, Request, Response, NextFunction } from "express";
import { errorHandler } from "@src/module/authentication/middlewere/errorHandle";
import {
  loginController,
  registerController,
  getCurrentUser,
} from "@src/module/authentication/controlller/authentication.controller";
import { requiredTokenMiddleware } from "../middlewere/validate";

const app: Application = express();
app.use("/currentUser", requiredTokenMiddleware);

app.post("/login/", loginController);
app.post("/register/", registerController);
app.get("/currentUser", getCurrentUser);

export default app;
