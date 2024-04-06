import express from "express";
//models
import Expense from "../models/expense.model.js";

const router = express.Router();

// get the expense table data
router.get("/", async (req, res) => {
  try {
    const expense = await Expense.findAll({
      attributes: ["date", "type", "paymentMode", "amount", "expense", "id"],
      order: [["date", "desc"]],
    });

    return res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// add the expense
router.post("/", async (req, res) => {
  try {
    const { date } = req.body;

    const newExpense = await Expense.create({
      date: new Date(date),
      ...req.body,
    });
    return res.status(200).json(newExpense);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Something went wrong");
  }
});

// Delete a expense
router.delete("/:id", async (req, res) => {
  try {
    const expenseId = req.params.id;

    const deletedExpense = await Expense.findByPk(expenseId);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Payment data not found" });
    }

    const data = await deletedExpense.destroy();
    if (data) {
      return res
        .status(200)
        .json({ message: "Payment data deleted successfully" });
    }

    return res.status(400).json({ message: "Error occured while deleting" });
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

export default router;
