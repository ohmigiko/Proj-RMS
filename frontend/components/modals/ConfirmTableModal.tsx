import Button from "components/buttons/Button";
import SquarePlate from "components/cards/SquarePlate";
import React from "react";

const ConfirmTableModal = ({queue_group, queue_num, table_name, open, confirmClick, cancelClick }) => (
  <div>
    {open ? (
      <>
        <div className="absolute flex justify-center items-center inset-0 z-60">
          <div className="flex flex-wrap gap-6 justify-center items-center px-8">
            <div className="w-80 h-80 text-center text-3xl font-light rounded-3xl p-6 shadow-around bg-white ">
              <div className="mt-12">ลูกค้า คิวที่ #{queue_group}{queue_num}</div>
              <div className="mt-4">ลงโต๊ะ {table_name}</div>
              <div className="flex justify-evenly w-full mt-14 space-x-4">
                <div className="w-full"><Button text={"ยกเลิก"} icon={undefined} handleClick={cancelClick} optClassName={"text-gray-500"}></Button></div>
                <div className="w-full"><Button text={"ยืนยัน"} icon={undefined} handleClick={confirmClick} optClassName={"text-white bg-red-500"}></Button></div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="opacity-25 fixed inset-0 z-50 bg-black"
          onClick={cancelClick}
        ></div>
      </>
    ) : null}
  </div>
);

export default ConfirmTableModal;
