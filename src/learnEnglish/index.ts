import express, { type Application, Request, Response, NextFunction } from "express";
import { dataSource } from "@src/database/connection";
import * as dotenv from "dotenv";
import wordRouter from "./router/Word.router";
dotenv.config();

const app: Application = express();

app.use("/word", wordRouter);

export default app;
