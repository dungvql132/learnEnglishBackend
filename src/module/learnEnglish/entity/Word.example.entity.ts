import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { WordDetail } from "./WordDetail.entity";
import { PrimaryEntity } from "@src/common/base/entity";

export interface IWordExample {
  id?: number;
  example: string;
  detail_id: WordDetail;
}

@Entity()
export class WordExample extends PrimaryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  example: string;

  @ManyToOne(() => WordDetail, (word_detail_ids) => word_detail_ids.word_example_ids, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  })
  detail_id: WordDetail;

  setData(data?: IWordExample) {
    if (data != null) {
      data.id ? (this.id = data.id) : 0;
      this.example = data.example;
    }
  }
}
