import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { WordDetail } from "./WordDetail.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IWordType {
  id?: number;
  type: string;
  word_detail_ids?: WordDetail[];
}

@Entity()
export class WordType extends PrimaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => WordDetail, (word_detail_ids) => word_detail_ids.word_type_id)
  word_detail_ids: WordDetail[];

  setData(data?: IWordType) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
      this.type = data.type;
    }
  }
}
