import React from "react";
import { RiHistoryLine } from "react-icons/ri";
import TodoOrderCard from "./TodoOrderCard";

const FinishedOrderList = ({
  finishedOrders = [],
  setShowFinishOrderModal = undefined,
  setShowCancelOrderModal = undefined,
  setCurrOrderDetails = undefined,
}) => {
  return (
    <div className="bg-white w-5/6 px-6 pt-8 pb-10 overflow-auto">
      <div className="h-full overflow-hidden">
        <div className="flex items-center text-2xl text-red-500">
          <div className="mr-3">
            <RiHistoryLine size={"32"} color={"red"} />
          </div>
          <div>เมนูที่พึ่งทำเสร็จ</div>
        </div>
        <ul className="h-full mt-4 pb-12 overflow-y-scroll">
          {finishedOrders.map((order) => (
            <li key={order.id} className="mb-5">
              <TodoOrderCard
                default_status="done"
                order_id={order.id}
                order_method={order.queue.order_method}
                queue_num={order.queue.queue_num}
                queue_group={order.queue.queue_group}
                table_name={order.queue.table_name}
                topping={order.topping}
                menu_name={order.menu.name}
                quantity={order.quantity}
                isInstantOrder={order.urgent}
                setShowFinishOrderModal={setShowFinishOrderModal}
                setShowCancelOrderModal={setShowCancelOrderModal}
                setCurrOrderDetails={setCurrOrderDetails}
                date_create={order.date_create}
                date_done={order.date_done}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FinishedOrderList;
