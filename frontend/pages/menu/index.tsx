import Button from "components/buttons/Button";
import OrderList from "components/OrderList";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import React, { useState } from "react";
import FoodMenu from "../../components/menu/FoodMenu";
import FoodMenuTabs from "../../components/tabs/MenuTabs";
import BandHeader from "../../components/templates/headers/BandHeader";
import { useRouter } from "next/dist/client/router";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "redux/actions/orderAction";
import { GiConsoleController } from "react-icons/gi";

const Menu = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { order_list } = useSelector((state) => state.order);
  const current_queue = useSelector((state) => state.current_queue);
  
  const dispatch = useDispatch();
  const {
    isLoading,
    apiData: menuData,
    serverError,
  } = useFetch("GET", "/category", {});

  console.log('menuData',menuData)
  const orderFoodClick = () => {
    router.push("/confirm-order");
  };

  const goBackClick = () => {
    if (current_queue.order_method === "dine-in") {
      router.push(
        `/dine-in/tables/${current_queue.table_id}/order-list/${current_queue.queue_id}`
      );
    } else if (current_queue.order_method === "wait-dine-in") {
      router.push(`/wait-dine-in/${current_queue.queue_id}/order-list`);
    } else if (
      current_queue.order_method === "pick-up" ||
      current_queue.order_method === "rider"
    ) {
      router.push(`/take-home/order-list/${current_queue.queue_id}`);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : menuData ? (
        <div>
          <header>
            <BandHeader
              text={"สั่งอาหาร"}
              goBackClick={goBackClick}
            />
          </header>
          <main className="z-0">
            <div className="mt-8 mx-8">
              <FoodMenuTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                menu={menuData}
              />
            </div>
            <ul>
              {menuData.map((menu, index) => (
                <li
                  key={index}
                  className={activeTab === index ? "block" : "hidden"}
                >
                  <FoodMenu menus={menu.menu} />
                </li>
              ))}
            </ul>
          </main>
          <footer
            className={
              order_list.length === 0
                ? "hidden"
                : "block fixed bottom-0 z-50 bg-white border-t-2 border-red-500 mt-6 shadow-top w-full p-6"
            }
          >
            <Button
              text={
                <div>
                  <span className="mr-3">สั่งอาหาร ทั้งหมด</span>
                  <span className="mr-3">
                    {order_list.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                  <span>รายการ</span>
                </div>
              }
              icon={undefined}
              handleClick={orderFoodClick}
              optClassName="bg-red-500 text-white"
            />
          </footer>
        </div>
      ) : null}
    </div>
  );
};

export default Menu;
