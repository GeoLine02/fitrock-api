"use strict";
import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { sequelize } from "../../db"; // your sequelize instance
import { TypeModels } from "./associations";

interface FiltersAttributes {
  id: number;
  weight_amount: number;
}

interface FiltersCreationAttributes extends Optional<FiltersAttributes, "id"> {}

export class Filters
  extends Model<FiltersAttributes, FiltersCreationAttributes>
  implements FiltersAttributes
{
  public id!: number;
  public weight_amount!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(models: TypeModels) {
    Filters.hasMany(models.Products, {
      foreignKey: "filter_id",
      as: "products",
    });
  }
}

// Initialize immediately
Filters.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    weight_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Filters",
    tableName: "Filters",
    timestamps: true,
  },
);
