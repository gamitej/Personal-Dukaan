import { v4 as uuidv4 } from "uuid";
import { DataTypes } from "sequelize";
import sequelize from "../database/connection.js";

const Payments = sequelize.define("Payments", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  party: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentMode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paid: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Payments;
