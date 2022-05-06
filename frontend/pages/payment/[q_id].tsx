import Button from "components/buttons/Button";
import OrderList from "components/OrderList";
import BandHeader from "components/templates/headers/BandHeader";
import React, { useEffect, useState } from "react";
import Modal from "components/modals/Modal";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import Loading from "components/templates/Loading";
import OrderItemText from "components/text/OrderItemText";
import axiosInstance from "helpers/axios";
import SuccessPaymentModal from "components/modals/SuccessPaymentModal";
import { BsCashCoin } from "react-icons/bs";

const Payment = () => {
  const router = useRouter();
  const { q_id } = router.query;

  const {
    isLoading: ordersDataLoading,
    serverError: ordersDataError,
    apiData: ordersData,
  } = useFetch("GET", `/order/by_queue/${q_id}`, {});

  // console.log('ordersData',ordersData)
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openSuccessPaymentModal, setOpenSuccessPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calTotalPrice = () => {
      if (ordersData) {
        const total = ordersData.reduce(
          (prev, curr) => prev + curr.price * curr.quantity,
          0
        );
        setTotalPrice(total);
      }
    };
    calTotalPrice();
  }, [ordersData]);

  const payByCash = () => {
    setOpenPaymentModal(false);
    setOpenSuccessPaymentModal(true);
    setPaymentMethod({ method: "cash" });
  };

  const finishPayment = () => {
    axiosInstance
      .post(`/payment/${q_id}`, paymentMethod)
      .then((res) => console.log(res.data));
    router.push("/dine-in/tables");
  };

  console.log("ordersData", ordersData);

  const paymentModalOptions = [
    // { text: "พร้อมเพย์", icon: "", handleClick: undefined },
    // { text: "โอนเงิน", icon: "", handleClick: undefined },
    { text: "เงินสด", icon: BsCashCoin, handleClick: payByCash },
  ];

  const goBackClick = () => {};

  return (
    <div>
      {ordersDataLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : ordersData ? (
        <div className="flex flex-col h-screen">
          <header className="flex flex-col flex-initial">
            <BandHeader text={"ชำระเงิน"} goBackClick={() => router.back()} />
          </header>
          <main className="flex flex-col flex-auto p-6 overflow-auto ">
            <ul>
              {ordersData.map((order) => (
                <li key={order.id}>
                  <OrderList
                    topping={order.topping}
                    menu_name={order.menu.name}
                    quantity={order.quantity}
                    price={order.price * order.quantity}
                    category_id={order.category_id}
                    menu_id={order.menu_id}
                    idx={undefined}
                  />
                  <hr />
                </li>
              ))}
            </ul>
          </main>
          <footer className="px-6 pt-4 flex flex-col shadow-top">
            <div className="grid grid-cols-4 text-xl">
              <div className="col-span-3">ทั้งหมด</div>
              <div className="flex justify-between">
                <div className="text-right">{totalPrice}</div>
                <div>บาท</div>
              </div>
            </div>
            <div className="mb-6 mt-4">
              <Button
                text={"ชำระเงิน"}
                icon={undefined}
                handleClick={() => setOpenPaymentModal(true)}
                optClassName="text-white bg-red-500"
              />
            </div>
          </footer>
        </div>
      ) : (
        <div>{ordersDataError}</div>
      )}
      <Modal
        open={openPaymentModal}
        setOpen={setOpenPaymentModal}
        options={paymentModalOptions}
      />
      <SuccessPaymentModal
        open={openSuccessPaymentModal}
        handleClick={finishPayment}
      />
    </div>
  );
};

export default Payment;
