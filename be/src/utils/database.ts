import { dbConfig } from "@base/config/database";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: dbConfig.dbDatabase,
  username: dbConfig.dbUsername,
  repositoryMode: true,
  password: dbConfig.dbPassword,
  dialect: dbConfig.dbConnection as any,
  host: dbConfig.dbHost,
  port: parseInt(dbConfig.dbPort),
  timezone: "+07:00",
  models: [__dirname + '/../api/models/**/*.ts'],
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


export default sequelize;