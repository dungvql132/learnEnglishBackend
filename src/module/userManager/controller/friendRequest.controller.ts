import { type Request, type Response, type NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { dataSource } from "@src/database/connection";
import { User } from "@src/module/authentication/entity/User.entity";
import { FriendRequest } from "../entity/FriendRequest.entity";
import ControllerFactory from "@src/common/factory/controller.factory";
import { Column } from "typeorm";
import { SuccessResponse } from "@src/common/base/interface";
dotenv.config();

async function createFriendRequest(req: Request, res: Response, next: NextFunction) {
  const repositoryUser = dataSource.getRepository(User);
  if (req.user) {
    const { email } = req.user;

    const checkUser = await repositoryUser.findOneBy({
      email,
    });

    const { user_id } = req.body.data;
    const to_user_id = await repositoryUser.findOneBy({
      id: Number(user_id),
    });

    if (checkUser && to_user_id) {
      const repository = dataSource.getRepository(FriendRequest);
      const friendRequest = new FriendRequest();
      friendRequest.from_user_id = checkUser;
      friendRequest.to_user_id = to_user_id;

      const result = await repository.save(friendRequest);
      return res.status(200).json(new SuccessResponse(200, "find success", undefined, result));
    }
  } else {
    next(new Error("Cannot find user"));
  }
}

async function acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const repositoryUser = dataSource.getRepository(User);
    const { id: friend_request_id } = req.body.data;
    const repository = dataSource.getRepository(FriendRequest);
    const friendRequest = await repository.find({
      where: {
        id: Number(friend_request_id),
      },
      relations: ["to_user_id", "from_user_id"],
    });

    friendRequest.forEach(async (element) => {
      element.is_accept = true;
      const from_user_friend_ids = await element.from_user_id.friend_ids;
      const to_user_friend_ids = await element.to_user_id.friend_ids;

      from_user_friend_ids.push(element.to_user_id);
      to_user_friend_ids.push(element.from_user_id);

      element.to_user_id.friend_ids = Promise.resolve(to_user_friend_ids);
      await repositoryUser.manager.save(element.to_user_id);

      element.from_user_id.friend_ids = Promise.resolve(from_user_friend_ids);
      await repositoryUser.manager.save(element.from_user_id);
    });

    await repository.save(friendRequest);
    const result = await repository.find({
      where: {
        id: Number(friend_request_id),
      },
      relations: ["to_user_id", "from_user_id"],
    });

    return res.status(200).json(new SuccessResponse(200, "find success", undefined, result));
  } catch (error) {
    next(error);
  }
}

const controlllerFactoryFriendRequest = new ControllerFactory(FriendRequest);

export default controlllerFactoryFriendRequest;
export { acceptFriendRequest, createFriendRequest };
