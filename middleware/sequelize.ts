import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432, 
    username: 'postgres',
    password: 'may13@1993',
    database: 'atlandb',
  });