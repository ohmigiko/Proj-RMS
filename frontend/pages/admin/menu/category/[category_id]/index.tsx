import DelAndEditCol from "components/admin/DelAndEditCol";
import Loading from "components/templates/Loading";
import axiosInstance from "helpers/axios";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { MdNavigateNext } from "react-icons/md";

const Category = () => {
  const router = useRouter();

  const { category_id } = router.query;

  const {
    isLoading,
    apiData: menuData,
    serverError,
  } = useFetch("GET", `/menu/category/${category_id}`, {});

  const category_name = localStorage.getItem("category_name");
  console.log("menu", menuData);

  return (
    <div>
      <div className="flex justify-between items-center">
        <nav className="flex text-3xl" aria-label="Breadcrumb">
          <ol className="inline-flex items-start space-x-1 ">
            <li className="inline-flex items-start">
              <div
                onClick={() => router.push("/admin/menu/category")}
                className="flex-col items-start text-center hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <div className="underline text-blue-500 ">ประเภทเมนู</div>
                <div className="text-xl">({category_name})</div>
              </div>
            </li>
            <li className="inline-flex items-start">
              <MdNavigateNext />
              <div>เมนู</div>
            </li>
          </ol>
        </nav>
        <div className="text-lg flex space-x-4 items-center">
          <button
            className="border p-2.5 rounded-lg bg-red-600 text-white"
            onClick={() => router.push("/admin/menu/create")}
          >
            สร้างเมนูใหม่
          </button>
          <button
            className="text-lg border py-2.5 rounded-lg bg-red-500 text-white px-4"
            onClick={() => router.push(`/admin/menu/category`)}
          >
            กลับ
          </button>
        </div>
      </div>
      <div className="px-3 py-6 mt-5 mt-5 w-full h-full bg-white border shadow-xl">
        {isLoading ? (
          <Loading />
        ) : menuData ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400 table-auto">
              <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    เมนู
                  </th>
                  <th scope="col" className="px-6 py-3">
                    ราคา (บาท)
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuData.map((menu) => (
                  <tr
                    key={menu.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td
                      className="px-6 py-4 text-blue-500 underline"
                      onClick={() => {
                        localStorage.setItem("menu_name", `${menu.name}`);
                        router.push(router.asPath + `/menu/${menu.id}`);
                      }}
                    >
                      {menu.name}
                    </td>
                    <td className="px-6 py-4">{menu.price}</td>
                    <DelAndEditCol
                      editClick={() =>
                        router.push(router.asPath + `/menu/${menu.id}/edit`)
                      }
                      deleteClick={() =>
                        axiosInstance
                          .delete(`/menu/${menu.id}`)
                          .then(() => window.location.reload())
                      }
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Category;
