import React from "react";
import HeaderAdmin from "components/templates/headers/HeaderAdmin";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import DataTable from "components/admin/DataTable";
import DelAndEditCol from "components/admin/DelAndEditCol";
import { useRouter } from "next/dist/client/router";
import axiosInstance from "helpers/axios";

const Table = () => {
  const router = useRouter();
  const {
    isLoading,
    apiData: tablesData,
    serverError,
  } = useFetch("GET", "/table", "");

  console.log(tablesData);
  

  return (
    <div>
      <HeaderAdmin text={"โต๊ะ"} />
      <div className="p-2.5 mt-5 w-full h-full bg-white border shadow-xl">
        {isLoading ? (
          <Loading />
        ) : tablesData ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ชื่อโต๊ะ
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tablesData.map((table) => (
                  <tr key={table.id} className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700">
                    <td className="px-6 py-4">{table.name}</td>
                    <DelAndEditCol
                      editClick={() =>
                        router.push(`/admin/table/${table.id}/edit`)
                      }
                      deleteClick={() => axiosInstance.delete(`/table/${table.id}`).then(()=>window.location)}
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

export default Table;
