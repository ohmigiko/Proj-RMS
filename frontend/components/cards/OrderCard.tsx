import OrderItemText from "components/text/OrderItemText";
import React from "react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const OrderCard = ({
  menu_name,
  toppings,
  handleClick,
  quantity,
  isInstantOrder,
  isTakeHome,
  status,
}) => {
  return (
    <div
      className="relative border border-gray-300 rounded-xl px-5 py-3 h-20"
      onClick={handleClick}
    >
      <div className="grid gap-y-2 absolute left-0">
        {isInstantOrder && <div className="h-6 w-3 bg-red-500"></div>}
        {!isInstantOrder && isTakeHome && (
          <div className="h-6 w-3 bg-yellow-400"></div>
        )}
        {isInstantOrder && isTakeHome && (
          <div className="h-6 w-3 bg-yellow-400"></div>
        )}
      </div>
      <div className="grid grid-cols-4 h-full">
        <div className="col-span-3">
          <div className="flex text-xl">
            <div>
              {menu_name}{" "}
              {toppings
                .filter((item: { choice: string }) => item.choice.name !== "no")
                .map((topping: { choice: string; name: string }, index) => (
                  <OrderItemText key={index} orderItem={topping} />
                ))}
            </div>
          </div>
        </div>
        <div className="ml-2 flex justify-between items-center h-full">
          <div className="text-right text-xl">
            <div>x{quantity}</div>
          </div>
          <div>
            <IoCheckmarkCircleOutline
              size={"32"}
              color={
                status === "done"
                  ? "green"
                  : status === "cooking"
                  ? "orange"
                  : "grey"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
