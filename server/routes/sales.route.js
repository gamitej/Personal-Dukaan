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

router.post("/", async (req, res) => {
  try {
    const { date, product, amount, quantity, weight, weightType, type } =
      req.body;

    const newSale = await Sales.create({
      date: new Date(date),
      product,
      quantity,
      weight: `${weight}${weightType}`,
      amount,
      type,
    });

    return res.status(200).json(newSale);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const { date, product, amount, quantity, weight, weightType, type } =
      req.body;

    const updatedSale = await Sales.findByPk(saleId);
    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await updatedSale.update({
      date: new Date(date),
      product,
      quantity,
      weight: `${weight}${weightType}`,
      amount,
      type,
    });

    return res.status(200).json(updatedSale);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;

    const deletedSale = await Sales.findByPk(saleId);
    if (!deletedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await deletedSale.destroy();

    return res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
