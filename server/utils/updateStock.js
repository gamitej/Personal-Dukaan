import Stock from "../models/stock.model.js";

// Function to update stock after a purchase
export async function updateStockAfterPurchase(
  purchase,
  operationType = "update"
) {
  try {
    const { product, quantity, company, type } = purchase;

    const purchaseQuantity = parseInt(quantity);

    // for update type
    if (operationType === "update") {
      // Update stock table with the purchased quantity
      const [stock, created] = await Stock.findOrCreate({
        where: { product: product, company: company, type: type },
        defaults: { quantity: purchaseQuantity },
      });

      if (!created) {
        stock.quantity = parseInt(stock.quantity) + purchaseQuantity;
        await stock.save();
      }

      const res = {
        error: false,
        data: { message: "Stock updated after purchase", details: stock },
      };

      return res;
    }
    // for delete type
    else {
      const stock = await Stock.findOne({
        where: { product: product, company: company, type: type },
      });

      if (stock) {
        stock.quantity = parseInt(stock.quantity) - purchaseQuantity;
        await stock.save();
      }

      const res = {
        error: false,
        data: { message: "Stock updated after purchase", details: stock },
      };

      return res;
    }
  } catch (error) {
    const res = {
      error: true,
      data: { message: "Error updating stock after purchase", details: error },
    };

    return res;
  }
}

// Function to update stock after a sale
export async function updateStockAfterSale(sale, operationType = "update") {
  try {
    const { product, quantity, company, type } = sale;

    const purchaseQuantity = parseInt(quantity);

    // for update
    if (operationType === "update") {
      // Update stock table to reflect the sale
      const stock = await Stock.findOne({
        where: { product: product, company: company, type: type },
      });

      if (stock) {
        if (parseInt(stock.quantity) >= purchaseQuantity) {
          stock.quantity = parseInt(stock.quantity) - purchaseQuantity;
          await stock.save();
          const res = {
            error: false,
            data: { message: "Stock updated after sale", details: stock },
          };
          return res;
        }
        const res = {
          error: true,
          data: {
            message: "Insufficient stock available for this sale",
            details: stock,
          },
        };
        return res;
      }

      const res = {
        error: true,
        data: {
          message: `Stock not found for product: ${product} & type ${type} ${company}`,
          details: product,
        },
      };
      return res;
    }
    // for delete
    else {
      const stock = await Stock.findOne({
        where: { product: product, company: company, type: type },
      });

      if (stock) {
        stock.quantity = parseInt(stock.quantity) + purchaseQuantity;
        await stock.save();
      }

      const res = {
        error: false,
        data: { message: "Stock updated after sale", details: stock },
      };

      return res;
    }
  } catch (error) {
    const res = {
      error: true,
      data: { message: "Error updating stock after purchase", details: error },
    };
    return res;
  }
}
