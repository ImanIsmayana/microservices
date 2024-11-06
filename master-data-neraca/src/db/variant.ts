import { Column, Model, DataType, Table, Sequelize } from 'sequelize-typescript';

@Table
export class variant extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  id!: number;

  @Column({
    type: DataType.STRING(55),
    allowNull: false,
  })
  name!: string;

  // More columns can go here, assuming the structure is the same for both tables
}

export const getDynamicVariantModel = (sequelize: Sequelize, tableName: string) => {
  return variant.init(
    {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataType.STRING(55),
        allowNull: false,
      },
    },
    {
      tableName,
      sequelize,
      timestamps: false,
    },
  );
};