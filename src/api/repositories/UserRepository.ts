
import { RepositoryBase } from '@base/infrastructure/abstracts/RepositoryBase';
import User from '@base/api/models/User';
import { Service } from 'typedi';
import { Model } from 'sequelize-typescript';
import { CreationAttributes } from 'sequelize';

@Service()
export class UserRepository extends RepositoryBase<User> {

  constructor() {
    super(User);
  }

  public async createUser(data: CreationAttributes<User>) {
    return this.repository.create(data);
  }

  public async updateUser(user: Model<User>, data: object) {
    Object.assign(user, data);
    return await user.save(data);
  }

  public async getMany() {
    
  }

  public async delete(pk : string){
    return await User.destroy({
      where: {
        id: pk
      }
    })
  }
}
