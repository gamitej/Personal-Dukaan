import express from "express";
// database connection
import sequelize from "../database/connection.js";
//models
import Purchase from "../models/purchase.model.js";
// utils
import { updateStockAfterPurchase } from "../utils/updateStock.js";
import { updatePendingPaymentRecord } from "../utils/updatePayment.js";

const router = express.Router();

// Total purchase number data
router.get("/total-purchase", async (req, res) => {
  try {
    const sales = await Purchase.findAll({
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

// Get the purchase table data
router.get("/", async (req, res) => {
  try {
    const purchase = await Purchase.findAll({
      attributes: [
        "date",
        "product",
        "type",
        "company",
        "party",
        "quantity",
        "weight",
        "amount",
        "id",
      ],
      order: [["date", "desc"]],
    });

    return res.status(200).json(purchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Add purchased products
router.post("/", async (req, res) => {
  try {
    const { date, weight, weightType, ...others } = req.body;

    console.log(req.body);

    const newPurchase = await Purchase.create({
      date: new Date(date),
      weight: `${weight}${weightType}`,
      ...others,
    });

    const { error: pendingStock, data } = await updateStockAfterPurchase(
      req.body,
      "update"
    );
    const { error: pendingError, data: pendingData } =
      await updatePendingPaymentRecord(req.body, "update");

    if (!pendingStock && !pendingError)
      return res.status(200).json(newPurchase);
    return res.status(404).json(data);
  } catch (pendingStock) {
    return res.status(500).json(pendingStock.message || pendingStock);
  }
});

// Update a purchase
router.put("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const { date, weight, weightType } = req.body;

    const updatedPurchase = await Purchase.findByPk(saleId);
    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await updatedPurchase.update({
      date: new Date(date),
      weight: `${weight}${weightType}`,
      ...req.body,
    });

    return res.status(200).json(updatedPurchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Delete a purchase
router.delete("/:id", async (req, res) => {
  try {
    const purchaseId = req.params.id;

    const deletedPurchase = await Purchase.findByPk(purchaseId);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    const deletedData = deletedPurchase.toJSON();
    const { error, data } = updateStockAfterPurchase(deletedData, "delete");

    if (!error) {
      await deletedPurchase.destroy();
      return res.status(200).json({ message: "Purchase deleted successfully" });
    }

    return res.status(400).json({ message: "Error occured while deleting" });
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
