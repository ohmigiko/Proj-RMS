import axiosInstance from "helpers/axios";
import { Router, useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";

const CreateUserForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    axiosInstance.post("/user", data).then(() => router.push("/admin/user"));

  return (
    <form className="text-xl grid gap-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-x-4">
          <div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="id">รหัสพนักงาน : </label>
              <input
                className="mt-1 flex-auto px-3 py-2 font-light"
                id="id"
                {...register("id", { required: true })}
              />
            </div>
            {errors.id && (
              <div className="mt-2 text-red-500">* กรุณากรอกรหัสพนักงาน</div>
            )}
          </div>
          <div>
            <div className="flex flex-col space-y-3">
              <label htmlFor="name">ชื่อ : </label>
              <input
                className="mt-1 flex-auto px-3 py-2 font-light"
                id="name"
                {...register("name", { required: true })}
              />
            </div>
            {errors.name && (
              <div className="ml-4 mt-2 text-red-500">* กรุณากรอกชื่อพนักงาน</div>
            )}
          </div>
        </div>
      <div className="grid grid-cols-2">
        <div className="w-full flex items-center space-x-4">
          <label htmlFor="role">ตำแหน่ง : </label>
          <select
            className="flex-auto border border-2 border-gray-300 rounded-lg  px-3 py-2 font-light"
            id="role"
            {...register("role")}
          >
            <option value="chef">พ่อครัว</option>
            <option value="waiter">พนักงาน</option>
            <option value="admin">แอดมิน</option>
          </select>
        </div>
        <div></div>
      </div>
      <button
        className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
        type="submit"
      >
        สร้างผู้ใช้งาน
      </button>
    </form>
  );
};

export default CreateUserForm;
