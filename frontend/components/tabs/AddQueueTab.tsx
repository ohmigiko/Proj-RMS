import React from "react";
import { useRouter } from "next/dist/client/router";
import { IoAddCircleOutline } from "react-icons/io5";

const AddQueueTab = () => {
  const router = useRouter()
  const {table_id} = router.query
  return (
    <a
      className={
        "text-lg relative flex items-center justify-center text-center rounded-t-lg shadow-right text-gray-600 bg-gray-200 w-20 h-10 z-0 py-2 -ml-2"
      }
      onClick={(e) => {
        router.push(`/dine-in/tables/${table_id}/add-queue`)
      }}
      data-toggle="tab"
      role="tablist"
    >
      <IoAddCircleOutline size={'28'}/>
    </a>
  );
};

export default AddQueueTab;
