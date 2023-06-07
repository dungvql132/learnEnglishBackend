import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { User } from "@src/authentication/entity/User.entity";
import { Word } from "./Word.entity";
import { WordType } from "./WordType.entity";
import { WordExample } from "./Word.example.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IWordDetail {
  id?: number;
  meaning: string;
  word_id: Word;
  word_type_id: WordType;
  word_example_ids: WordDetail[];
}

@Entity()
export class WordDetail extends PrimaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  meaning: string;

  @ManyToOne(() => Word, (word) => word.word_detail_ids, {
    eager: true,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "word_id" })
  word_id: Word;

  @ManyToOne(() => WordType, (word_type_id) => word_type_id.word_detail_ids, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "word_type_id" })
  word_type_id: WordType;

  @OneToMany(() => WordExample, (word_example_ids) => word_example_ids.detail_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  word_example_ids: WordDetail[];

  setData(data?: IWordDetail) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
    }
  }
}
