import express from "express";
import Purchase from "../model/purchase.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Purchase.findAll({
      attributes: [
        "date",
        "product",
        "company",
        "party",
        "quantity",
        "weight",
        "amount",
        "id",
      ],
      order: [["date", "desc"]],
    });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      date,
      product,
      amount,
      quantity,
      weight,
      weightType,
      party,
      company,
    } = req.body;

    const newPurchase = await Purchase.create({
      date: new Date(date),
      product,
      quantity,
      weight: `${weight}${weightType}`,
      amount,
      party,
      company,
    });

    return res.status(200).json(newPurchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
