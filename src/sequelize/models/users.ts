import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { sequelize } from "../../db"; // make sure you have your Sequelize instance

// Interface for attributes
interface UserAttributes {
  id?: number;
  full_name: string;
  email: string;
  password: string;
  phone_number?: string;
}

// Optional attributes for creation
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

// Model class
export class Users
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public phone_number?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations placeholder
  static associate(models: any) {
    // define associations here, e.g., this.hasMany(models.Products)
  }
}

// Initialize model immediately
Users.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize, // imported Sequelize instance
    tableName: "Users",
    modelName: "Users",
    timestamps: true,
  },
);
