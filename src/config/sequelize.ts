require("dotenv").config();
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { join } from "path";
import pg from "pg";

const sequelizeOptions: SequelizeOptions = {
  models: [join(__dirname, "..", "models")],
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const postgresConnectionOptions = {
  logging: false,
};

pg.defaults.parseInt8 = true;

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;
const dialect = process.env.DB_DIALECT;

const POSTGRES_DB_URL = `${dialect}://${user}:${password}@${host}:${port}/postgres`;
const DB_URL = `${dialect}://${user}:${password}@${host}:${port}/${database}`;

export let sequelize = new Sequelize(
  POSTGRES_DB_URL,
  postgresConnectionOptions
);

export const sequelizeConnect = async () => {
  try {
    const result = await sequelize.query(`
      SELECT 1 FROM pg_database WHERE datname = '${database}'
    `);

    if (result[0].length === 0) {
      await sequelize.query(`CREATE DATABASE ${database};`);
    }
    await Promise.all([
      sequelize.query(`
        GRANT ALL PRIVILEGES ON DATABASE ${database} TO ${user};
      `),
      sequelize.query(`
        ALTER DATABASE ${database} OWNER TO ${user};
      `),
      sequelize.query(`
        ALTER DATABASE ${database} SET timezone TO 'UTC';
      `),
      sequelize.query(`
        ALTER DATABASE ${database} SET client_encoding TO 'UTF8';
      `),
    ]);

    await sequelize.close();

    sequelize = new Sequelize(DB_URL, sequelizeOptions);

    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    console.log("Database connection has been established successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
    await sequelize.close();
    throw err;
  }
};
