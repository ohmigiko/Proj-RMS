import React from "react";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { addQueueDetails } from "redux/actions/queueAction";
import QueueStamp from "./QueueStamp";

const Table = ({ handleTableClick, table_name, table_id, queues }) => {
  const { order_method } = useSelector((state) => state.current_queue);
  const handleQueueStampClick = (q) => {
    const updatedQueueDetails = {
      table_name,
      table_id,
      queue_id: q.id,
      queue_num: q.queue_num,
      queue_group: q.queue_group,
    };
    dispatch(addQueueDetails(updatedQueueDetails));
    router.push({
      pathname: "/dine-in/tables/[table_id]/order-list/[q_id]",
      query: { table_id, q_id: q.id },
    });
  };

  const dispatch = useDispatch();
  const router = useRouter();
  const isNotEmpty = queues.length > 0;
  const isFull = queues.length === 4;

  return (
    <div
      className={
        "rounded-2xl py-2 px-3 h-36 w-full shadow-around " +
        (isNotEmpty
          ? "text-red-600 border-2 border-red-600 "
          : "grid justify-items-center place-content-center ") +
        (isFull ? "bg-red-200 " : null) +
        (order_method === "dine-in" ? "z-0" : "z-10")
      }
      onClick={
        (order_method === "dine-in" && queues.length === 0) ||
        order_method === "wait-dine-in"
          ? handleTableClick
          : undefined
      }
    >
      <div className="text-2xl mb-0.5 text-center">โต๊ะ {table_name}</div>
      <div className="grid grid-cols-2 justify-items-center gap-y-2.5 ">
        {queues.map((q) => (
          <QueueStamp
            key={q.id}
            queue_group={q.queue_group}
            queue_num={q.queue_num}
            handleQueueStampClick={() => handleQueueStampClick(q)}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;
