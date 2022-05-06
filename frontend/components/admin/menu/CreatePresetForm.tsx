import Loading from "components/templates/Loading";
import OrderItemText from "components/text/OrderItemText";
import axiosInstance from "helpers/axios";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CreatePresetForm = ({ menuData }) => {
  const router = useRouter();
  const [currMenuId, setCurrMenuId] = useState(null);
  const [toppingList, setToppingList] = useState([]);
  const [choices, setChoices] = useState([]);
  const [currMenu, setCurrMenu] = useState({ topping: [] });

  useEffect(() => {
    const currentMenu = menuData
      .filter((menu) => menu.id === currMenuId)
      .map((curr) => curr);

    const initToppingList = () => {
      let temp_toppingList = [];
      if (
        currentMenu[0]?.topping !== null &&
        currentMenu[0]?.topping !== [] &&
        currentMenu[0]?.topping !== undefined
      ) {
        const toppingArray = [...currentMenu[0].topping];
        toppingArray.map((item) => {
          temp_toppingList.push({
            name: item.name,
            choice: {
              name: "no",
              price: 0,
            },
            option: item.option,
          });
        });
        setToppingList(temp_toppingList);
      }
    };

    const initChoices = () => {
      let temp_choices = [];
      if (
        currentMenu[0]?.topping !== null &&
        currentMenu[0]?.topping !== [] &&
        currentMenu[0]?.topping !== undefined
      ) {
        const toppingArray = [...currentMenu[0].topping];
        toppingArray.map((item) => {
          temp_choices.push(item);
        });
        setChoices(temp_choices);
      }
    };

    // initCurrMenu();
    if (currentMenu.length !== 0) {
      setCurrMenu(currentMenu[0]);
    }
    initToppingList();
    initChoices();
  }, [currMenuId]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  console.log("toppingList", toppingList);

  const toppingClick = (topping: {}) => {
    let toppingArr = [...toppingList];
    const objIdx = toppingArr.findIndex((obj) => obj.name === topping);
    const option = toppingArr[objIdx].option;
    let use_choice = choices[objIdx].choice;
    let new_choice = {};
    if (option === "option_with_extra") {
      if (toppingArr[objIdx].choice.name === "no") {
        new_choice = use_choice.find((choice) => choice.name === "yes");
      } else if (toppingArr[objIdx].choice.name === "yes") {
        new_choice = use_choice.find((choice) => choice.name === "extra");
      } else if (toppingArr[objIdx].choice.name === "extra") {
        new_choice = use_choice.find((choice) => choice.name === "no");
      }
    } else if (option === "option") {
      if (toppingArr[objIdx].choice.name === "no") {
        new_choice = use_choice.find((choice) => choice.name === "yes");
      } else if (toppingArr[objIdx].choice.name === "yes") {
        new_choice = use_choice.find((choice) => choice.name === "no");
      }
    }
    toppingArr[objIdx].choice = new_choice;
    setToppingList(toppingArr);
  };

  const onSubmit = (data) => {
    data.topping = toppingList;
    data.category_id = currMenu.category_id;
    axiosInstance.post("/preset", data).then(() => router.back());
  };

  return (
    <form className="grid gap-y-5 text-xl" onSubmit={handleSubmit(onSubmit)}>
      <div className="inline-block">
        <label htmlFor="menu">เมนู : </label>{" "}
        <select
          className="ml-3 font-light border-2 border-gray-lg 300 rounded px-3 py-2"
          id="menu"
          {...register("menu_id")}
          onChange={(e) => setCurrMenuId(e.target.value)}
        >
          <option value="" selected disabled>
            เลือกเมนู
          </option>
          {menuData &&
            menuData.map((menu) => (
              <option value={menu.id}>{menu.name}</option>
            ))}
        </select>
      </div>
      <div className="flex">
        <div>เซทเมนู : </div>
        <div className="font-light ml-3 flex space-x-2">
          <div>{currMenu.name}</div>
          {toppingList.map((topping) => (
            <div key={topping.name}>
              <OrderItemText orderItem={topping} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2 grid text-lg font-light grid-cols-3 border border-2 p-4 gap-y-4">
        {currMenu.topping.map((item, index) => (
          <div
            key={item.name}
            className={
              "w-max p-1 " +
              (toppingList[index]?.choice?.name === "yes"
                ? "border-b border-red-400 "
                : toppingList[index]?.choice?.name === "extra"
                ? "border border-red-400 rounded-xl "
                : "")
            }
            onClick={() => toppingClick(item.name)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <button
        className="mt-2 shadow-xl px-3 py-4 bg-red-500 text-white rounded-md"
        type="submit"
      >
        สร้างเซทเมนู
      </button>
    </form>
  );
};

export default CreatePresetForm;
