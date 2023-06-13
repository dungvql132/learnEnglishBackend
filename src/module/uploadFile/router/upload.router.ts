import express, { type Application } from "express";
import { getSignedUrlUploadFileController, uploadFileSuccess } from "../controller/upload.controller";

const app: Application = express();

app.get("/", getSignedUrlUploadFileController);
app.post("/", uploadFileSuccess);

export default app;
