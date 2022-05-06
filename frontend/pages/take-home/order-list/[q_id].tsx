import OrdersData from "components/OrdersData";
import Header from "components/templates/headers/Header";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";

const OrderList = () => {
  const router = useRouter();
  const { q_id } = router.query;
  const { order_method } = useSelector(
    (state) => state.current_queue
  );

  const {
    isLoading: ordersDataLoading,
    serverError: ordersDataError,
    apiData: ordersData,
  } = useFetch("GET", `/order/by_queue/${q_id}`, {}, true);

  return (
    <div className="h-full">
      {ordersDataLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : (
        ordersData && (
          <div className="flex flex-col h-full">
            <header>
              <Header
                text={order_method === "pick-up" ? "รับเอง" : "ไรเดอร์"}
                goBackClick={() => router.push("/take-home")}
              />
            </header>
            <OrdersData
              ordersData={ordersData}
              ordersDataLoading={ordersDataLoading}
              q_id={q_id}
            />
          </div>
        )
      )}
    </div>
  );
};

export default OrderList;
