export function GetOverallProfit(totalProfit = []) {
  const totalAmount = totalProfit.reduce(
    (acc: any, { profit }: { profit: number }) => {
      acc.totalAmount += profit;
      return acc;
    },
    { totalAmount: 0 }
  );

  const totalDetails = totalProfit.map((item: any) => {
    return {
      product: item.type,
      quantity: `${item.total_sold_quantity}/${item.total_purchase_quantity}`,
      avg:
        item.total_sold_quantity !== 0
          ? `Rs ${Math.round(
              item.total_sold_amount / item.total_sold_quantity
            )}/ ${
              item.total_purchase_quantity !== 0
                ? Math.round(
                    item.total_purchase_amount / item.total_purchase_quantity
                  )
                : 0
            }`
          : `Rs 0`,
      sold: `Rs ${item.total_sold_amount}`,
      purchased: `Rs ${item.total_purchase_amount}`,
      profit: `Rs ${item.profit}`,
      isSold: item.total_sold_quantity === item.total_purchase_quantity,
    };
  });

  return { ...totalAmount, totalDetails };
}
