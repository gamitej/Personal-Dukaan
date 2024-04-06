import express from "express";
//models
import Payment from "../models/payment.model.js";

const router = express.Router();

// get the payment table data
router.get("/", async (req, res) => {
  try {
    const payment = await Payment.findAll({
      attributes: [
        "date",
        "product",
        "type",
        "paymentMode",
        "party",
        "paid",
        "id",
        "company",
      ],
      order: [["date", "desc"]],
    });

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// add the payment
router.post("/", async (req, res) => {
  try {
    const { date } = req.body;

    const newPayment = await Payment.create({
      date: new Date(date),
      ...req.body,
    });
    return res.status(200).json(newPayment);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Something went wrong");
  }
});

// Delete a payment
router.delete("/:id", async (req, res) => {
  try {
    const paymentId = req.params.id;

    const deletedPayment = await Payment.findByPk(paymentId);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment data not found" });
    }

    const data = await deletedPayment.destroy();
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