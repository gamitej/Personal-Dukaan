import express from "express";
import sequelize from "../database/connection.js";
import Sales from "../models/sales.model.js";
import Purchase from "../models/purchase.model.js";

const router = express.Router();

router.get("/total-profit", async (req, res) => {
  try {
    const sales = await Sales.findAll({
      attributes: [
        "type",
        [sequelize.fn("sum", sequelize.col("quantity")), "quantity"],
        [sequelize.fn("sum", sequelize.col("amount")), "amount"],
      ],
      group: ["type"],
      order: [["type", "ASC"]],
    });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});
