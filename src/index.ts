import "reflect-metadata";
import express, { type Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dataSource } from "@src/database/connection";
import authenticationApp from "@src/module/authentication/router";
import learnEnglishApp from "@src/module/learnEnglish/router";
import uploadfileApp from "@src/module/uploadFile/router";
import userManagerApp from "@src/module/userManager/router";
import { SocketIOServer } from "@src/module/websocket";
import { createServer } from "http";
import { requiredTokenMiddleware } from "@src/module/authentication/middlewere/validate";

import dotenv from "dotenv";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 1302;
const httpServer = createServer(app);

const ioServer = new SocketIOServer(httpServer);

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication
app.use("/routes", requiredTokenMiddleware);

app.use("/authentication/", authenticationApp);
app.use("/routes/learnEnglish", learnEnglishApp);
app.use("/routes/upload", uploadfileApp);
app.use("/routes/user", userManagerApp);

httpServer.listen(port, async () => {
  // await connection
  console.log(`listening on port ${port}!`);
});
