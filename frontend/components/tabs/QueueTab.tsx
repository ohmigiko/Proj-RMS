import { useRouter } from "next/dist/client/router";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addQueueDetails } from "redux/actions/queueAction";

const QueueTab = ({ activeTab, q_id, q_group, q_num, editClick, tabClick, zIdx }) => {
  return (
    <a
      className={
        "text-lg relative flex justify-center items-center text-center rounded-t-lg shadow-right -ml-1 " +
        (activeTab === q_id
          ? `text-white bg-red-500 h-12 w-40 px-2 py-3 z-50` 
          : `text-gray-600 bg-gray-200 w-20 h-10 py-2 ${zIdx}`)
      }
      onClick={tabClick}
      data-toggle="tab"
      role="tablist"
    >
      {activeTab === q_id ? (
        <>
          <div>
            คิวลูกค้า #{q_group}
            {q_num}
          </div>
          <div className="ml-2" onClick={editClick}>
            <FiEdit />
          </div>
        </>
      ) : (
        <>
          #{q_group}
          {q_num}
        </>
      )}
    </a>
  );
};

export default QueueTab;
