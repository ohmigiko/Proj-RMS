import React from "react";

const SquarePlate = ({ text, icon, handleClick, optClassName }) => {
  return (
    <div
      className={"text-center space-y-2 flex flex-col items-center justify-center text-xl font-light rounded-3xl py-2 px-3 h-36 w-36 shadow-around bg-white " + optClassName}
      onClick={handleClick}
    >
      <div>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default SquarePlate;
