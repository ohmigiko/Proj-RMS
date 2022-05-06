import Button from "components/buttons/Button";
import axiosInstance from "helpers/axios";
import React from "react";
import { useForm } from "react-hook-form";

const ModalCreateCategory = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const cancelClick = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data)
    const body = data
    console.log('body',body)
    axiosInstance.post("/category", data).then(res => console.log('res',res));
    // setOpen(false);
  };

  return (
    <div>
      {open ? (
        <>
          <form
            className="absolute inset-x-0 top-10 z-60"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-wrap gap-6 justify-center items-center">
              <div className="w-content h-content shadow-around bg-white ">
                <div className="text-3xl p-5 border-b">สร้างประเภทเมนู</div>
                <div className="mt-12 flex justify-center items-center space-x-8 text-xl m-8">
                  <label htmlFor="name" className="font-light">
                    ชื่อประเภทเมนู:
                  </label>
                  <input
                    className=" py-2 px-3 "
                    id="name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <div className="text-red-500">* กรุณากรอกประเภทเมนู</div>
                  )}
                </div>
                <div className="flex justify-end items-center border border-top w-full mt-14 p-4 space-x-3">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                    onClick={cancelClick}
                  >
                    ยกเลิก
                  </button>
                  <button
                    type="submit"
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    ยืนยัน
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div
            className="opacity-25 fixed inset-0 z-50 bg-black"
            onClick={cancelClick}
          ></div>
        </>
      ) : null}
    </div>
  );
};

export default ModalCreateCategory;
