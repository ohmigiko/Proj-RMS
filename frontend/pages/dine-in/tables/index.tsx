import React, { useEffect, useState } from "react";
import Table from "components/Table";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import { useDispatch } from "react-redux";
import { addQueueDetails, setOrderMethod } from "redux/actions/queueAction";
import { useRouter } from "next/dist/client/router";
import Header from "components/templates/headers/Header";

const Tables = () => {
  // const queueDetails = useSelector(state => state.current_queue)
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setOrderMethod({ order_method: "dine-in" }));
  }, [dispatch]);

  const handleTableClick = (table) => {
    console.log("table", table);
    dispatch(addQueueDetails({ table_name: table.name, table_id: table.id }));
    router.push(`/dine-in/tables/${table.id}/add-queue`);
  };

  const {
    isLoading,
    serverError,
    apiData: tablesData,
  } = useFetch("GET", "/table", {});

  console.log("tablesData", tablesData);
  return (
    <div className="h-full">
      {isLoading ? (
        <div className="h-full">
          <Loading />
        </div>
      ) : tablesData ? (
        <div className="h-full flex flex-col">
          <header>
            <Header text={"โปรดเลือกโต๊ะ"} goBackClick={undefined} />
          </header>
          <main className="flex flex-col flex-initial px-8 h-full overflow-auto">
            {tablesData.length === 0 ? (
              <div className="grid items-center justify-center h-full text-2xl text-center">
                ไม่มีโต๊ะ
              </div>
            ) : (
              <div className="grid grid-cols-2 justify-items-stretch gap-7 mt-4">
                {tablesData.map((table) => (
                  <Table
                    key={table.id}
                    table_name={table.name}
                    table_id={table.id}
                    queues={table.queue}
                    handleTableClick={() => handleTableClick(table)}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default Tables;
