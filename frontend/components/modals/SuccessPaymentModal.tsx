import Button from "components/buttons/Button";
import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SuccessPaymentModal = ({ open, handleClick }) => (
  <div>
    {open ? (
      <>
        <div className="absolute flex justify-center items-center inset-0 z-60">
          <div className="flex flex-wrap gap-6 justify-center items-center px-8">
            <div className="w-80 h-80 text-center grid gap-y-4 justify-center text-3xl font-light rounded-3xl p-6 shadow-around bg-white ">
              <div className="mt-6">ชำระเงินเรียบร้อย</div>
              <div className="flex justify-center ">
                <IoMdCheckmarkCircleOutline color={'red'} size={'72'}/>
              </div>
              <div className="w-full">
                <div className="w-full">
                  <Button
                    text={"กลับสู่หน้าหลัก"}
                    icon={undefined}
                    handleClick={handleClick}
                    optClassName={"text-white bg-red-500"}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-50 bg-black"></div>
      </>
    ) : null}
  </div>
);

export default SuccessPaymentModal;
