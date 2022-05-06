import React, { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, resetOrderList } from "redux/actions/orderAction";
import { FaCashRegister } from "react-icons/fa";
import { GiHotMeal, GiMeal, GiTable } from "react-icons/gi";
import Button from "./buttons/Button";
import QueueTab from "./tabs/QueueTab";
import AddQueueTab from "./tabs/AddQueueTab";
import { addQueueDetails } from "redux/actions/queueAction";
import OrderCard from "./cards/OrderCard";
import axiosInstance from "helpers/axios";
import Modal from "./modals/Modal";
import Loading from "./templates/Loading";
import axios from "axios";
import { BiFoodMenu } from "react-icons/bi";

const OrdersData = ({
  tableQueues = undefined,
  ordersData,
  ordersDataLoading,
  table_id = null,
  q_id,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { order_method, queue_group, queue_num, queue_id } = useSelector(
    (state) => state.current_queue
  );

  const [currOrder, setCurrOrder] = useState(null);
  const [activeTab, setActiveTab] = useState(q_id);
  const [openEditOrderModal, setOpenEditOrderModal] = useState(false);
  const [openEditQueueModal, setOpenEditQueueModal] = useState(false);

  useEffect(() => {
    dispatch(resetOrderList());
    setActiveTab(q_id);
  }, [dispatch, q_id]);
  console.log("tableQueues", tableQueues);

  const tabClick = (q) => {
    setActiveTab(q.id);
    dispatch(
      addQueueDetails({
        queue_id: q.id,
        queue_num: q.queue_num,
        queue_group: q.queue_group,
      })
    );
    router.push(`/dine-in/tables/${table_id}/order-list/${q.id}`);
  };

  const handleOrderClick = () => {
    router.push("/menu");
  };

  const handlePaymentClick = () => {
    router.push(`/payment/${q_id}`);
  };

  const handleOrderCardClick = (order) => {
    const {
      category_id,
      id: order_id,
      menu_id,
      topping,
      price,
      quantity,
    } = order;

    console.log("order", order);
    setCurrOrder({
      category_id,
      order_id,
      menu_id,
      menu_name: order.menu.name,
      topping,
      price,
      quantity,
      status: "edit_from_ordered",
    });
    setOpenEditOrderModal(true);
  };
  console.log("currOrder", currOrder);
  const handleEditQueueClick = () => {
    setOpenEditQueueModal(true);
  };

  const editOrderClick = () => {
    dispatch(addOrder(currOrder));
    router.push(`/menu/${currOrder.menu_id}`);
  };

  const cancelOrderClick = () => {
    axiosInstance
      .delete(`/order/delete/${currOrder.order_id}`)
      .then((res) => window.location.reload());
    setOpenEditOrderModal(false);
  };

  const addQueueToTableClick = () => {
    router.push(`/wait-dine-in/${queue_id}/select-table`);
  };

  const cancelAllOrdersClick = () => {
    console.log("clicked");
    axiosInstance
      .delete(`order/delete-by-queue/${queue_id}`)
      .then((res) => {
        console.log(res.data);
      })
      .then(() => window.location.reload());
    setOpenEditQueueModal(false);
  };

  const editOrderOptions = [
    { text: "ยกเลิกอาหาร", icon: "", handleClick: cancelOrderClick },
    { text: "แก้รายการอาหาร", icon: "", handleClick: editOrderClick },
  ];

  let editQueueOptions = [
    { text: "ยกเลิกอาหารทั้งหมด", icon: "", handleClick: cancelAllOrdersClick },
  ];

  if (order_method === "wait-dine-in") {
    editQueueOptions = [
      { text: "ยกเลิกอาหารทั้งหมด", icon: "", handleClick: cancelOrderClick },
    ];
  }
  const zIdxTab = [40, 20, 10, 0];

  return (
    <>
      <div className="flex h-full flex-col w-screen overflow-hidden">
        <header className="flex flex-col flex-initial">
          <ul className="flex flex-row items-end relative">
            {tableQueues &&
              tableQueues.map((q, index) => (
                <QueueTab
                  key={q.id}
                  activeTab={activeTab}
                  editClick={handleEditQueueClick}
                  tabClick={() => tabClick(q)}
                  q_id={q.id}
                  q_group={q.queue_group}
                  q_num={q.queue_num}
                  zIdx={`z-${zIdxTab[index]}`}
                />
              ))}
            {tableQueues && tableQueues.length !== 4 && <AddQueueTab />}
            {!tableQueues && (
              <QueueTab
                activeTab={activeTab}
                editClick={handleEditQueueClick}
                tabClick={undefined}
                q_id={queue_id}
                q_group={queue_group}
                q_num={queue_num}
                zIdx={undefined}
              />
            )}
          </ul>
          <hr className="border border-red-500" />
        </header>
        <main className="flex flex-col flex-auto mt-4 overflow-auto">
          {ordersDataLoading ? (
            <Loading />
          ) : ordersData.length !== 0 ? (
            <div className="px-4 flex flex-col min-w-0 w-full">
              <ul className="relative block overflow-auto">
                {ordersData.map((order) => (
                  <li key={order.id} className="mt-4">
                    <OrderCard
                      menu_name={order.menu.name}
                      toppings={order.topping}
                      handleClick={() => handleOrderCardClick(order)}
                      quantity={order.quantity}
                      isInstantOrder={order.urgent}
                      isTakeHome={order.take_home}
                      status={order.status}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="grid items-center justify-center h-full text-2xl text-center">
              <div>ยังไม่มีรายการอาหาร</div>
            </div>
          )}
        </main>
        <footer className="mt-8 px-4 pt-4 pb-2.5 h-content flex justify-between space-x-4 border-t-2 border-red-500 shadow-top">
          {order_method === "wait-dine-in" ? (
            <Button
              text={"ลงโต๊ะ"}
              icon={<GiTable size={"25"} color={"red"} />}
              handleClick={addQueueToTableClick}
            />
          ) : (
            <Button
              text={"คิดเงิน"}
              icon={<FaCashRegister size={"25"} color={"red"} />}
              handleClick={handlePaymentClick}
            />
          )}
          <Button
            text={"สั่งอาหาร"}
            icon={<BiFoodMenu size={"26"} color={"red"} />}
            handleClick={handleOrderClick}
          />
        </footer>
      </div>
      <Modal
        open={openEditOrderModal}
        setOpen={setOpenEditOrderModal}
        options={editOrderOptions}
      />
      <Modal
        open={openEditQueueModal}
        setOpen={setOpenEditQueueModal}
        options={editQueueOptions}
      />
    </>
  );
};

export default OrdersData;
