import React from "react";
import { useRouter } from "next/dist/client/router";
import EditUserForm from "components/admin/user/EditUserForm";

const EditUser = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl">แก้ไขข้อมูลผู้ใช้งาน</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="p-4 mt-5 bg-white">
        <EditUserForm />
      </div>
    </div>
  );
};

export default EditUser;
