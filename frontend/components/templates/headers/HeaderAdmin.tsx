import React from "react";
import { useRouter } from "next/dist/client/router";

const HeaderAdmin = ({ text, isShowDeleted = true }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center">
      <div className="text-3xl">{text}</div>
      <div className="text-xl flex space-x-4 items-center">
        {/* {isShowDeleted && (
          <button className="border p-2.5 rounded-lg bg-gray-400 text-white">
            แสดง{text}ที่ถูกลบ
          </button>
        )} */}
        <button
          className="border p-2.5 rounded-lg bg-red-600 text-white"
          onClick={() => router.push(`${router.asPath}` + "/create")}
        >
          สร้าง{text}ใหม่
        </button>
      </div>
    </div>
  );
};

export default HeaderAdmin;
