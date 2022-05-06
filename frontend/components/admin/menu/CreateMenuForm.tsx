import axiosInstance from "helpers/axios";
import useFetch from "hooks/useFetch";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ModalCreateCategory from "./ModalCreateCategory";
import { MdAdd, MdRemove } from "react-icons/md";
import { useRouter } from "next/dist/client/router";
import Category from "pages/admin/menu/category/[category_id]";

const CreateMenuForm = ({ categoryData }) => {
  const router = useRouter();
  const { category_id } = router.query;
  const [showModalCreateCategory, setShowModalCreateCategory] = useState(false);
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
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    data.topping = topping;
    console.log("data", data);
    axiosInstance
      .post("/menu", data)
      .then((res) => console.log(res))
      .then(() => router.back());
  };

  const addTopping = () => {
    console.log("add");
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
    }
    if (label === "option_with_extra") {
      if (checked) {
        temp[i].option = "option_with_extra";
        temp[i].choice.push({ name: "extra", price: 0 });
      } else {
        temp[i].option = "option";
        temp[i].choice = temp[i].choice.filter((item) => item.name !== "extra");
      }
      console.log(temp);
    }
    if (label === "normal_price") {
      temp[i].choice[1].price = value;
    }
    if (label === "extra_price") {
      temp[i].choice[2].price = value;
    }
    setTopping(temp);
    // console.log(topping[i].option)
  };

  return (
    <>
      <form className="grid gap-y-5 text-xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex space-x-4 items-center">
          <label htmlFor="category">ประเภท: </label>{" "}
          <select
            className="px-3 py-2 border border-2 rounded"
            id="category"
            {...register("category_id")}
          >
            <option value="" selected disabled>
              เลือกประเภท
            </option>
            {categoryData &&
              categoryData.map((category) => (
                <option value={category.id}>{category.name}</option>
              ))}
          </select>
          <button
            className="bg-blue-500 text-white py-1 px-3 rounded inline-block text-md"
            onClick={() => setShowModalCreateCategory(!showModalCreateCategory)}
            type="button"
          >
            สร้าง
          </button>
          {errors.name && (
            <div className="text-red-500">* กรุณากรอกหรือเลือกประเภท</div>
          )}
        </div>
        <div className="flex space-x-4">
          <div>
            <label htmlFor="menu">เมนู : </label>
            <input
              className="font-light px-3 py-2"
              id="menu"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <div className="text-red-500">* กรุณากรอกหรือเลือกชื่อเมนู</div>
            )}
          </div>
          <div>
            <label htmlFor="price">ราคา(บาท) : </label>
            <input
              className="font-light px-3 py-2"
              id="price"
              {...register("price", { required: true })}
            />
            {errors.name && <div className="text-red-500">* กรุณากรอกราคา</div>}
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
                  <MdAdd color={"white"} />
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
                    onChange={(e) => handleToppingChange(index, "name", e)}
                  />
                </div>
                <div className="flex items-center space-x-1.5">
                  <input
                    className="font-light px-3 py-2 h-4 w-4"
                    type="checkbox"
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
                  onChange={(e) =>
                    handleToppingChange(index, "normal_price", e)
                  }
                />
              </div>
              {topping[index]?.option === "option_with_extra" && (
                <div>
                  <label htmlFor="">พิเศษ : </label>
                  <input
                    className="font-light px-3 py-2"
                    type="number"
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
          สร้างเมนู
        </button>
      </form>
      <ModalCreateCategory
        open={showModalCreateCategory}
        setOpen={setShowModalCreateCategory}
      />
    </>
  );
};

export default CreateMenuForm;
