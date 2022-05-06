import React from "react";
import { useRouter } from "next/dist/client/router";
import EditTableForm from "components/admin/table/EditTableForm";

const EditTable = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl">แก้ไขโต๊ะ</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="px-4 py-6 mt-5 bg-white">
        <EditTableForm />
      </div>
    </div>
  );
};

export default EditTable;
