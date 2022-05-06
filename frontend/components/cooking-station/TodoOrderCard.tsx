import FinishTodoModal from "components/modals/FinishTodoModal";
import OrderItemText from "components/text/OrderItemText";
import axiosInstance from "helpers/axios";
import React, { useState } from "react";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { RiArrowGoBackFill, RiDeleteBin5Line } from "react-icons/ri";
import { BiFoodMenu } from "react-icons/bi";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GrRevert } from "react-icons/gr";
import { formatDateTime } from "utils/formatDateTime";

const cardStatus = {
  pending: "waiting",
  cooking: "cooking",
  done: "done",
};

const TodoOrderCard = ({
  default_status,
  order_id,
  order_method,
  queue_num,
  queue_group,
  table_name,
  topping,
  menu_name,
  quantity,
  isInstantOrder,
  setShowFinishOrderModal,
  setShowCancelOrderModal,
  setCurrOrderDetails,
  date_create,
  date_done,
}) => {
  const [status, setStatus] = useState(default_status);

  const updateStatus = () => {
    if (status === cardStatus.pending) {
      axiosInstance.patch(`/order/status/${order_id}`, { status: "cooking" });
      setStatus(cardStatus.cooking);
    } else if (status === cardStatus.cooking) {
      setCurrOrderDetails({
        order_id,
        order_method,
        queue_num,
        queue_group,
        table_name,
        topping,
        menu_name,
        quantity,
        isInstantOrder,
      });
      setShowFinishOrderModal(true);
      console.log("hee");
    }
  };

  const cancelOrderClick = (e) => {
    e.stopPropagation();
    setCurrOrderDetails({
      order_id,
      order_method,
      queue_num,
      queue_group,
      table_name,
      topping,
      menu_name,
      quantity,
      isInstantOrder,
    });
    setShowCancelOrderModal(true);
  };

  return (
    <div
      className={
        "relative bg-white px-4 py-3 rounded mt-4 border border-r-8 shadow-md text-left " +
        `${
          status === "waiting"
            ? "border-gray-300"
            : status === "cooking"
            ? "border-yellow-400"
            : status === "done"
            ? "border-green-400 opacity-70"
            : null
        }`
      }
      onClick={updateStatus}
    >
      <div className="absolute left-0">
        {isInstantOrder && <div className="h-6 w-3 bg-red-500"></div>}
      </div>
      <div className="flex justify-between text-lg">
        <p>
          {order_method === "dine-in"
            ? `โต๊ะ ${table_name}`
            : order_method === "wait-dine-in"
            ? "รอโต๊ะ"
            : order_method === "delivery"
            ? "ไรเดอร์"
            : "รับเอง"}{" "}
          - #{queue_group}
          {queue_num}
        </p>
        <div className="flex items-center space-x-2.5">
          {status !== "done" && (
            <div onClick={(e) => cancelOrderClick(e)}>
              <RiDeleteBin5Line color={"red"} size={"20"} />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-1.5 text-lg">
        <AiOutlineClockCircle />
        <p>{formatDateTime(date_create).formatted_time} น.</p>
      </div>
      {default_status === "done" && (
        <div className="flex items-center space-x-1.5 text-lg">
          <BsFillCheckCircleFill size={"18"}/>
          <p>{formatDateTime(date_done).formatted_time} น.</p>
        </div>
      )}
      <div className="grid grid-cols-7 mt-1 text-lg">
        <div className="flex space-x-1.5 col-span-6 items-start">
          <div className="pt-1">
            <BiFoodMenu />
          </div>
          <div>
            <span>{menu_name} </span>
            {topping.map((item) => (
              <OrderItemText key={item.name} orderItem={item} />
            ))}
          </div>
        </div>
        <div className="text-right">x {quantity}</div>
      </div>
    </div>
  );
};

export default TodoOrderCard;
