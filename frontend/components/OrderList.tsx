import useFetch from "hooks/useFetch";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteOneOrder,
  editOrder,
  editQuantity,
} from "redux/actions/orderAction";
import OrderItemText from "./text/OrderItemText";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/dist/client/router";
import RemoveOrderItemModal from "./modals/RemoveOrderItemModal";

const OrderList = ({
  idx,
  category_id,
  topping,
  menu_name,
  menu_id,
  quantity,
  price,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currOrder] = useState({
    category_id: category_id,
    menu_id: menu_id,
    menu_name: menu_name,
    topping: topping,
    price: price,
    quantity: quantity,
    status: "edit_from_summary",
  });

  const [showRemoveOrderItemModal, setShowRemoveOrderItemModal] =
    useState(false);
  const isPaymentPage = router.asPath.includes("/payment");
  const isHistoryPage = router.asPath.includes("/history");

  const editOrderClick = () => {
    dispatch(editOrder(currOrder, idx));
    router.push(`/menu/${currOrder.menu_id}`);
  };

  const showRemoveOrderItemModalClick = () => {
    setShowRemoveOrderItemModal(true);
  };

  const removeOrderItemClick = () => {
    dispatch(deleteOneOrder(idx));
  };

  const cancelRemoveOrderItemClick = () => {
    setShowRemoveOrderItemModal(false);
  };

  const orderItem = (
    <div>
      <span>{menu_name}</span>{" "}
      {topping
        .filter((item: any) => item.choice.name !== "no")
        .map((toppingItem: any, index: any) => (
          <OrderItemText key={index} orderItem={toppingItem} />
        ))}
    </div>
  );

  return (
    <>
      <div>
        <div className="grid grid-cols-4 py-4">
          <div className="col-span-3 text-xl">{orderItem}</div>
          <div className="flex justify-between">
            <div className="text-right text-xl">x{quantity}</div>
            <div>
              <div className="text-right text-xl">{price}</div>
              {!isPaymentPage && !isHistoryPage && (
                <div className="flex space-x-2 items-end">
                  <div
                    className="mt-2 text-md text-red-500 font-light"
                    onClick={editOrderClick}
                  >
                    <FiEdit color={"red"} size={"20"} />
                  </div>
                  <div onClick={showRemoveOrderItemModalClick}>
                    <RiDeleteBin5Line color={"red"} size={"20"} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <RemoveOrderItemModal
        open={showRemoveOrderItemModal}
        confirmClick={removeOrderItemClick}
        cancelClick={cancelRemoveOrderItemClick}
        orderItem={orderItem}
      />
    </>
  );
};

export default OrderList;
