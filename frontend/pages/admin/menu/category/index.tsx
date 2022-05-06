import React from "react";
import { useRouter } from "next/dist/client/router";
import useFetch from "hooks/useFetch";
import BreadCrumbs from "components/admin/menu/BreadCrumbs";
import Loading from "components/templates/Loading";
import DelAndEditCol from "components/admin/DelAndEditCol";
import axiosInstance from "helpers/axios";

const Menu = () => {
  const router = useRouter();
  const {
    isLoading,
    apiData: categoryData,
    serverError,
  } = useFetch("GET", "/category/admin", {});

  console.log("categoryData", categoryData);

  return (
    <div>
      <div className="flex justify-between items-center">
        <nav className="flex text-3xl" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">ประเภทเมนู</li>
          </ol>
        </nav>
        <div className="text-lg flex space-x-4 items-center">
          <button
            className="border p-2.5 rounded-lg bg-red-600 text-white"
            onClick={() => router.push("/admin/menu/create")}
          >
            สร้างเมนูใหม่
          </button>
        </div>
      </div>
      <div className="px-3 py-6 mt-5 bg-white shadow-xl">
        {isLoading ? (
          <Loading />
        ) : categoryData ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400 table-auto">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ประเภทเมนู
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((category) => (
                  <tr
                    key={category.id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td
                      className={
                        "px-6 py-4 " +
                        (category.deleted
                          ? "text-gray-400"
                          : "text-blue-500 underline")
                      }
                      onClick={() => {
                        localStorage.setItem(
                          "category_name",
                          `${category.name}`
                        );
                        router.push(router.asPath + `/${category.id}`);
                      }}
                    >
                      {category.name}
                    </td>
                    <DelAndEditCol
                      editClick={() =>
                        router.push(router.asPath + `/${category.id}/edit`)
                      }
                      deleteClick={
                        category.deleted
                          ? () =>
                              axiosInstance
                                .patch(`/category/undelete/${category.id}`)
                                .then(() => window.location.reload())
                          : () =>
                              axiosInstance
                                .delete(`/category/${category.id}`)
                                .then(() => window.location.reload())
                      }
                      isDeleted={category.deleted}
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

export default Menu;
