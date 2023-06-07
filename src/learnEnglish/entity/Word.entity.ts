import { Entity, Column, ManyToOne, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "@src/authentication/entity/User.entity";
import { WordDetail } from "./WordDetail.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IWord {
  id: number;
  text: string;
  author_id: User;
  view_user_ids: User[];
  word_detail_ids: WordDetail[];
}

@Entity()
export class Word extends PrimaryEntity {
  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.word_ids, { eager: true })
  author_id: User;

  @ManyToMany(() => User, (user) => user.view_word_ids, { cascade: true })
  view_user_ids: User[];

  @OneToMany(() => WordDetail, (word_detail_ids) => word_detail_ids.word_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
  })
  word_detail_ids: WordDetail[];

  setData(data?: IWord) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
      this.text = data.text;
      this.author_id = data.author_id;
    }
  }
}
