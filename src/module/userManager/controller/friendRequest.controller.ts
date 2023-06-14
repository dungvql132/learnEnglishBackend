import { type Request, type Response, type NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import * as dotenv from "dotenv";
import { dataSource } from "@src/database/connection";
import { User } from "@src/module/authentication/entity/User.entity";
import { FriendRequest } from "../entity/FriendRequest.entity";
import ControllerFactory from "@src/common/factory/controller.factory";
dotenv.config();

async function createFriendRequest(req: Request, res: Response, next: NextFunction) {
  const repositoryUser = dataSource.getRepository(User);
  if (req.user) {
    const { email } = req.user;

    const checkUser = await repositoryUser.findOneBy({
      email,
    });
    console.log("checkUser: ", checkUser);

    const { user_id } = req.body.data;
    const to_user_id = await repositoryUser.findOneBy({
      id: Number(user_id),
    });

    console.log("to_user_id: ", to_user_id);

    if (checkUser && to_user_id) {
      const repository = dataSource.getRepository(FriendRequest);
      const friendRequest = new FriendRequest();
      friendRequest.from_user_id = checkUser;
      friendRequest.to_user_id = to_user_id;

      const result = await repository.save(friendRequest);
      return res.status(200).json({ data: result });
    }
  } else {
    next(new Error("Cannot find user"));
  }
}

async function acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
  try {
    const { id: friend_request_id } = req.body.data;
    const repository = dataSource.getRepository(FriendRequest);
    const friendRequest = await repository.find({
      where: {
        id: Number(friend_request_id),
      },
    });

    friendRequest.forEach((element) => {
      element.is_accept = true;
    });

    const result = await repository.save(friendRequest);

    return res.status(200).json({ data: result });
  } catch (error) {
    next(error);
  }
}

const controlllerFactoryFriendRequest = new ControllerFactory(FriendRequest);

export default controlllerFactoryFriendRequest;
export { acceptFriendRequest, createFriendRequest };
