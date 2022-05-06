import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import navBarTitles from "../../../utils/navbarTitles";
import { HiUserCircle } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";

const NavBar = () => {
  const router = useRouter();
  const path = router.asPath;
  const titleIdx = navBarTitles.findIndex(
    (item) => path.includes(item.url) === true
  );

  const isQueueStatusPage = router.asPath.includes("/queue-status");
  const isKitchenPage = router.asPath.includes("/kitchen");

  const goBack = () => {
    router.back();
  };
  
  return (
    <>
      <div className="items-center text-white grid grid-cols-3 bg-gray-600 py-4">
        <div className="pl-5 flex items-center">
          {(!isQueueStatusPage && !isKitchenPage) && (
            <IoIosArrowRoundBack color={"white"} size={32} onClick={goBack} />
          )}
        </div>
        <div className="flex justify-center text-xl">{navBarTitles[titleIdx].label}</div>
        <div className="flex justify-end items-center pr-5">
          <HiUserCircle size={32} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
