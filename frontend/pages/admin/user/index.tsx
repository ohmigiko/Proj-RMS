import DelAndEditCol from "components/admin/DelAndEditCol";
import HeaderAdmin from "components/templates/headers/HeaderAdmin";
import Loading from "components/templates/Loading";
import useFetch from "hooks/useFetch";
import React from "react";
import { useRouter } from "next/dist/client/router";
import { boolean } from "yup";
import axiosInstance from "helpers/axios";

const User = () => {
  const {
    isLoading,
    apiData: usersData,
    serverError,
  } = useFetch("GET", "/user", "");

  const router = useRouter();
  console.log('usersData',usersData)

  console.log(usersData);
  const tableHead = [
    "รหัสพนักงาน",
    "ชื่อ",
    "ตำแหน่ง",
    "สร้างเมื่อ",
    "แก้ไขล่าสุด",
  ];

  const formatZuluTime = (date) => {
    let date_time = new Date(date);
    let dateFormatted = date_time.toLocaleDateString("th-TH");
    let timeFormatted = date_time.toLocaleTimeString("th-TH");
    return { dateFormatted, timeFormatted };
  };

  return (
    <div>
      <HeaderAdmin text={"ผู้ใช้งาน"} />
      <div className="px-3 py-6 mt-5 bg-white shadow-xl">
        {isLoading ? (
          <Loading />
        ) : usersData ? (
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-left text-gray-500 dark:text-gray-400 ">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {tableHead.map((thead) => (
                    <th scope="col" className="px-6 py-4">
                      {thead}
                    </th>
                  ))}
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {usersData.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                    >
                      {Object.keys(user).map((key) => (
                        <>
                          {typeof user[key] !== "boolean" && (
                            <td className="px-6 py-4">
                              {key.includes("date") ? (
                                <>
                                  <div>
                                    วันที่ {formatZuluTime(user[key]).dateFormatted}
                                  </div>
                                  <div>
                                    เวลา {formatZuluTime(user[key]).timeFormatted}
                                  </div>
                                </>
                              ) : (
                                user[key]
                              )}
                            </td>
                          )}
                        </>
                      ))}
                      <DelAndEditCol
                        editClick={() =>
                          router.push(`/admin/user/${user.id}/edit`)
                        }
                        deleteClick={() =>
                          axiosInstance
                            .delete(`/user/${user.id}`)
                            .then(() => window.location.reload())}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default User;
