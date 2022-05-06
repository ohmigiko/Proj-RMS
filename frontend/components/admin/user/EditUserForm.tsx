import axiosInstance from "helpers/axios";
import React from "react";
import { useForm } from "react-hook-form";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import Loading from "components/templates/Loading";

const EdituserForm = () => {
  const router = useRouter();

  const { user_id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const body = data;
    console.log("body", body);
    axiosInstance
      .patch(`/user/${user_id}`, body)
      .then(() => router.push("/admin/user"));
      // .then((res)=>console.log('data after post',res.data))
  };

  const {
    isLoading,
    apiData: userData,
    serverError,
  } = useFetch("GET", `/user/${user_id}`, {});

  console.log("userData", userData);
  return (
    <div>
      {isLoading ? (
        <div>
          <Loading></Loading>
        </div>
      ) : userData ? (
        <form
          className="text-xl grid gap-y-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <div className="flex flex-col">
                <label htmlFor="id">รหัสพนักงาน : </label>
                <input
                  id="id"
                  className="mt-1 flex-auto px-3 py-2 font-light"
                  defaultValue={userData.id}
                  {...register("id", { required: true })}
                />
              </div>
              {errors.id && (
                <div className="mt-2 text-red-500">* กรุณากรอกรหัสพนักงาน</div>
              )}
            </div>
            <div>
              <div className="ml-4 flex flex-col">
                <label htmlFor="name">ชื่อ : </label>
                <input
                  id="name"
                  className="mt-1 flex-auto px-3 py-2 font-light"
                  defaultValue={userData.name}
                  {...register("name", { required: true })}
                />
              </div>
              {errors.name && (
                <div className="text-red-500">* กรุณากรอกชื่อ</div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="w-full flex items-center space-x-4">
              <label htmlFor="role">ตำแหน่ง : </label>
              <select
                id="role"
                className="flex-auto border border-2 border-gray-300 rounded-lg  px-3 py-2 font-light"
                defaultValue={userData.role}
                {...register("role")}
              >
                <option value="chef">พ่อครัว</option>
                <option value="waiter">พนักงาน</option>
                <option value="admin">แอดมิน</option>
              </select>
            </div>
          </div>
          <button
            className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
            type="submit"
          >
            แก้ไขข้อมูลผู้ใช้งาน
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default EdituserForm;
