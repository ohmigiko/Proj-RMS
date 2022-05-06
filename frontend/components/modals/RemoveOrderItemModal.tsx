import Button from "components/buttons/Button";
import OrderItemText from "components/text/OrderItemText";
import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

const RemoveOrderItemModal = ({
  open,
  confirmClick,
  cancelClick,
  orderItem,
}) => {
  return (
    <div>
      {open ? (
        <>
          <div className="absolute flex justify-center items-center inset-0 z-60">
            <div className="flex flex-wrap gap-6 justify-center items-center px-8">
              <div className="relative w-80 h-content text-center text-2xl font-light rounded-3xl p-6 shadow-around bg-white ">
                <div className="flex justify-center items-center space-x-2">
                  <div>
                    <FiAlertTriangle color={"red"} />
                  </div>
                  <div className="text-red-500">ลบรายการอาหาร</div>
                </div>
                <div className="mt-4">{orderItem}</div>
                <div className="flex w-full space-x-4 mt-8">
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

export default RemoveOrderItemModal;
