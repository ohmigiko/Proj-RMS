import axiosInstance from "helpers/axios";
import useFetch from "hooks/useFetch";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import Loading from "components/templates/Loading";

const EditMenuForm = () => {
  const router = useRouter();
  const { category_id, menu_id } = router.query;
  const [topping, setTopping] = useState([
    {
      name: "",
      choice: [
        {
          name: "no",
          price: 0,
        },
        { name: "yes", price: 0 },
      ],
      option: "option",
    },
  ]);

  const {
    isLoading,
    apiData: menuData,
    serverError,
  } = useFetch("GET", `/menu/${menu_id}`, {});

  const category_name = localStorage.getItem("category_name");

  useEffect(() => {
    if (menuData?.topping) {
      setTopping(menuData.topping);
    }
  }, [menuData]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    // data.topping = topping;
    // console.log(data);
    console.log("topping submit", { topping });
    axiosInstance
      .patch(`/menu/${menu_id}`, data)
      .then((res) => console.log(res.data));
    axiosInstance
      .patch(`/menu/topping/${menu_id}`, { topping })
      .then(() => router.back());
  };

  const addTopping = () => {
    let temp = [
      ...topping,
      {
        name: "",
        choice: [
          {
            name: "no",
            price: 0,
          },
          { name: "yes", price: 0 },
        ],
        option: "option",
      },
    ];
    setTopping(temp);
  };

  const removeTopping = (index: number) => {
    console.log("remove");
    let temp = [...topping];
    temp.splice(index, 1);
    setTopping(temp);
  };

  const handleToppingChange = (i, label, e) => {
    const { value, checked } = e.target;
    const temp = [...topping];
    if (label === "name") {
      temp[i].name = value;
    } else if (label === "option_with_extra") {
      if (checked) {
        temp[i].option = "option_with_extra";
        temp[i].choice.push({ name: "extra", price: 0 });
      } else {
        temp[i].option = "option";
        temp[i].choice = temp[i].choice.filter((item) => item.name !== "extra");
      }
    } else {
      for (let j = 0; j < 3; j++) {
        if (
          (label === "normal_price" && temp[i].choice[j].name === "yes") ||
          (label === "extra_price" && temp[i].choice[j].name === "extra")
        ) {
          temp[i].choice[j].price = value;
          break;
        }
      }
    }
    setTopping(temp);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : menuData ? (
        <form
          className="grid gap-y-5 text-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex space-x-4 items-center">
            <label htmlFor="category">ประเภท : </label>{" "}
            <select
              className="px-3 py-2 border border-2 rounded"
              id="category"
              disabled
            >
              <option value="" selected disabled hidden>
                {category_name}
              </option>
            </select>
          </div>
          <div className="flex space-x-4">
            <div>
              <label htmlFor="menu">เมนู : </label>
              <input
                className="font-light px-3 py-2"
                id="menu"
                defaultValue={menuData.name}
                {...register("name", { required: true })}
              />
              {errors.name && (
                <div className="text-red-500">* กรุณากรอกหรือเลือกชื่อเมนู</div>
              )}
            </div>
            <div>
              <label htmlFor="price">ราคา (บาท) : </label>
              <input
                className="font-light px-3 py-2"
                id="price"
                defaultValue={menuData.price}
                {...register("price", { required: true })}
              />
              {errors.name && (
                <div className="text-red-500">* กรุณากรอกราคา</div>
              )}
            </div>
          </div>
          {topping.map((item, index) => (
            <div key={index}>
              <div className="flex space-x-3 items-center">
                <label htmlFor="name">ท็อปปิ้ง {index + 1}</label>
                {index === 0 ? (
                  <button
                    type="button"
                    className="grid items-center justify-content-center justify-items-center h-6 w-6 bg-green-500 w-max rounded"
                    onClick={addTopping}
                  >
                    <div>
                      <MdAdd color={"white"} size={"22"} />
                    </div>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="grid items-center justify-content-center justify-items-center h-6 w-6  bg-red-500 w-max rounded-full"
                    onClick={() => removeTopping(index)}
                  >
                    <MdRemove color={"white"} />
                  </button>
                )}
              </div>
              <div className="grid gap-y-4 border border-2 mt-2 py-5 px-4">
                <div className="flex space-x-6 items-center">
                  <div className="inline-block">
                    <label htmlFor="">ชื่อท็อปปิ้ง : </label>
                    <input
                      className="font-light px-3 py-2"
                      type="text"
                      defaultValue={topping[index].name}
                      onChange={(e) => handleToppingChange(index, "name", e)}
                    />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <input
                      className="font-light px-3 py-2 h-4 w-4"
                      type="checkbox"
                      defaultChecked={
                        topping[index].option === "option_with_extra"
                      }
                      onChange={(e) =>
                        handleToppingChange(index, "option_with_extra", e)
                      }
                    />
                    <label htmlFor="">พิเศษ</label>
                  </div>
                </div>
                <div>ราคา (บาท)</div>
                <div>
                  <label htmlFor="">ปกติ : </label>
                  <input
                    className="font-light px-3 py-2"
                    type="number"
                    defaultValue={topping[index].choice[0].price}
                    onChange={(e) =>
                      handleToppingChange(index, "normal_price", e)
                    }
                  />
                </div>
                {topping[index]?.option === "option_with_extra" && (
                  <div>
                    <label htmlFor="">พิเศษ : </label>
                    <input
                      className="ont-light px-3 py-2"
                      type="number"
                      defaultValue={topping[index].choice[2].price}
                      onChange={(e) =>
                        handleToppingChange(index, "extra_price", e)
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
          <button
            className="shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
            type="submit"
          >
            แก้ไขเมนู
          </button>
        </form>
      ) : null}
    </>
  );
};

export default EditMenuForm;
