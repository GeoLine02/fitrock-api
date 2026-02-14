import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../../db";
import { TypeModels } from "./associations";

// Interface for attributes
interface CartAttributes {
  id?: number;
  product_id: number;
  product_quantity: number;
  user_id: number;
}

// Optional attributes for creation
interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}

// Model class
export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public product_id!: number;
  public product_quantity!: number;
  public user_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations
  static associate(models: TypeModels) {
    Cart.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    Cart.belongsTo(models.Products, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });
  }
}

// Initialize model
Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Products",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    product_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users", // table name
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "Carts", // you can change if needed
    modelName: "Cart",
    timestamps: true,
  },
);
