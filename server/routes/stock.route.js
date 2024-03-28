import express from "express";
import Stock from "../models/stock.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const stock = await Stock.findAll();

    // Grouping stock items by type
    const groupedStock = stock.reduce((acc, item) => {
      const { type, product, company, quantity } = item;
      if (!acc[type]) {
        acc[type] = {
          title: type,
          productList: [],
          total: 0,
        };
      }
      acc[type].productList.push({ product, company, stock: quantity });
      acc[type].total += quantity;
      return acc;
    }, {});

    // Convert object to array and sort by title
    const stockList = Object.values(groupedStock).sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    return res.status(200).json(stockList);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
