import Loading from "components/templates/Loading";
import axiosInstance from "helpers/axios";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useForm } from "react-hook-form";

const EditTableForm = () => {
  const router = useRouter();

  const { table_id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    axiosInstance
      .patch(`/table/${table_id}`, data)
      .then(() => router.push("/admin/table"));
  };

  const {
    isLoading,
    apiData: tableData,
    serverError,
  } = useFetch("GET", `/table/${table_id}`, {});

  console.log("tableData", tableData);
  return (
    <div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : tableData ? (
        <form
          className="text-xl grid gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="grid grid-cols-2">
              <div className="w-full flex items-center space-x-4">
                <label htmlFor="name">ชื่อโต๊ะ : </label>
                <input
                  className="flex-auto px-3 py-2 font-light"
                  id="name"
                  defaultValue={tableData.name}
                  {...register("name", { required: true })}
                />
              </div>
              <div></div>
            </div>
            {errors.name && (
              <div className="text-red-500">* กรุณากรอกชื่อโต๊ะ</div>
            )}
          </div>
          <button
            className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
            type="submit"
          >
            แก้ไขโต๊ะ
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default EditTableForm;
