import React from "react";

const OrderItemText = ({ orderItem }) => {
  return (
    <span className={orderItem?.choice?.name === "no" ? "hidden" : orderItem?.choice?.name === "extra" ? "text-red-500" : ""}>
      {orderItem.name}{" "}
    </span>
  );
};

export default OrderItemText;
