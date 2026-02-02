import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();

const isProduction = process.env.NODE_ENV === "production";

export const sequelize =
  isProduction && process.env.INTERNAL_DATABASE_URL
    ? new Sequelize(process.env.INTERNAL_DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      })
    : new Sequelize({
        database: process.env.DB_NAME!,
        username: process.env.DB_USER!,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: "postgres",
        logging: console.log,
      });
