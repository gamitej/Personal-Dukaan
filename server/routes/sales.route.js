import express from "express";
import Sales from "../model/sales.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Sales.findAll({
      attributes: ["date", "product", "quantity", "weight", "amount"],
    });

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { date, product, amount, quantity, weight } = req.body;

    const newSale = await Sales.create({
      date: new Date(date),
      product,
      quantity,
      weight,
      amount,
    });

    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
