import EditCategoryForm from "components/admin/menu/EditCategoryForm";
import { useRouter } from "next/dist/client/router";
import React from "react";

const EditCategory = () => {
  const router = useRouter();
  return (
    <div className="h-full max-h-full">
      <div className="flex justify-between items-center">
        <div className="text-3xl">แก้ไขประเภทเมนู</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="px-4 py-6 mt-5 bg-white overflow-auto">
        <EditCategoryForm />
      </div>
    </div>
  );
};

export default EditCategory;
