import React from "react";
import { useRouter } from "next/dist/client/router";
import CreateUserForm from "components/admin/user/CreateUserForm";

const create = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl">สร้างผู้ใช้งาน</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="px-4 py-6 mt-5 bg-white">
        <CreateUserForm />
      </div>
    </div>
  );
};

export default create;
