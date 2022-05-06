import OrderList from "components/OrderList";
import React, { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import BandHeader from "../../components/templates/headers/BandHeader";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { resetOrderList } from "redux/actions/orderAction";
import axiosInstance from "helpers/axios";

const Order = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isUrgent, setIsUrgent] = useState(false);
  const [isTakeHome, setIsTakeHome] = useState(false);
  

  const { order_list } = useSelector((state) => state.order);
  const { table_id, order_method, queue_id } = useSelector(
    (state) => state.current_queue
  );

  useEffect(() => {
    if (order_method !== "dine-in" && order_method !== "wait-dine-in")
      setIsTakeHome(true);
  }, [order_method]);

  const confirmOrderClick = () => {
    let temp = order_list;
    temp.map((item: { price: any; menu_name: any }) => {
      delete item.price;
      delete item.menu_name;
      return item;
    });
    const body = {
      queue_id,
      order_list: temp,
      urgent: isUrgent,
      take_home: isTakeHome,
    };
    axiosInstance
      .post("/order", body)
      .then((res) => {
        dispatch(resetOrderList());
        if (order_method === "dine-in") {
          router.push(`/dine-in/tables/${table_id}/order-list/${queue_id}`);
        } else if (order_method === "wait-dine-in") {
          router.push(`/wait-dine-in/${queue_id}/order-list`);
        } else if (order_method === "pick-up" || order_method === "delivery") {
          router.push(`/take-home/order-list/${queue_id}`);
        }
      })
      .catch((err) => console.log(err));
  };

  

  return (
    <div className="flex flex-col h-screen">
      <header className="flex flex-col flex-initial">
        <BandHeader
          text={"สรุปรายการอาหาร"}
          goBackClick={() => router.push("/menu")}
        />
      </header>
      <main className="p-6 flex flex-col flex-auto p-6 overflow-auto">
        <ul>
          {order_list.map((order: any, index: React.Key | null | undefined) => (
            <li key={index}>
              <OrderList
                idx={index}
                category_id={order.category_id}
                menu_id={order.menu_id}
                menu_name={order.menu_name}
                topping={order.topping}
                quantity={order.quantity}
                price={order.price}
                
              />
              <hr />
            </li>
          ))}
        </ul>
        <div className="py-6">
          <input
            type="checkbox"
            name="is-urgent"
            id="is-urgent"
            checked={isUrgent}
            onChange={() => setIsUrgent(!isUrgent)}
          />
          <label htmlFor="is-urgent" className="ml-2 text-xl">
            คิวด่วน
          </label>
        </div>
        <hr />
        <div className="py-6">
          <input
            type="checkbox"
            name="is-takehome"
            id="is-takehome"
            checked={isTakeHome}
            onChange={() => setIsTakeHome(!isTakeHome)}
            disabled={
              order_method !== "dine-in" && order_method !== "wait-dine-in"
            }
          />
          <label htmlFor="is-takehome" className="ml-2 text-xl">
            กลับบ้าน
          </label>
        </div>
        <hr />
      </main>
      <footer className="p-6 shadow-top">
        <Button
          text={"ส่งรายการอาหาร"}
          icon={undefined}
          handleClick={confirmOrderClick}
          optClassName="bg-red-500 text-white text-xl"
        />
      </footer>
    </div>
  );
};

export default Order;
