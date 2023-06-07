import { User } from "@src/authentication/entity/User.entity";
import { Word } from "@src/learnEnglish/entity/Word.entity";
import { WordExample } from "@src/learnEnglish/entity/Word.example.entity";
import { WordDetail } from "@src/learnEnglish/entity/WordDetail.entity";
import { WordType } from "@src/learnEnglish/entity/WordType.entity";
import { DataSource } from "typeorm";

import { createConnection } from "typeorm";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "dung",
  password: "1",
  database: "project",
  entities: [User, Word, WordDetail, WordType, WordExample],
  logging: false,
  synchronize: true,
  name: "default",
});
dataSource
  .connect()
  .then(() => {
    console.log("Kết nối cơ sở dữ liệu thành công");
  })
  .catch((error) => {
    console.log("Lỗi kết nối cơ sở dữ liệu:", error);
  });

export default createConnection({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "dung",
  password: "1",
  database: "project",
  entities: [User, Word, WordDetail, WordType, WordExample],
  logging: false,
  synchronize: true,
  name: "default",
})
  .then(() => {
    console.log("Kết nối cơ sở dữ liệu thành công");
  })
  .catch((error) => {
    console.log("Lỗi kết nối cơ sở dữ liệu:", error);
  });
