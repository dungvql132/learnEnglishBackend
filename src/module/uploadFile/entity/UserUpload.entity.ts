import { Entity, Column, ManyToOne } from "typeorm";
import { User } from "@src/module/authentication/entity/User.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IUserUpload {
  id?: number;
  user_id: User;
  link: string;
}

@Entity()
export class UserUpload extends PrimaryEntity {
  @Column()
  link: string;

  @ManyToOne(() => User, (user_id) => user_id.user_upload_ids)
  user_id: User;

  setData(data?: IUserUpload) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
      this.link = data.link;
    }
  }
}
