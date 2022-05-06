import React from "react";
import { useRouter } from "next/dist/client/router";
import { IoIosArrowRoundBack } from "react-icons/io";
import KebabMenu from "components/buttons/KebabMenu";

const Header = ({ text, goBackClick }) => {
  return (
    <div className="grid grid-cols-4 items-center px-3 py-7">
      <div>{(goBackClick !== null && goBackClick !== undefined) && (
        <IoIosArrowRoundBack size={32} onClick={goBackClick} />
      )}</div>
      <div className="text-center text-2xl col-span-2">{text}</div>
      <div className="flex justify-end items-baseline"><KebabMenu /></div>
    </div>
  );
};

export default Header;
