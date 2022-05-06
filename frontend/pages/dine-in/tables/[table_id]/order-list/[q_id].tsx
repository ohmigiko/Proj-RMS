import OrdersData from "components/OrdersData";
import Header from "components/templates/headers/Header";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React from "react";

const OrderList = () => {
  const router = useRouter();
  const { table_id, q_id } = router.query;

  const {
    isLoading: tableDataLoading,
    serverError: tableDataError,
    apiData: tableData,
  } = useFetch("GET", `/table/${table_id}`, {}, true);

  const {
    isLoading: ordersDataLoading,
    serverError: ordersDataError,
    apiData: ordersData,
  } = useFetch("GET", `/order/by_queue/${q_id}`, {}, true);

  return (
    <div className="h-full">
      {tableDataLoading || ordersDataLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : (
        tableData &&
        ordersData && (
          <div className="flex flex-col h-full">
            <header>
              <Header
                text={`โต๊ะ ${tableData.name}`}
                goBackClick={() => router.push("/dine-in/tables")}
              />
            </header>
            <OrdersData
              tableQueues={tableData.queue}
              ordersData={ordersData}
              ordersDataLoading={ordersDataLoading}
              table_id={table_id}
              q_id={q_id}
            />
          </div>
        )
      )}
    </div>
  );
};

export default OrderList;
