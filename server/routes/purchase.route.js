import express from "express";
import Purchase from "../model/purchase.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sales = await Purchase.findAll({
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
      type,
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
      type,
    });

    return res.status(200).json(newPurchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Update a sale
router.put("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;
    const {
      date,
      product,
      amount,
      quantity,
      weight,
      weightType,
      company,
      party,
      type,
    } = req.body;

    const updatedPurchase = await Purchase.findByPk(saleId);
    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await updatedPurchase.update({
      date: new Date(date),
      product,
      quantity,
      weight: `${weight}${weightType}`,
      amount,
      company,
      party,
      type,
    });

    return res.status(200).json(updatedPurchase);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// Delete a sale
router.delete("/:id", async (req, res) => {
  try {
    const saleId = req.params.id;

    const deletedPurchase = await Purchase.findByPk(saleId);
    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    await deletedPurchase.destroy();

    return res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
