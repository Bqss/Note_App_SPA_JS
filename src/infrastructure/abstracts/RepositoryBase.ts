import { InjectRepository } from "@base/decorators/InjectRepository";
import sequelize from "@base/utils/database";
import { Model, Repository } from "sequelize-typescript";
import { Inject } from "typedi";


export abstract class RepositoryBase<T> {
  public repository: Repository<Model<T>>;
  constructor(model: new () => Model) {
    this.repository = sequelize.getRepository(model);
  }

  public async getOneById(id: number, resourceOptions?: object) {
    return await this.repository.findByPk(id, resourceOptions);
  }
}
