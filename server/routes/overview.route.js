import express from "express";
import sequelize from "../database/connection.js";
import Sales from "../models/sales.model.js";
import Purchase from "../models/purchase.model.js";

const router = express.Router();

router.get("/total-profit", async (req, res) => {
  try {
    // Fetching sales data grouped by type
    const salesByType = await Sales.findAll({
      attributes: [
        "type",
        [sequelize.fn("SUM", sequelize.col("amount")), "total_sold_amount"],
        [sequelize.fn("SUM", sequelize.col("quantity")), "total_sold_quantity"],
      ],
      group: ["type"],
    });

    // Fetching purchase data grouped by type
    const purchaseByType = await Purchase.findAll({
      attributes: [
        "type",
        [sequelize.fn("SUM", sequelize.col("amount")), "total_purchase_amount"],
        [
          sequelize.fn("SUM", sequelize.col("quantity")),
          "total_purchase_quantity",
        ],
      ],
      group: ["type"],
    });

    // Calculating profit by type
    const profitByType = salesByType.map((sale) => {
      const saleData = sale.toJSON();

      const purchase = purchaseByType.find(
        (purchase) => purchase.toJSON().type === saleData.type
      );

      const purchaseData = purchase.toJSON();

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

    return res.status(200).json(profitByType);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
