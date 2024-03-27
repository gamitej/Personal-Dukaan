import express from "express";
import Sales from "../model/sales.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Sales.findAll({
      attributes: [
        "date",
        "product",
        "type",
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

export default router;
