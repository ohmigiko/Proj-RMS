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
import { formatDateTime } from "utils/formatDateTime";

const Payment = () => {
  const router = useRouter();
  const { payment_id } = router.query;

  const {
    isLoading: ordersDataLoading,
    serverError: ordersDataError,
    apiData: ordersData,
  } = useFetch("GET", `/payment/${payment_id}`, {});

  const goBackClick = () => {
    router.push("/history");
  };

  return (
    <div>
      {ordersDataLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : ordersData ? (
        <div className="flex flex-col h-screen pb-16">
          <header className="flex flex-col flex-initial">
            <BandHeader
              text={
                <>
                  <div>
                    วันที่{" "}
                    {formatDateTime(ordersData.date_create).formatted_date}
                  </div>
                  <div>
                    เวลา {formatDateTime(ordersData.date_create).formatted_time}
                  </div>
                </>
              }
              goBackClick={goBackClick}
            />
          </header>
          <main className="flex flex-col flex-auto p-6 overflow-auto ">
            <ul>
              {ordersData.Order.map((order) => (
                <li key={order.id}>
                  <OrderList
                    topping={order.topping}
                    menu_name={order.category_name}
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
            <div className="grid grid-cols-4 text-xl mt-4">
              <div className="col-span-3">ทั้งหมด</div>
              <div className="flex justify-between">
                <div className="text-right">{ordersData.total_payed}</div>
                <div>บาท</div>
              </div>
            </div>
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default Payment;
