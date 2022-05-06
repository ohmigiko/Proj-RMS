import Loading from "components/templates/Loading";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQueueDetails, setOrderMethod } from "redux/actions/queueAction";
import MenuTabs from "components/tabs/MenuTabs";
import Header from "components/templates/headers/Header";
import Card from "components/cards/Card";
import CircleButton from "components/buttons/CircleButton";
import { IoAddSharp } from "react-icons/io5";
import { useRouter } from "next/dist/client/router";
import useFetch from "hooks/useFetch";
import { deliveryAppsObj, grab, foodpanda, lineman } from "utils/deliveryApps";
import Image from "next/dist/client/image";

const TakeHome = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);

  const takeHomeOrderTypes = [
    { name: "รับเอง", value: "pick-up" },
    { name: "ไรเดอร์", value: "delivery" },
  ];

  useEffect(() => {
    dispatch(
      setOrderMethod({ order_method: takeHomeOrderTypes[activeTab].value })
    );
  }, [dispatch, activeTab]);

  const addQueueClick = () => router.push("/take-home/add-queue");

  const queueCardClick = (q) => {
    dispatch(
      addQueueDetails({
        queue_id: q.id,
        queue_num: q.queue_num,
        queue_group: q.queue_group,
      })
    );
    router.push(`/take-home/order-list/${q.id}`);
  };

  const {
    isLoading: pickupLoading,
    serverError: pickupError,
    apiData: pickupQueues,
  } = useFetch("GET", "/queue/take-out", {});

  const {
    isLoading: deliveryLoading,
    serverError: deliveryError,
    apiData: deliveryQueues,
  } = useFetch("GET", "/queue/delivery", {});

  console.log("delivery", deliveryQueues);
  console.log("pickup", pickupQueues);

  return (
    <div className="h-full">
      {pickupLoading || deliveryLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : pickupQueues && deliveryQueues ? (
        <div className="flex flex-col h-full">
          <header>
            <Header text={"สั่งกลับบ้าน"} goBackClick={undefined} />
          </header>
          <main className="flex flex-col flex-auto px-8">
            <MenuTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              menu={takeHomeOrderTypes}
            />
            <div className="h-full">
              <ul
                className={
                  activeTab === 0 ? "block flex flex-col h-full" : "hidden"
                }
              >
                {pickupQueues.length === 0 ? (
                  <div className="flex flex-col flex-auto items-center justify-center text-center text-2xl">
                    ยังไม่มีคิว
                  </div>
                ) : (
                  pickupQueues.map((q) => (
                    <li className="mb-5" key={q.id}>
                      <Card
                        handleClick={() => queueCardClick(q)}
                        cardContent={
                          <div>
                            <div className="text-lg">
                              คิวที่ #{q.queue_group}
                              {q.queue_num}
                            </div>
                            <div className="text-md text-gray-600">
                              Tel. {q.phone}
                            </div>
                          </div>
                        }
                      ></Card>
                    </li>
                  ))
                )}
              </ul>
              <ul className={activeTab === 1 ? "block flex flex-col h-full" : "hidden"}>
                {deliveryQueues.length === 0 ? (
                  <div className="flex flex-col flex-auto items-center justify-center text-center text-2xl">
                    ยังไม่มีคิว
                  </div>
                ) : (
                  deliveryQueues.map((q) => (
                    <li className="mb-5" key={q.id}>
                      <Card
                        handleClick={() => queueCardClick(q)}
                        cardContent={
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between text-lg">
                              <div>
                                คิวที่ #{q.queue_group}
                                {q.queue_num}
                              </div>
                              <div className="flex items-center text-red-500">
                                {q.delivery_by === "Grab" ||
                                q.delivery_by === "Foodpanda" ||
                                q.delivery_by === "Lineman" ? (
                                  <div className="border rounded-lg h-9 w-9 overflow-hidden">
                                    <Image
                                      src={
                                        q.delivery_by === "Grab"
                                          ? grab.logo
                                          : q.delivery_by === "Foodpanda"
                                          ? foodpanda.logo
                                          : lineman.logo
                                      }
                                      height="36"
                                      width="36"
                                    />
                                  </div>
                                ) : (
                                  <>{q.delivery_by}</>
                                )}
                              </div>
                            </div>
                            <div className="flex justify-end text-md">
                              <div className="text-gray-600">
                                เลขรายการ : {q.delivery_num}
                              </div>
                            </div>
                          </div>
                        }
                      ></Card>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </main>
          <div className="fixed bottom-20 right-9">
            <CircleButton
              optClassName={"bg-red-500"}
              handleClick={addQueueClick}
              icon={<IoAddSharp size={"32"} color={"white"} />}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TakeHome;
