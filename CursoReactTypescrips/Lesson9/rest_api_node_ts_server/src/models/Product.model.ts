import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: "products" })
export class Product extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare name: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: false
  })
  declare price: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false
  })
  declare availability: boolean;
}
