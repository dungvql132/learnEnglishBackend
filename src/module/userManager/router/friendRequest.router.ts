import express, { type Application } from "express";
import friend_request_controller, {
  acceptFriendRequest,
  createFriendRequest,
} from "../controller/friendRequest.controller";

const app: Application = express();

app.get("/friend", friend_request_controller.find_controller());
app.post("/friend", friend_request_controller.add_controller());
app.put("/friend", friend_request_controller.update_controller());
app.delete("/friend", friend_request_controller.delete_controller());

app.post("/acceptFriendRequest", acceptFriendRequest);
app.post("/createFriendRequest", createFriendRequest);

export default app;
