import Button from "components/buttons/Button";
import OrderItemText from "components/text/OrderItemText";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const CancelTodoModal = ({ open, confirmClick, cancelClick, details }) => {
  const {
    order_method,
    queue_num,
    queue_group,
    table_name,
    topping,
    menu_name,
    quantity,
    isInstantOrder,
  } = details;

  return (
    <div>
      {open ? (
        <>
          <div className="absolute flex justify-center items-center inset-0 z-60">
            <div className="flex flex-wrap gap-6 justify-center items-center px-8">
              <div className="relative w-96 h-80 text-center text-3xl font-light rounded-3xl p-6 shadow-around bg-white ">
                <div className="flex justify-center items-center space-x-2">
                  <div><FiAlertTriangle color={'red'}/></div>
                  <div className="text-red-500 text-4xl">ยกเลิกออเดอร์</div>
                </div>
                <div className="mt-8">
                  {order_method === "dine-in"
                    ? `โต๊ะ ${table_name}`
                    : order_method === "wait-dine-in"
                    ? "รอโต๊ะ"
                    : order_method === "delivery"
                    ? "ไรเดอร์"
                    : "รับเอง"}{" "}
                  - #{queue_group}
                  {queue_num}
                </div>
                <div className="mt-4">
                  <span>{menu_name} </span>
                  {topping.map((item) => (
                    <OrderItemText key={item.name} orderItem={item} />
                  ))}
                  x {quantity}
                </div>
                <div className="px-8 flex justify-evenly w-full space-x-4 mt-8">
                  <Button
                    text={"ไม่"}
                    icon={undefined}
                    handleClick={cancelClick}
                    optClassName={"text-gray-500"}
                  ></Button>
                  <Button
                    text={"ใช่"}
                    icon={undefined}
                    handleClick={confirmClick}
                    optClassName={"text-white bg-red-500"}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-50 bg-black"
            onClick={cancelClick}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default CancelTodoModal;
