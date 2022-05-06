import Card from "components/cards/Card";
import Header from "components/templates/headers/Header";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { formatDateTime } from "utils/formatDateTime";
import { useDispatch } from "react-redux";
import { addQueueDetails } from "redux/actions/queueAction";

const History = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    isLoading: isOrdersHistoryLoading,
    apiData: paymentHistory,
    serverError: ordersHistoryError,
  } = useFetch("GET", "/payment", {});
  console.log("paymenthistory", paymentHistory);

  console.log(paymentHistory);
  const cardClick = (order) => {
    dispatch(
      addQueueDetails({
        table_name: order.table_name,
        queue_id: order.queue_id,
        queue_num: order.queue_num,
        queue_group: order.queue_group,
      })
    );
    router.push(`/history/${order.id}`);
  };

  return (
    <div className="h-full">
      {isOrdersHistoryLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : paymentHistory ? (
        <div className="h-full flex flex-col">
          <header>
            <Header text={"ประวัติการชำระเงิน"} goBackClick={undefined} />
          </header>
          <main className="flex flex-col flex-initial px-8 h-full overflow-auto">
            {paymentHistory.length === 0 ? (
              <div className="grid items-center justify-center h-full text-2xl text-center">
                ไม่มีประวัติการสั่งซื้อ
              </div>
            ) : (
              <ul>
                {paymentHistory.map((order) => (
                  <li
                    className="mb-5"
                    key={order.id}
                    onClick={() => cardClick(order)}
                  >
                    <Card
                      handleClick={undefined}
                      cardContent={
                        <div>
                          <div className="flex space-x-4">
                            <div>
                              วันที่{" "}
                              {formatDateTime(order.date_create).formatted_date}
                            </div>
                            <div>
                              เวลา{" "}
                              {formatDateTime(order.date_create).formatted_time}
                            </div>
                          </div>
                          <div className="mt-1 flex justify-between">
                            <div>
                              <div>
                                คิวลูกค้า #{order.queue_group}
                                {order.queue_num}
                              </div>
                            </div>
                            <div className="text-red-500">
                              {order.order_method === "dine-in"
                                ? "ทานในร้าน"
                                : order.order_method === "take-out"
                                ? "รับเอง"
                                : order.order_method === "delivery"
                                ? "เดลิเวอรี่"
                                : order.order_method}
                            </div>
                          </div>
                        </div>
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default History;
