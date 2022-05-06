import React from "react";
import SquarePlate from "../cards/SquarePlate";

const Modal = ({ open, setOpen, options }) => {
  return (
    <>
      {open ? (
        <>
          <div className="absolute flex justify-center items-center inset-0">
            <ul className="flex flex-wrap gap-6 justify-center items-center">
              {options.map((opt, index) => (
                <li key={index} className="z-60">
                  <SquarePlate
                    text={opt.text}
                    icon={
                      opt.text === "เงินสด" ? (
                        <opt.icon color={"red"} size={"30"} />
                      ) : undefined
                    }
                    handleClick={opt.handleClick}
                    optClassName={undefined}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="opacity-25 fixed inset-0 z-50 bg-black"
            onClick={() => setOpen(false)}
          ></div>
        </>
      ) : null}
    </>
  );
};

export default Modal;
