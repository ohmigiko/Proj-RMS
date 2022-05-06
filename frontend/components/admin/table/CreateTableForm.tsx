import axiosInstance from "helpers/axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/dist/client/router";

const CreateTableForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) =>
    axiosInstance.post("/table", data).then(() => router.push("/admin/table"));

  console.log(watch("example")); // watch input value by passing the name of it

  return (
    <form className="text-xl grid gap-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div className="grid grid-cols-3">
          <div className="col-span-2 w-full flex items-center space-x-4">
            <label htmlFor="name">ชื่อโต๊ะ : </label>
            <input
              className="flex-auto px-3 py-2 font-light"
              id="name"
              {...register("name", { required: true })}
            />
          </div>
          <div></div>
        </div>
        {errors.name && (
          <div className="mt-2 text-red-500">* กรุณากรอกชื่อโต๊ะ</div>
        )}
      </div>
      <button
        className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
        type="submit"
      >
        สร้างโต๊ะ
      </button>
    </form>
  );
};

export default CreateTableForm;
