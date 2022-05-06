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
import BottomNavbar from "components/templates/navbars/BottomNavbar";

const TakeHome = () => {
  // const queueDetails = useSelector(state => state.current_queue)
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    isLoading,
    apiData: queuesData,
    serverError,
  } = useFetch("GET", "/queue/wait-dine-in", { queue_group: "A" });

  useEffect(() => {
    dispatch(setOrderMethod({ order_method: "wait-dine-in" }));
  }, [dispatch]);

  const addQueueClick = () =>
    router.push("/wait-dine-in/add-queue/select-customers-number");

  const queueCardClick = (q) => {
    dispatch(
      addQueueDetails({
        queue_id: q.id,
        queue_num: q.queue_num,
        queue_group: q.queue_group,
      })
    );
    router.push(`/wait-dine-in/${q.id}/order-list`);
  };

  console.log("queuesData", queuesData);
  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : queuesData ? (
        <div className="flex flex-col h-full">
          <header>
            <Header text={"คิวรอโต๊ะ"} goBackClick={undefined} />
          </header>
          <main className="flex flex-col flex-initial px-8 h-full overflow-auto">
            {queuesData.length === 0 ? (
              <div className="grid items-center justify-center h-full text-2xl text-center">
                <div>ยังไม่มีคิว</div>
              </div>
            ) : (
              <ul>
                {queuesData.map((q) => (
                  <li className="mb-5" key={q.id}>
                    <Card
                      handleClick={() => queueCardClick(q)}
                      cardContent={
                        <div className="grid grid-cols-3 items-center h-full">
                          <div className="text-lg">
                            คิวที่ #{q.queue_group}
                            {q.queue_num}
                          </div>
                          <div className="text-center text-md text-gray-500 ml-2">
                            {q.num_of_customer === 4
                              ? `${q.num_of_customer} คน +`
                              : `${q.num_of_customer} คน`}
                          </div>
                          <div
                            className={
                              q.is_ordered ? "text-red-500 text-md" : "hidden"
                            }
                          >
                            สั่งอาหารแล้ว
                          </div>
                        </div>
                      }
                    />
                  </li>
                ))}
              </ul>
            )}
            <div className="fixed bottom-20 right-9">
              <CircleButton
                optClassName={"bg-red-500"}
                handleClick={addQueueClick}
                icon={<IoAddSharp size={"32"} color={"white"} />}
              />
            </div>
          </main>
        </div>
      ) : (
        <div>{serverError}</div>
      )}
    </div>
  );
};

export default TakeHome;
