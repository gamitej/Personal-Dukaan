import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  host: "./db.sqlite",
});

export default sequelize;
