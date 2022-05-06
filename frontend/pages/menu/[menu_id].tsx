import React, { useEffect, useState } from "react";
import Button from "../../components/buttons/Button";
import BandHeader from "../../components/templates/headers/BandHeader";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import useFetch from "hooks/useFetch";
import Loading from "components/templates/Loading";
import { useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, deleteOneOrder, editOrder } from "redux/actions/orderAction";
import OrderItemText from "components/text/OrderItemText";
import axiosInstance from "helpers/axios";

const CustomMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [choices, setChoices] = useState([]);
  const [toppingOrderList, setToppingOrderList] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [currOrderIdx, setCurrOrderIdx] = useState(null);
  const [editType, setEditType] = useState("");
  const { menu_id } = router.query;

  const {
    isLoading: isLoading,
    apiData: menuData,
    serverError,
  } = useFetch("GET", `/menu/${menu_id}`, {});

  const { order_list } = useSelector((state) => state.order);
  const current_queue = useSelector((state) => state.current_queue);
  console.log("order_list", order_list);
  console.log("menuData", menuData);

  useEffect(() => {
    const initQuantity = () => {
      setQuantity(order_list[0].quantity);
    };

    const initToppingOrderList = () => {
      let temp_toppingList = [];
      if (menuData !== undefined && menuData !== null) {
        const toppingArray = [...menuData.topping];
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
      }
      setToppingOrderList(temp_toppingList);
    };

    const initChoices = () => {
      let temp_choices = [];
      if (menuData !== undefined && menuData !== null) {
        const toppingArray = [...menuData.topping];
        toppingArray.map((item) => {
          temp_choices.push(item);
        });
      }
      setChoices(temp_choices);
    };

    let isEdit = false;
    for (let i = 0; i < order_list.length; i++) {
      if (order_list[i].status !== undefined && order_list[i].status !== null) {
        console.log("order_list[i]", i, order_list[i]);
        setToppingOrderList(order_list[i].topping);
        setCurrOrderIdx(i);
        if (order_list[i]?.status === "preset") {
          setQuantity(1);
          setEditType("preset");
          isEdit = true;
          break;
        } else if (order_list[i]?.status === "edit_from_ordered") {
          initQuantity();
          setEditType("edit_from_ordered");
          isEdit = true;
          break;
        } else if (order_list[i]?.status === "edit_from_summary") {
          initQuantity();
          setEditType("edit_from_summary");
          isEdit = true;
          break;
        }
      }
    }
    if (!isEdit) initToppingOrderList();
    initChoices();
  }, [menuData]);

  const increaseValue = () => {
    setQuantity(quantity + 1);
  };

  const decreaseValue = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const changeQuantity = (e) => {
    const { value } = e.target;
    setQuantity(value);
  };

  const toppingClick = (topping: {}) => {
    let toppingArr = [...toppingOrderList];
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
    setToppingOrderList(toppingArr);
  };

  const priceCal = (toppingOrderList: any[]) => {
    const topping_price = toppingOrderList.reduce(
      (prevVal, currVal) => prevVal + Number(currVal.choice.price),
      0
    );
    return (menuData.price + topping_price) * quantity;
  };

  const editOrderFromOrdered = () => {
    const orderDetails = {
      topping: toppingOrderList,
      quantity,
    };
    axiosInstance.patch(`/order/edit/${order_list[0].order_id}`, orderDetails);
    if (current_queue.order_method === "dine-in") {
      router.push(
        `/dine-in/tables/${current_queue.table_id}/order-list/${current_queue.queue_id}`
      );
    } else if (current_queue.order_method === "wait-dine-in") {
      router.push(`/wait-dine-in/${current_queue.queue_id}/order-list`);
    } else if (
      current_queue.order_method === "pick-up" ||
      current_queue.order_method === "rider"
    ) {
      router.push(`/take-home/${current_queue.queue_id}/order-list`);
    }
  };

  const editOrderFromSummary = () => {
    const price = priceCal(toppingOrderList);
    const orderDetails = {
      category_id: menuData.category_id,
      menu_id: menuData.id,
      menu_name: menuData.name,
      topping: toppingOrderList,
      price,
      quantity,
    };
    dispatch(editOrder(orderDetails, currOrderIdx));
    router.push("/confirm-order");
  };

  const editPreset = () => {
    const price = priceCal(toppingOrderList);
    const orderDetails = {
      category_id: menuData.category_id,
      menu_id: menuData.id,
      menu_name: menuData.name,
      topping: toppingOrderList,
      price,
      quantity,
    };
    dispatch(editOrder(orderDetails, currOrderIdx));
    router.push("/menu");
  };

  const addOrderClick = () => {
    const price = priceCal(toppingOrderList);
    const orderDetails = {
      category_id: menuData.category_id,
      menu_id: menuData.id,
      menu_name: menuData.name,
      topping: toppingOrderList,
      price,
      quantity,
    };
    dispatch(addOrder(orderDetails));
    router.push("/menu");
  };

  console.log("editType", editType);
  console.log("currOrderIdx", currOrderIdx);
  console.log("toppingOrderList", toppingOrderList);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : menuData && toppingOrderList ? (
        <div>
          <header>
            <BandHeader
              text={"สั่งอาหาร"}
              goBackClick={
                editType === "preset"
                  ? () => {
                      dispatch(deleteOneOrder(currOrderIdx));
                      router.back();
                    }
                  : editType !== ""
                  ? () => router.back()
                  : () => router.push("/menu")
              }
            />
          </header>
          <main className="p-6">
            <div className="flex text-xl space-x-3">
              <div>{menuData.name}</div>
              {toppingOrderList
                .filter((item) => item.choice.name !== "no")
                .map((item, index) => (
                  <OrderItemText orderItem={item} key={index} />
                ))}
            </div>
            <div className="mt-4 grid text-lg font-light grid-cols-3 border p-4 gap-y-4">
              {menuData.topping.map((item, index) => (
                <div
                  key={index}
                  className={
                    "w-max p-1 " +
                    (toppingOrderList[index].choice.name === "yes"
                      ? "border-b border-red-400 "
                      : toppingOrderList[index].choice.name === "extra"
                      ? "border border-red-400 rounded-xl "
                      : "")
                  }
                  onClick={() => toppingClick(item.name)}
                >
                  {item.name}
                  {/* {toppingOrderList[index].choice} */}
                </div>
              ))}
            </div>
            <div className="mt-9 grid grid-cols-2 gap-x-6 ">
              <form className="flex items-center">
                <div
                  className="flex justify-center items-center border border-gray-400 px-2 h-9"
                  id="decrease"
                  onClick={decreaseValue}
                >
                  <HiOutlineMinus color={"grey"} />
                </div>
                <input
                  type="number"
                  className="border border-l-0 border-r-0 border-gray-400 text-center py-1 px-2 w-24 h-9"
                  value={quantity}
                  onChange={(e) => {
                    changeQuantity(e);
                  }}
                />
                <div
                  className="flex justify-center items-center border border-gray-400 px-2 h-9"
                  onClick={increaseValue}
                >
                  <HiOutlinePlus color={"grey"} />
                </div>
              </form>
              {editType === "edit_from_ordered" ||
              editType === "edit_from_summary" ? (
                <div>
                  <Button
                    text={"แก้ไขรายการ"}
                    icon={undefined}
                    handleClick={
                      editType === "edit_from_ordered"
                        ? editOrderFromOrdered
                        : editOrderFromSummary
                    }
                    optClassName="bg-red-500 text-white text-md"
                  />
                </div>
              ) : (
                <div>
                  <Button
                    text={"เพิ่มรายการอาหาร"}
                    icon={undefined}
                    handleClick={
                      editType === "preset" ? editPreset : addOrderClick
                    }
                    optClassName="bg-red-500 text-white text-md"
                  />
                </div>
              )}
            </div>
          </main>
        </div>
      ) : null}
    </div>
  );
};

export default CustomMenu;
