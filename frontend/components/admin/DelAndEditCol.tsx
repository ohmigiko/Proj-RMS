import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { ImBin } from "react-icons/im";

const DelAndEditCol = ({ editClick, deleteClick , isDeleted=false}) => {
  return (
    <td className="flex space-x-6 px-6 py-4 text-right justify-end">
      <div
        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        onClick={editClick}
      >
        <div className="flex items-center">
          <AiFillEdit />
          <span className="ml-2">แก้ไข</span>
        </div>
      </div>
      <div
        className="font-medium text-red-600 dark:text-blue-500 hover:underline"
        onClick={deleteClick}
      >
        <div className="flex items-center">
          <ImBin />
          <span className="ml-2">{isDeleted ? "ยกเลิกการลบ" : "ลบ"}</span>
        </div>
      </div>
    </td>
  );
};

export default DelAndEditCol;
