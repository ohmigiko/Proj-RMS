import CreateMenuForm from "components/admin/menu/CreateMenuForm";
import React, { useState } from "react";
import { useRouter } from "next/dist/client/router";
import CreatePresetForm from "components/admin/menu/CreatePresetForm";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";

const formState = {
  menu: "menu",
  preset: "preset",
};

const CreateMenu = () => {
  const {
    isLoading: categoryLoading,
    apiData: categoryData,
    serverError: categoryError,
  } = useFetch("GET", "/category/admin", {});

  const {
    isLoading: menuLoading,
    apiData: menuData,
    serverError: menuError,
  } = useFetch("GET", "/menu", {});

  const [form, setForm] = useState(formState.menu);
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-3xl">สร้างเมนู</div>
        <button
          className="text-xl border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.back()}
        >
          กลับ
        </button>
      </div>
      <div className="p-4 mt-5 bg-white">
        {categoryLoading || menuLoading ? (
          <Loading></Loading>
        ) : categoryData && menuData ? (
          <>
            <div className="mb-5 flex space-x-8 text-xl font-light">
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  name="form_radio"
                  value={formState.menu}
                  defaultChecked
                  onChange={(e) => setForm(e.target.value)}
                />
                <label htmlFor="">เมนู</label>
              </div>
              <div className="flex space-x-2 items-center">
                <input
                  type="radio"
                  name="form_radio"
                  value={formState.preset}
                  onChange={(e) => setForm(e.target.value)}
                />
                <label htmlFor="">เซทเมนู</label>
              </div>
            </div>
            {form === formState.menu ? (
              <CreateMenuForm categoryData={categoryData} />
            ) : form === formState.preset ? (
              <CreatePresetForm menuData={menuData} />
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CreateMenu;
