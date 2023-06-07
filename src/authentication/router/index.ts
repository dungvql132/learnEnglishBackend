import express, { type Application, Request, Response, NextFunction } from "express";
import { errorHandler } from "@src/authentication/middlewere/errorHandle";
import { login_controller, register_login } from "@src/authentication/controlller/authentication.controller";

const app: Application = express();

app.post("/login/", login_controller);
app.post("/register/", register_login);

export default app;
