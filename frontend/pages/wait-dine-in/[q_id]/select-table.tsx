import React, { useEffect, useState } from "react";
import Table from "components/Table";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import { useDispatch, useSelector } from "react-redux";
import { addQueueDetails, setOrderMethod } from "redux/actions/queueAction";
import ConfirmTableModal from "components/modals/ConfirmTableModal";
import Header from "components/templates/headers/Header";
import { useRouter } from "next/dist/client/router";
import axiosInstance from "helpers/axios";
const Tables = () => {
  // const queueDetails = useSelector(state => state.current_queue)
  const [openModal, setOpenModal] = useState(false);
  const [tableSelected, setTableSelected] = useState({});
  const dispatch = useDispatch();
  const router = useRouter();

  const { queue_id, queue_num, queue_group } = useSelector(
    (state) => state.current_queue
  );

  const confirmModalClick = () => {
    dispatch(
      addQueueDetails({
        order_method: "dine-in",
        table_name: tableSelected.name,
        table_id: tableSelected.id,
      })
    );
    axiosInstance
      .patch(`/queue/assign-table/${queue_id}`, { table_id: tableSelected.id })
      .then((res) => console.log(res.data));
    router.push(`/dine-in/tables/${tableSelected.id}/order-list/${queue_id}`);
  };

  const cancelModalClick = () => {
    setOpenModal(false);
  };

  const handleTableClick = (table) => {
    setOpenModal(true);
    setTableSelected(table);
    console.log(table);
  };

  const {
    isLoading,
    serverError,
    apiData: tablesData,
  } = useFetch("GET", "/table", {});

  const goBackClick = () => router.push(`/wait-dine-in/${queue_id}/order-list`);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : tablesData ? (
        <div className="mb-16">
          <header>
            <Header text={"โปรดเลือกโต๊ะ"} goBackClick={goBackClick} />
          </header>
          <main className="grid grid-cols-2 justify-items-stretch mt-6 mx-8 gap-7 ">
            {tablesData.map((table) => (
              <div key={table.id}>
                <Table
                  handleTableClick={() => handleTableClick(table)}
                  table_name={table.name}
                  table_id={table.id}
                  queues={table.queue}
                />
              </div>
            ))}
          </main>
          <ConfirmTableModal
            queue_group={queue_group}
            queue_num={queue_num}
            table_name={tableSelected.name}
            confirmClick={confirmModalClick}
            cancelClick={cancelModalClick}
            open={openModal}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Tables;
