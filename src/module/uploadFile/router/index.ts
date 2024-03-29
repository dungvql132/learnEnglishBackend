import express, { type Application } from "express";
// import { errorHandler } from "@src/module/authentication/middlewere/errorHandle";
import uploadRouter from "./upload.router";

const app: Application = express();

app.use("/", uploadRouter);

export default app;
