import React from "react";

const Loading = () => {
  return (
    <div className="h-full grid justify-items-center">
      <div className="flex flex-col justify-center items-center">
        <div
          className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12"
        ></div>
        <h2 className="mt-1 text-xl font-semibold">กำลังโหลด...</h2>
        <p>กรุณารอสักครู่</p>
      </div>
    </div>
  );
};

export default Loading;
