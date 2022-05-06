import React, { useState } from "react";

const Button = ({
  text,
  icon = undefined,
  handleClick,
  isDisable = false,
  optClassName = "",
}) => {
  const [disable, setDisable] = useState(false);
  return (
    <button
      className={
        "flex justify-center border rounded-lg py-4 w-full text-lg shadow-lg " +
        optClassName +
        (icon ? "space-x-2 " : " ") +
        (disable ? " opacity-70 " : " ") + 
        (text==="ลงโต๊ะ" ? "items-baseline " : "items-center ")
      }
      onClick={() => {
        handleClick();
        setDisable(true);
      }}
      disabled={isDisable}
    >
      {icon && <div>{icon}</div>}
      <div>{text}</div>
    </button>
  );
};

export default Button;
