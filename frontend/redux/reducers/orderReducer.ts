import {
  ADD_ORDER,
  CREATE_ORDER,
  DELETE_ONE_ORDER,
  EDIT_ORDER,
  EDIT_QUANTITY,
  RESET_ORDER_LIST,
} from "../actions/orderAction";

const initialState = { order_list: [] };

// *   {
// *     queue_id: "",
// *     order_list: [
// *       {
// *         category_id: "",
// *         menu_id: "",
// *         topping: [
// *           {
// *             name: "หมูกรอบ",
// *             choice: "yes",
// *           },
// *           ...
// *         ],
// *         quantity: 2,
// *       },
// *       ...
// *     ],
// *   }

export const orderReducer = (state = initialState, { type, payload }) => {
  let updatedOrder = { ...state };

  switch (type) {
    case CREATE_ORDER:
      return {};

    case ADD_ORDER:
      let isSameOrder = false;
      for (let i = 0; i < updatedOrder.order_list.length; i++) {
        if (
          updatedOrder.order_list[i].category_id === payload.category_id &&
          updatedOrder.order_list[i].menu_id === payload.menu_id &&
          updatedOrder.order_list[i].menu_name === payload.menu_name &&
          JSON.stringify(updatedOrder.order_list[i].topping) ===
            JSON.stringify(payload.topping)
        ) {
          const sum_quantity =
            updatedOrder.order_list[i].quantity + payload.quantity;
          const sum_price =
            (updatedOrder.order_list[i].price /
              updatedOrder.order_list[i].quantity) *
            sum_quantity;
          updatedOrder.order_list[i].quantity = sum_quantity;
          updatedOrder.order_list[i].price = sum_price;
          isSameOrder = true;
          break;
        }
      }
      if (!isSameOrder) updatedOrder.order_list.push({ ...payload });
      return updatedOrder;

    case DELETE_ONE_ORDER:
      updatedOrder.order_list.splice(payload, 1);
      return updatedOrder;

    case RESET_ORDER_LIST:
      updatedOrder.order_list = [];
      return updatedOrder;

    case EDIT_ORDER:
      updatedOrder.order_list[payload.orderIdx] = payload.orderDetails;
      const editedOrder = updatedOrder.order_list[payload.orderIdx];
      let i = 0;
      console.log("reducer", updatedOrder);
      while (
        i < updatedOrder.order_list.length &&
        updatedOrder.order_list.length > 1
      ) {
        if (i === payload.orderIdx) i++;
        if (
          updatedOrder.order_list[i].category_id === editedOrder.category_id &&
          updatedOrder.order_list[i].menu_id === editedOrder.menu_id &&
          updatedOrder.order_list[i].menu_name === editedOrder.menu_name &&
          JSON.stringify(updatedOrder.order_list[i].topping) ===
            JSON.stringify(editedOrder.topping)
        ) {
          const sum_quantity =
            updatedOrder.order_list[i].quantity + editedOrder.quantity;
          const sum_price =
            (updatedOrder.order_list[i].price /
              updatedOrder.order_list[i].quantity) *
            sum_quantity;
          updatedOrder.order_list[i].quantity = sum_quantity;
          updatedOrder.order_list[i].price = sum_price;
          updatedOrder.order_list.splice(payload.orderIdx, 1);
          break;
        }
        i++;
      }
      return updatedOrder;

    default:
      return state;
  }
};
