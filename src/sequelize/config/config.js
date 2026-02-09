require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "mydb",
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
  production: {
    use_env_variable: "INTENRAL_DB_URL", // Render provides this
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // needed for some hosted DBs
      },
    },
  },
};
