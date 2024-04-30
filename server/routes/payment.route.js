import express from "express";
import { Op } from "sequelize";
// database connection
import sequelize from "../database/connection.js";
//models
import Payment from "../models/payment.model.js";
import PendingPayment from "../models/pendingPayment.model.js";
import { updatePendingPaymentRecord } from "../utils/updatePayment.js";

const router = express.Router();

// Total payment number data
router.post("/total-pending-payment", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (startDate !== null && endDate !== null) {
      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);

      const payment = await PendingPayment.findAll({
        attributes: ["party", "product", "type", "amount"],
        order: [["type", "ASC"]],
        where: {
          date: {
            [Op.between]: [startDate, newEndDate],
          },
        },
      });

      return res.status(200).json(payment);
    }

    const payment = await PendingPayment.findAll({
      attributes: ["party", "product", "type", "amount"],
      order: [["type", "ASC"]],
    });

    return res.status(200).json(payment);
  } catch (error) {
    return res.status(500).json(error.message || error);
  }
});

// get the payment table data
router.post("/all", async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    if (startDate !== null && endDate !== null) {
      const newEndDate = new Date(endDate);
      newEndDate.setDate(newEndDate.getDate() + 1);

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
        where: {
          date: {
            [Op.between]: [startDate, newEndDate],
          },
        },
      });

      return res.status(200).json(payment);
    }

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
    const { date, paid, ...others } = req.body;

    const newPaymentReq = { amount: paid, ...others };

    const { error, data } = await updatePendingPaymentRecord(
      newPaymentReq,
      "delete"
    );

    if (error) return res.status(400).json(data);

    const newPayment = await Payment.create({
      date: new Date(date),
      paid: paid,
      ...others,
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

    const deletedData = deletedPayment.toJSON();
    deletedData.amount = deletedData.paid;
    const { error, data: resData } = updatePendingPaymentRecord(
      deletedData,
      "update"
    );

    if (error) return res.status(error).json(resData);

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
