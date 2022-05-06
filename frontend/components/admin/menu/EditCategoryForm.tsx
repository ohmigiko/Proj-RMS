import axiosInstance from "helpers/axios";
import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import Loading from "components/templates/Loading";

const EditCategoryForm = () => {
  const router = useRouter();

  const { category_id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const body = data;
    console.log("body", body);
    axiosInstance
      .patch(`/category/${category_id}`, data)
      .then(() => router.push("/admin/menu/category"));
  };

  const {
    isLoading,
    apiData: categoryData,
    serverError,
  } = useFetch("GET", `/category/${category_id}`, {});

  console.log("categoryData", categoryData);
  return (
    <div>
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : categoryData ? (
        <form
          className="text-xl grid gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="grid grid-cols-3">
              <div className="col-span-2 w-full flex items-center space-x-4">
                <label htmlFor="name">ประเภท :</label>
                <input
                  className="flex-auto px-3 py-2 font-light"
                  id="name"
                  defaultValue={categoryData.name}
                  {...register("name", { required: true })}
                />
              </div>
              <div></div>
            </div>
            {errors.name && (
              <div className="text-red-500">* กรุณากรอกประเภทเมนู</div>
            )}
          </div>
          <button
            className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
            type="submit"
          >
            แก้ไขประเภทเมนู
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default EditCategoryForm;
