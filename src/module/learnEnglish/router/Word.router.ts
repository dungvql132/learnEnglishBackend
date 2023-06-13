import express, { type Application } from "express";
import word_controller from "../controller/word.controller";

const app: Application = express();

app.get("/", word_controller.find_controller());
app.post("/", word_controller.add_controller());
app.put("/", word_controller.update_controller());
app.delete("/", word_controller.delete_controller());

export default app;
