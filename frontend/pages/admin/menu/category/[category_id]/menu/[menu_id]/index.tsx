import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import DelAndEditCol from "components/admin/DelAndEditCol";
import OrderItemText from "components/text/OrderItemText";

const MenuId = () => {
  const router = useRouter();
  const { category_id, menu_id } = router.query;
  const {
    isLoading,
    apiData: menuData,
    serverError,
  } = useFetch("GET", `/menu/${menu_id}`, {});

  console.log("menuData", menuData);
  const category_name = localStorage.getItem("category_name");
  const menu_name = localStorage.getItem("menu_name");

  return (
    <div>
      <div className="flex justify-between items-center">
        <nav className="flex text-3xl" aria-label="Breadcrumb">
          <ol className="inline-flex items-start space-x-1">
            <li className="inline-flex items-start text-center">
              <div
                onClick={() => router.push("/admin/menu/category")}
                className="flex flex-col items-center hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <div className="underline text-blue-500 ">ประเภทเมนู</div>
                <div className="text-xl">({category_name})</div>
              </div>
            </li>
            <li className="inline-flex items-start space-x-1">
              <MdNavigateNext />
              <div
                onClick={() =>
                  router.push(`/admin/menu/category/${category_id}`)
                }
                className="flex flex-col text-center hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <div className="underline text-blue-500 ">เมนู</div>
                <div className="text-xl">({menu_name})</div>
              </div>
            </li>
            <li className="inline-flex items-start space-x-1">
              <MdNavigateNext />
              <div className="flex items-center">ท็อปปิ้งและเซทเมนู</div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-4 text-lg flex justify-end space-x-4 items-center">
        <button
          className="border p-2.5 rounded-lg bg-red-600 text-white"
          onClick={() => router.push("/admin/menu/create")}
        >
          สร้างเมนูใหม่
        </button>
        <button
          className="text-lg border py-2.5 rounded-lg bg-red-500 text-white px-4"
          onClick={() => router.push(`/admin/menu/category/${category_id}`)}
        >
          กลับ
        </button>
      </div>
      <div className="px-3 py-6 mt-5 mt-5 w-full h-full bg-white border shadow-xl">
        {isLoading ? (
          <Loading />
        ) : menuData ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    ท็อปปิ้ง
                  </th>
                  <th scope="col" className="px-6 py-4">
                    ราคา (บาท)
                  </th>
                  {/* <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th> */}
                </tr>
              </thead>
              <tbody>
                {menuData.topping.map((topping, index) => (
                  <tr
                    key={index}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td className="px-6 py-4 ">{topping.name}</td>
                    <td className="px-6 py-4">
                      {topping.choice
                        .filter((choice) => choice.name != "no")
                        .map((choice) => (
                          <div className="flex space-x-2">
                            {choice.name === "yes" ? (
                              <span>ปกติ</span>
                            ) : choice.name === "extra" ? (
                              <span className="text-red-500">พิเศษ</span>
                            ) : null}
                            <span>{choice.price}</span>
                          </div>
                        ))}
                    </td>
                    {/* <DelAndEditCol
                      editClick={() =>
                        router.push(router.asPath + `/editTopping`)
                      }
                      deleteClick={undefined}
                    /> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
      <div className="px-3 py-6 mt-5 mt-5 w-full h-full bg-white border shadow-xl">
        {isLoading ? (
          <Loading />
        ) : menuData ? (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    เซทเมนู
                  </th>
                  <th scope="col" className="px-6 py-4">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuData.preset.map((menu, index) => (
                  <tr
                    key={index}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <div>{menuData.name}</div>
                        {menu.topping.map((item) => (
                          <div>
                            <OrderItemText orderItem={item} />
                          </div>
                        ))}
                      </div>
                    </td>
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

export default MenuId;
