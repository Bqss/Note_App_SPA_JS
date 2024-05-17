import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, IsUUID, Length, PrimaryKey, Table, Model } from "sequelize-typescript";


@Table({
  timestamps: true
})
export class Notes extends Model<InferAttributes<Notes>, InferCreationAttributes<Notes>>{
  @PrimaryKey
  @IsUUID(5)
  @Column
  id: string;

  @Length({ max: 255 })
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;
}