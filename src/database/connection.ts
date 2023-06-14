// connect to POSTSQL

import { User } from "@src/module/authentication/entity/User.entity";
import { Word } from "@src/module/learnEnglish/entity/Word.entity";
import { WordExample } from "@src/module/learnEnglish/entity/Word.example.entity";
import { WordDetail } from "@src/module/learnEnglish/entity/WordDetail.entity";
import { WordType } from "@src/module/learnEnglish/entity/WordType.entity";
import { UserUpload } from "@src/module/uploadFile/entity/UserUpload.entity";
import { FriendRequest } from "@src/module/userManager/entity/FriendRequest.entity";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

import { createConnection } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: process.env.POSTGRES_DATABASE,
  entities: [User, Word, WordDetail, WordType, WordExample, UserUpload, FriendRequest],
  logging: false,
  synchronize: true,
  name: "default",
});
dataSource
  .connect()
  .then(() => {
    console.log("Connect to postSQL successfull");
  })
  .catch((error) => {
    console.log("Error to connect to postSQL:", error);
  });

export default createConnection({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USERNAME,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: process.env.POSTGRES_DATABASE,
  entities: [User, Word, WordDetail, WordType, WordExample, UserUpload, FriendRequest],
  logging: false,
  synchronize: true,
  name: "default",
})
  .then(() => {
    // console.log("Connect to postSQL successfull");
  })
  .catch((error) => {
    // console.log("Error to connect to postSQL:", error);
  });

// connect to MongoDB
import mongoose from "mongoose";
// MONGODB_PATH
mongoose
  .connect(process.env.MONGODB_PATH!)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
