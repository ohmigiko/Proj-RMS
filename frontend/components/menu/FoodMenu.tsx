import React from "react";
import Card from "../cards/Card";
import { Router, useRouter } from "next/dist/client/router";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, createOrder } from "redux/actions/orderAction";
import OrderItemText from "components/text/OrderItemText";

const FoodMenu = ({ menus }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { queue_id } = useSelector((state) => state.current_queue);

  const foodMenuClick = (menu) => {
    router.push(`/menu/${menu.id}`);
  };

  const presetClick = (menu, preset) => {
    let toppingList = []
    
    menu.topping.map((item) => {
      toppingList.push({
        name: item.name,
        choice: {
          name: "no",
          price: 0,
        },
        option: item.option,
      });
    });

    for (let i = 0; i < toppingList.length; i++) {
      for (let j = 0; j < preset.topping.length; j++) {
        if (preset.topping[j].name === toppingList[i].name) {
          toppingList[i] = preset.topping[j];
        }
      }
    }

    console.log(toppingList);
    const currOrder = {
      category_id: menu.category_id,
      menu_id: menu.id,
      menu_name: menu.name,
      topping: toppingList,
      price: preset.price,
      quantity: 1,
      status: "preset",
    };
    dispatch(addOrder(currOrder));
    router.push(`/menu/${menu.id}`);
  };

  return (
    <div className="px-6 mb-5">
      <ul>
        {menus.map((menu) => (
          <li className="mb-5" key={menu.id}>
            <Card
              handleClick={() => foodMenuClick(menu)}
              cardContent={<div className="text-xl">{menu.name}</div>}
            />
          </li>
        ))}
        {menus.map((menu, index) => {
          return (
            <div key={index}>
              {menu?.preset.map((preset, index) => (
                <li className="mb-5" key={index}>
                  <Card
                    handleClick={() => presetClick(menu, preset)}
                    cardContent={
                      <div className="text-xl">
                        {menu.name}{" "}
                        {preset.topping
                          .filter((topping) => topping.choice.name !== "no")
                          .map((item) => (
                            <OrderItemText key={item.name} orderItem={item} />
                          ))}
                      </div>
                    }
                  />
                </li>
              ))}
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default FoodMenu;
