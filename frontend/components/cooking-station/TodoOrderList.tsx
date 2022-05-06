import React from "react";
import TodoOrderCard from "./TodoOrderCard";

const TodoOrderList = ({
  text= "",
  amount=0,
  orders = [],
  setShowFinishOrderModal = undefined,
  setCurrOrderDetails = undefined,
  setShowCancelOrderModal = undefined
}) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-3xl border border-black overflow-hidden">
      <div className="rounded-t-3xl bg-red-200 pt-6 pb-3 px-2">
        <div className="ml-6 text-2xl">
          <span>{text} </span>
          <span className="text-red-500">( {amount} รายการ )</span>
        </div>
      </div>
      <ul className="h-full overflow-y-scroll px-6 py-3">
        {orders.map((order) => (
          <li key={order.id} className="mb-5">
            <TodoOrderCard
              default_status={order.status}
              order_method={order.queue.order_method}
              queue_num={order.queue.queue_num}
              queue_group={order.queue.queue_group}
              table_name={order.queue.table_name}
              topping={order.topping}
              menu_name={order.menu.name}
              quantity={order.quantity}
              isInstantOrder={order.urgent}
              setShowFinishOrderModal={setShowFinishOrderModal}
              setCurrOrderDetails={setCurrOrderDetails}
              order_id={order.id}
              setShowCancelOrderModal={setShowCancelOrderModal}
              date_create={order.date_create}
              date_done={order.date_done}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoOrderList;
