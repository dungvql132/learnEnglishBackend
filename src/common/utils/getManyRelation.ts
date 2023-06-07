import { type PrimaryEntity } from "../base/entity";
import { dataSource } from "@src/database/connection";

export async function getManyRelations<T1 extends PrimaryEntity, T2 extends PrimaryEntity>(
  ClassFrom: new () => T1,
  ClassTo: new () => T2,
  obj1: T1,
  relation: string
): Promise<T2[]> {
  const instance1 = new ClassFrom();
  const instance2 = new ClassTo();

  if (!(obj1 instanceof ClassFrom)) {
    throw new Error("obj is not an instance of ClassFrom");
  }

  const repositoryFrom = dataSource.getRepository(ClassFrom);
  const repositoryTo = dataSource.getRepository(ClassTo);

  const classNameTo = repositoryTo.metadata.tableName;
  const classNameFrom = repositoryFrom.metadata.tableName;

  const results = await repositoryTo
    .createQueryBuilder(classNameTo)
    .leftJoinAndSelect(`${classNameTo}.${relation}`, `${classNameFrom}`)
    .where(`${classNameFrom}.id = :id`, { id: obj1.id })
    .getMany();

  return results;
}
