import express from "express";
import { Op } from "sequelize";
//models
import Sales from "../models/sales.model.js";
// database
import sequelize from "../database/connection.js";
// utils
import { updateStockAfterSale } from "../utils/updateStock.js";

const router = express.Router();

// total sales number data
router.get("/total-sales", async (req, res) => {
  try {
    const sales = await Sales.findAll({
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

// get the sales table data
router.post("/all", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (startDate !== null && endDate !== null) {
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
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
        order: [["date", "desc"]],
      });

      return res.status(200).json(sales);
    }

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
    const { date, weight, weightType, ...others } = req.body;
    const { error, data } = await updateStockAfterSale(req.body, "update");

    if (!error) {
      const newSale = await Sales.create({
        date: new Date(date),
        weight: `${weight}${weightType}`,
        ...others,
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

    const deletedData = deletedSale.toJSON();
    const { error, data } = updateStockAfterSale(deletedData, "delete");

    if (!error) {
      await deletedSale.destroy();
      return res.status(200).json({ message: "Sale deleted successfully" });
    }

    return res.status(400).json({ message: "Error occured while deleting" });
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
