import express, { type Application, Request, Response, NextFunction } from "express";
import { dataSource } from "@src/database/connection";
import * as dotenv from "dotenv";
import wordRouter from "./Word.router";
import wordTypeRouter from "./WordType.router";
dotenv.config();

const app: Application = express();

app.use("/word", wordRouter);
app.use("/wordType", wordTypeRouter);

export default app;
