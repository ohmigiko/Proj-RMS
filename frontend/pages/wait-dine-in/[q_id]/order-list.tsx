import OrdersData from "components/OrdersData";
import Header from "components/templates/headers/Header";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React from "react";

const OrderList = () => {
  const router = useRouter();
  const { q_id } = router.query;

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
                text={"คิวรอโต๊ะ"}
                goBackClick={() => router.push("/wait-dine-in")}
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
