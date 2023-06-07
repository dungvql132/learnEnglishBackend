import express, { type Application } from "express";

import { errorHandler } from "@src/authentication/middlewere/errorHandle";

import appAuthen from "@src/authentication/router";

const app: Application = express();

app.use("/", appAuthen);
app.use(errorHandler);
export default app;
