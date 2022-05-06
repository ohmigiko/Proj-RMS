import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import Header from "components/templates/headers/Header";
import SquarePlate from "components/cards/SquarePlate";
import { addQueueDetails, setOrderMethod } from "redux/actions/queueAction";
import Button from "components/buttons/Button";
import { GiMeal } from "react-icons/gi";
import axiosInstance from "helpers/axios";
import { deliveryAppsLogo } from "utils/deliveryApps";
import Image from "next/image";
import { BiFoodMenu, BiMenu } from "react-icons/bi";

const AddQueue = () => {
  const { order_method } = useSelector((state) => state.current_queue);
  const [activePlate, setActivePlate] = useState(order_method);
  const [telNum, setTelNum] = useState("");
  const [deliveryApp, setDeliveryApp] = useState("Grab");
  const [orderNumber, setOrderNumber] = useState("");
  const [otherAppSelected, setOtherAppSelected] = useState(false);
  const [showDeliverySelector, setShowDeliverSelector] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const goBackClick = () => router.push("/take-home");

  const selectOrderTypeClick = (type: string) => {
    dispatch(setOrderMethod({ order_method: type }));
    setActivePlate(type);
    if (type == "pick-up") {
      setOrderNumber("");
      setDeliveryApp("Grab");
      setOtherAppSelected(false);
      setShowDeliverSelector(false);
    }
    if (order_method == "delivery") {
      setTelNum("");
    }
  };

  const addQueueClick = () => {
    if (order_method === "pick-up") {
      const body = {
        queue_group: "A",
        phone: telNum,
      };
      axiosInstance.post("/queue/take-out", body).then((res) => {
        dispatch(
          addQueueDetails({
            queue_id: res.data.id,
            queue_num: res.data.queue_num,
            queue_group: res.data.queue_group,
          })
        );
      });
    }
    if (order_method === "delivery") {
      const body = {
        queue_group: "A",
        delivery_by: deliveryApp,
        delivery_num: orderNumber,
      };
      axiosInstance.post("/queue/delivery", body).then((res) => {
        dispatch(
          addQueueDetails({
            queue_id: res.data.id,
            queue_num: res.data.queue_num,
            queue_group: res.data.queue_group,
          })
        );
      });
    }

    router.push("/menu");
  };

  return (
    <div className="relative flex flex-col h-screen ">
      <header>
        <Header text={"สั่งกลับบ้าน"} goBackClick={goBackClick} />
      </header>
      <main className="flex-grow">
        <div className="px-9">
          <div className="mt-16 flex justify-between">
            <SquarePlate
              text={"รับเอง"}
              icon={undefined}
              handleClick={() => selectOrderTypeClick("pick-up")}
              optClassName={
                activePlate === "pick-up"
                  ? "border-4 border-red-500 text-red-500"
                  : "text-gray-400"
              }
            />
            <SquarePlate
              text={"ไรเดอร์"}
              icon={undefined}
              handleClick={() => selectOrderTypeClick("delivery")}
              optClassName={
                activePlate === "delivery"
                  ? "border-4 border-red-500 text-red-500"
                  : "text-gray-400"
              }
            />
          </div>
          <div className="pt-12">
            {activePlate === "pick-up" && (
              <div>
                <div className="text-lg font-light">เบอร์ติดต่อ</div>
                <input
                  className="mt-4 border w-full h-12 px-4 py-2 rounded-md"
                  type="tel"
                  id="phone"
                  name="phone"
                  value={telNum}
                  onChange={(e) => setTelNum(e.target.value)}
                />
              </div>
            )}
            {activePlate === "delivery" && (
              <div className="text-lg font-light">
                <div>
                  <div>บริการของ</div>
                  <div className="mt-4 flex space-x-4">
                    {deliveryAppsLogo.map((app) => (
                      <>
                        <div
                          className={
                            "border-4 h-16 w-16 rounded-xl overflow-hidden " +
                            (deliveryApp === app.value && !otherAppSelected
                              ? "border-red-500"
                              : "")
                          }
                          onClick={() => {
                            setDeliveryApp(app.value);
                            setOtherAppSelected(false);
                          }}
                        >
                          <Image
                            src={app.logo}
                            alt={app.alt}
                            width="64"
                            height="64"
                          />
                        </div>
                      </>
                    ))}
                  </div>
                  <div className="flex items-end mt-4">
                    <label
                      htmlFor="delivery-app"
                      className={
                        "border-4 rounded-xl h-16 w-16 flex items-center text-center justify-center " +
                        (otherAppSelected
                          ? "border-red-500 text-red-500"
                          : "text-gray-300")
                      }
                      onClick={() => {
                        setDeliveryApp("");
                        setOtherAppSelected(true);
                      }}
                    >
                      อื่นๆ
                    </label>
                    <input
                      type="text"
                      name="delivery-app"
                      id="delivery-app"
                      className={
                        "ml-4 h-12 p-2.5 w-56 " +
                        `${otherAppSelected && "border-2 border-red-500"}`
                      }
                      value={otherAppSelected ? deliveryApp : ""}
                      placeholder="ระบุชื่อแอพ"
                      onChange={(e) => setDeliveryApp(e.target.value)}
                      onClick={() => {
                        if (!otherAppSelected) {
                          setDeliveryApp("");
                          setOtherAppSelected(true);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="mt-12">
                  <div>เลขรายการ</div>
                  <input
                    className="mt-4 border w-full h-12 px-2.5 py-2 rounded-md"
                    type="text"
                    id="order-number"
                    name="order-number"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="absolute w-full px-9 bottom-20 left-0">
            <Button
              text={"สั่งอาหาร"}
              icon={<BiFoodMenu size={"26"} color={"red"} />}
              handleClick={addQueueClick}
              optClassName="bg-white"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddQueue;
