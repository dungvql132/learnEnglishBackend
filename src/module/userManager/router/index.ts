import express, { type Application } from "express";
// import { errorHandler } from "@src/module/authentication/middlewere/errorHandle";
import friendRequestRouter from "./friendRequest.router";

const app: Application = express();

app.use("/", friendRequestRouter);

export default app;
