import express from "express";
import { Op } from "sequelize";
// database connection
import sequelize from "../database/connection.js";
// models
import Sales from "../models/sales.model.js";
import Purchase from "../models/purchase.model.js";

const router = express.Router();

// total profit
router.post("/total-profit", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    let salesByType = [];

    let purchaseByType = [];

    if (startDate !== null && endDate !== null) {
      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);

      // Fetching sales data grouped by type
      salesByType = await Sales.findAll({
        attributes: [
          "type",
          [sequelize.fn("SUM", sequelize.col("amount")), "total_sold_amount"],
          [
            sequelize.fn("SUM", sequelize.col("quantity")),
            "total_sold_quantity",
          ],
        ],
        group: ["type"],
        where: {
          date: {
            [Op.between]: [startDate, newEndDate],
          },
        },
      });

      // Fetching purchase data grouped by type
      purchaseByType = await Purchase.findAll({
        attributes: [
          "type",
          [
            sequelize.fn("SUM", sequelize.col("amount")),
            "total_purchase_amount",
          ],
          [
            sequelize.fn("SUM", sequelize.col("quantity")),
            "total_purchase_quantity",
          ],
        ],
        group: ["type"],
        where: {
          date: {
            [Op.between]: [startDate, newEndDate],
          },
        },
      });
    } else {
      // Fetching sales data grouped by type
      salesByType = await Sales.findAll({
        attributes: [
          "type",
          [sequelize.fn("SUM", sequelize.col("amount")), "total_sold_amount"],
          [
            sequelize.fn("SUM", sequelize.col("quantity")),
            "total_sold_quantity",
          ],
        ],
        group: ["type"],
      });

      // Fetching purchase data grouped by type
      purchaseByType = await Purchase.findAll({
        attributes: [
          "type",
          [
            sequelize.fn("SUM", sequelize.col("amount")),
            "total_purchase_amount",
          ],
          [
            sequelize.fn("SUM", sequelize.col("quantity")),
            "total_purchase_quantity",
          ],
        ],
        group: ["type"],
      });
    }

    // Calculating profit by type
    const profitByType = salesByType.map((sale) => {
      const saleData = sale.toJSON();

      const purchase = purchaseByType.find(
        (purchase) => purchase.toJSON().type === saleData.type
      );

      let purchaseData = undefined;
      if (purchase !== undefined) purchaseData = purchase.toJSON();

      const profit =
        parseInt(saleData.total_sold_amount) -
        (purchaseData ? parseInt(purchaseData.total_purchase_amount) : 0);

      return {
        type: saleData.type,
        total_sold_quantity: parseInt(saleData.total_sold_quantity),
        total_purchase_quantity: purchaseData
          ? parseInt(purchaseData.total_purchase_quantity)
          : 0,
        total_sold_amount: parseInt(saleData.total_sold_amount),
        total_purchase_amount: purchaseData
          ? parseInt(purchaseData.total_purchase_amount)
          : 0,
        profit: profit,
      };
    });

    // Add purchased types with no sales
    purchaseByType.forEach((purchase) => {
      const purchaseData = purchase.toJSON();
      const typeExists = profitByType.some(
        (profit) => profit.type === purchaseData.type
      );
      if (!typeExists) {
        profitByType.push({
          type: purchaseData.type,
          total_sold_quantity: 0,
          total_purchase_quantity: parseInt(
            purchaseData.total_purchase_quantity
          ),
          total_sold_amount: 0,
          total_purchase_amount: parseInt(purchaseData.total_purchase_amount),
          profit: -parseInt(purchaseData.total_purchase_amount),
        });
      }
    });

    return res.status(200).json(profitByType);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message || error);
  }
});

export default router;
