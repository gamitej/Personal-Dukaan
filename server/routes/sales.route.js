import express from "express";
import Sales from "../models/sales.model.js";
import { updateStockAfterSale } from "../utils/updateStock.js";

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
        "company",
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
    const { date, weight, weightType } = req.body;

    const { error, data } = await updateStockAfterSale(req.body);

    if (!error) {
      console.log("hi");
      const newSale = await Sales.create({
        date: new Date(date),
        weight: `${weight}${weightType}`,
        ...req.body,
      });
      return res.status(200).json(newSale);
    }

    return res.status(404).json(data.message);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Something went wrong");
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const { date, weight, weightType } = req.body;

    const updatedSale = await Sales.findByPk(saleId);
    if (!updatedSale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    await updatedSale.update({
      date: new Date(date),
      weight: `${weight}${weightType}`,
      ...req.body,
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
