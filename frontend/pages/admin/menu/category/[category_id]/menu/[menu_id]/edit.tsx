import EditMenuForm from 'components/admin/menu/EditMenuForm';
import { useRouter } from 'next/dist/client/router';
import React from 'react'

const EditMenu = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl">แก้ไขประเภทเมนู</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="p-4 mt-5 bg-white">
        <EditMenuForm />
      </div>
    </div>
  );
}

export default EditMenu