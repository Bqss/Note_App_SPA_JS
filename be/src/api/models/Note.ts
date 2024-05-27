import { InferAttributes, InferCreationAttributes } from "sequelize";
import { Column, DataType, IsUUID, Length, PrimaryKey, Table, Model } from "sequelize-typescript";


@Table({
  timestamps: true
})
export class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>>{
  @PrimaryKey
  @IsUUID(4)
  @Column
  id: string;

  @Column
  is_archived: string;

  @Column
  slug: string;


  @Length({ max: 255 })
  @Column
  title: string;

  @Column(DataType.TEXT)
  content: string;
}