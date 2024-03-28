import express from "express";
import Stock from "../models/stock.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const stock = await Stock.findAll();

    return res.status(200).json(stock);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
