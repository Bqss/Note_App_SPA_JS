import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Model } from "sequelize-typescript";
import { AllowNull, Column, CreatedAt, DataType, IsEmail, IsUUID, PrimaryKey, Table, UpdatedAt } from "sequelize-typescript";

@Table({
  timestamps: true,
})
export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {

  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @Column
  username: string;

  @IsEmail
  @Column
  email: string;

  @Column
  password: string;

  @AllowNull(true)
  @Column(DataType.TIME)
  verifiedAt: Date;
}
