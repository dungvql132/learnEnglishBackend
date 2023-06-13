import express, { type Application } from "express";
import wordType_controller from "../controller/wordType.controller";

const app: Application = express();

app.get("/", wordType_controller.find_controller());

export default app;
