import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'postgres',
    port: 5432, 
    username: 'postgres',
    password: 'may13@1993',
    database: 'atlandb',
  });