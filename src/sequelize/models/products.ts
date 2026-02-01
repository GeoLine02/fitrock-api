import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { sequelize } from "../../db"; // import your Sequelize instance

// Interface for attributes
interface ProductAttributes {
  id?: number;
  product_name: string;
  product_price: number;
  product_description?: string;
  product_discount?: number;
  product_quantity?: number;
  product_weight?: number;
}

// Optional attributes for creation
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}

// Model class
export class Products
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public product_name!: string;
  public product_price!: number;
  public product_description?: string;
  public product_discount?: number;
  public product_quantity?: number;
  public product_weight?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations placeholder
  static associate(models: any) {
    // define associations here
  }
}

// Initialize model immediately
Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_description: {
      type: DataTypes.STRING,
    },
    product_discount: {
      type: DataTypes.INTEGER,
    },
    product_quantity: {
      type: DataTypes.INTEGER,
    },
    product_weight: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize, // <--- the imported Sequelize instance
    tableName: "Products",
    modelName: "Products",
    timestamps: true,
  },
);
