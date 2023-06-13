import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Word } from "@src/module/learnEnglish/entity/Word.entity";
import { PrimaryEntity } from "@src/common/base/entity";
import { UserUpload } from "@src/module/uploadFile/entity/UserUpload.entity";

export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  words?: Word[];
}

@Entity()
export class User extends PrimaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  age: number;

  @Column()
  email: string;

  @Column()
  password: string;

  // learnEnglish
  @OneToMany(() => Word, (word) => word.author_id)
  word_ids: Word[];

  @ManyToMany(() => Word, (word) => word.view_user_ids)
  @JoinTable()
  view_word_ids: Word[];

  // ================================================
  // upLoad
  @OneToMany(() => UserUpload, (user_upload_ids) => user_upload_ids.user_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    cascade: true,
    eager: true,
  })
  user_upload_ids: UserUpload[];

  setData(data?: IUser) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.age = data.age;
      this.email = data.email;
      this.password = data.password;
    }
  }
}
