import { type Request, type Response, type NextFunction } from "express";
import { type PrimaryEntity } from "@src/common/base/entity";
import { getConnection } from "typeorm";
import { dataSource } from "@src/database/connection";
import { SuccessResponse } from "../base/interface";

class ControllerFactory {
  tableEntity: typeof PrimaryEntity;
  constructor(tableEntity: typeof PrimaryEntity) {
    this.tableEntity = tableEntity;
  }

  find_controller() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const repositoryWord = dataSource.getRepository(this.tableEntity);
        const result = await repositoryWord.find();
        if (result) {
          return res.status(200).json(new SuccessResponse(200, "find success", undefined, result));
        }
      } catch (error) {
        return res.status(500).json("Lỗi server");
      }
    };
  }

  add_controller() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { data } = req.body;
        const repository = dataSource.getRepository(this.tableEntity);

        const results: PrimaryEntity[] = [];
        const fieldsOfTableEntity = Object.keys(getConnection().getRepository(this.tableEntity).metadata.propertiesMap);
        for (const item of data) {
          const resultObj = new this.tableEntity();
          Object.keys(item).forEach((key) => {
            if (fieldsOfTableEntity.includes(key)) {
              resultObj[key] = item[key];
            }
          });
          const result = await repository.manager.save(resultObj);
          results.push(result);
        }

        return res.status(200).json(new SuccessResponse(200, "add success", undefined, results));
      } catch (error) {
        console.error(error);
        return res.status(500).json("Lỗi server");
      }
    };
  }

  update_controller() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const repository = dataSource.getRepository(this.tableEntity);

        const option = req.body.option;
        const newData = req.body.data;

        const result = await repository.update(option, newData);

        res.status(200).json(new SuccessResponse(200, "update success", undefined, result));
      } catch (error) {
        next(error);
      }
    };
  }

  delete_controller() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const repository = dataSource.getRepository(this.tableEntity);

        const option = req.body.option;

        const result = await repository.delete(option);

        res.status(200).json(new SuccessResponse(200, "delete success", undefined, result));
      } catch (error) {
        next(error);
      }
    };
  }
}

export default ControllerFactory;
