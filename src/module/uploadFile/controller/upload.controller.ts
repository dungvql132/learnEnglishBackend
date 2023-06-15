import { type Request, type Response, type NextFunction } from "express";
import AWS from "aws-sdk";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { IPayload, SuccessResponse } from "@src/common/base/interface";
import { dataSource } from "@src/database/connection";
import { UserUpload } from "../entity/UserUpload.entity";
import { User } from "@src/module/authentication/entity/User.entity";
dotenv.config();

async function getSignedUrlUploadFileController(req: Request, res: Response, next: NextFunction) {
  // NODE_ENV
  const { contentType = "" } = req.query || {};
  const fileFormat = String(contentType).split("/")[1]
    ? String(contentType).split("/")[1]
    : String(contentType).split("/")[0];

  const keys = {
    accessKeyId: String(process.env.AWS_ACCESSKEY),
    secretAccessKey: String(process.env.AWS_SECRETKEY),
  };
  const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey,
    region: "ap-southeast-1",
  });

  if (req.user) {
    const key = `${req.user.id}/${uuidv4()}.${fileFormat}`;

    const configUrl = {
      Bucket: "my-learn-english-project",
      ContentType: String(contentType),
      Key: key,
    };

    s3.getSignedUrl("putObject", configUrl, (err, url) => {
      if (err) {
        next(err);
      }
      return res.status(200).json(new SuccessResponse(200, "find success", undefined, { url, key }));
    });
  } else {
    next(new Error("Cannot find user"));
  }
}

async function uploadFileSuccess(req: Request, res: Response, next: NextFunction) {
  const repositoryUser = dataSource.getRepository(User);
  if (req.user) {
    const { email } = req.user;

    const checkUser = await repositoryUser.findOneBy({
      email,
    });
    if (checkUser) {
      const { link } = req.body.data;
      const repository = dataSource.getRepository(UserUpload);
      const userUpload = new UserUpload();
      userUpload.link = link;
      userUpload.user_id = checkUser;

      const result = await repository.save(userUpload);
      return res.status(200).json(new SuccessResponse(200, "find success", undefined, result));
    }
  } else {
    next(new Error("Cannot find user"));
  }
}

export { getSignedUrlUploadFileController, uploadFileSuccess };
