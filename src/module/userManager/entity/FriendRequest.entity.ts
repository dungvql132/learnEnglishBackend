import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "@src/module/authentication/entity/User.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IFriendRequest {
  id?: number;
  from_user_id: User;
  to_user_id: User;
  is_accept: boolean;
}

@Entity()
export class FriendRequest extends PrimaryEntity {
  @Column({ default: false })
  is_accept: boolean;

  @ManyToOne(() => User, (user_id) => user_id.send_friend_request_ids)
  from_user_id: User;

  @ManyToOne(() => User, (user_id) => user_id.receive_friend_request_ids)
  to_user_id: User;

  setData(data?: IFriendRequest) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
    }
  }
}
