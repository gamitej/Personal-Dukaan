import Pending from "../models/pendingPayment.model.js";

// Function to update pending-paymnets after a purchase
export async function updatePendingPaymentRecord(
  payment,
  operationType = "update"
) {
  try {
    const { product, party, type, amount } = payment;

    const paymentAmount = parseInt(amount);

    // for update type
    if (operationType === "update") {
      const [pending, created] = await Pending.findOrCreate({
        where: { product: product, party: party, type: type, amount: amount },
      });

      if (!created) {
        pending.amount = parseInt(pending.amount) + paymentAmount;
        await pending.save();
      }

      const res = {
        error: false,
        data: { message: "Payment record received", details: pending },
      };

      return res;
    }
    // for delete type
    else {
      const pending = await Pending.findOne({
        where: { product: product, party: party, type: type },
      });

      if (pending && parseInt(pending.amount) >= paymentAmount) {
        pending.amount = parseInt(pending.amount) - paymentAmount;
        await pending.save();
        const res = {
          error: false,
          data: { message: "Payment updated successfully", details: pending },
        };

        return res;
      }

      const res = {
        error: true,
        data: { message: "Stock updated after purchase", details: pending },
      };

      if (!pending) res.data.message = "Payment record not found";
      res.data.message = "payment amount should not exceed purchase amount";
      return res;
    }
  } catch (error) {
    const res = {
      error: true,
      data: { message: "Error updating payment", details: error },
    };

    return res;
  }
}
