import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import axiosInstance from "helpers/axios";
import { GoKebabVertical } from "react-icons/go";
import { GrLogout, GrPowerReset } from "react-icons/gr";

const KebabButton = () => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);

  const resetQueueClick = () => {
    axiosInstance.patch("/queue/reset-queue");
    setShowDropDown(false);
  };

  const logoutClick = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <div>
      <GoKebabVertical
        onClick={() => setShowDropDown(!showDropDown)}
        size={"20"}
      />
      {showDropDown && (
        <div className="border border-2 absolute right-0 mt-2 py-2 w-48 bg-white rounded-mdshadow-xl z-20 ">
          <div
            onClick={resetQueueClick}
            className="flex items-center space-x-1.5 pl-3.5 pr-4 py-2 text-sm capitalize text-gray-700 hover:bg-red-500 hover:text-white"
          >
            <div><GrPowerReset size={"18"}/></div>
            <div>รีเซ็ทคิว</div>
          </div>
          <div
            onClick={logoutClick}
            className="flex items-center space-x-1.5 px-4 py-2 text-sm capitalize text-gray-700 hover:bg-red-500 hover:text-white"
          >
            <div>
              <GrLogout size={"18"}/>
            </div>
            <div>ออกจากระบบ</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KebabButton;
