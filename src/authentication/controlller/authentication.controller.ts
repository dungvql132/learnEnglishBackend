import express, { type Application, type Request, type Response, type NextFunction } from "express";
import { User, IUser } from "@src/authentication/entity/User.entity";
import { dataSource } from "@src/database/connection";
import { errorHandler } from "@src/authentication/middlewere/errorHandle";

import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { type IPayload } from "@src/common/base/interface/payload";
import { SuccessResponse, ErrorResponse } from "@src/common/base/interface";
import { successes, errors } from "@src/authentication/message";
import bcrypt from "bcryptjs";

dotenv.config();

const appAuthen: Application = express();

async function login_controller(req: Request, res: Response, next: NextFunction) {
  const repository = dataSource.getRepository(User);

  const { email, password, firstName, lastName } = req.body.data;
  let token = "";
  const checkUser = await repository.findOneBy({
    email,
  });

  const payload: IPayload = {
    email,
    name: firstName + lastName,
  };
  if (!(checkUser == null) && process.env.JWTSecret) {
    try {
      const isPasswordValid = bcrypt.compareSync(password, checkUser.password);
      if (!isPasswordValid) next(new Error(errors.WRONG_PASSWORD));

      token = jwt.sign(payload, process.env.JWTSecret);

      const successResponse = new SuccessResponse(200, successes.LOGIN_SUCCESS, token);
      return res.status(successResponse.status).json(successResponse);
    } catch (error) {
      next(error);
    }
  }

  const error = new ErrorResponse(404, errors.CANNOT_FIND_USER, new Error(errors.WRONG_PASSWORD));
  next(error);
}

async function register_login(req: Request, res: Response, next: NextFunction) {
  const repository = dataSource.getRepository(User);
  const { email, password } = req.body.data;

  const checkUser = await repository.findOneBy({
    email,
  });
  if (checkUser != null) {
    next(new Error(errors.DUPLICATE_USER));
    return;
  }

  const user = new User();
  user.setData(req.body.data);
  user.password = bcrypt.hashSync(password, 10);

  const payload: IPayload = {
    email,
    name: user.firstName + user.lastName,
  };
  const token = jwt.sign(payload, process.env.JWTSecret!);
  const rs = repository.save(user);
  if (!rs) {
    next(new Error(errors.CANNOt_CREATE_USER));
    return;
  }

  // NODE_ENV
  res.status(200).json(new SuccessResponse(200, successes.CREATE_USER_SUCCESS, token));
}

export { register_login, login_controller };
