import "reflect-metadata";
import express, { type Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { dataSource } from "@src/database/connection";
import authentication from "@src/authentication";
import learnEnglish from "@src/learnEnglish";

const app: Application = express();
const port = 5000;

// Where we will keep books

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// authentication
app.use("/authentication/", authentication);
app.use("/learnEnglish/", learnEnglish);

app.listen(port, async () => {
  // await connection
  console.log(`listening on port ${port}!`);
});
