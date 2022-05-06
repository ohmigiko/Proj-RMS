export const CREATE_ORDER = "CREATE_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const DELETE_ONE_ORDER = "DELETE_ONE_ORDER";
export const RESET_ORDER_LIST = "RESET_ORDER";
export const EDIT_QUANTITY = "EDIT_QUANTITY";
export const EDIT_ORDER = "EDIT_ORDER";

export const createOrder = () => ({
  type: CREATE_ORDER,
});

export const addOrder = (orderDetails: any) => ({
  type: ADD_ORDER,
  payload: orderDetails,
});

export const deleteOneOrder = (orderIdx: number) => ({
  type: DELETE_ONE_ORDER,
  payload: orderIdx,
});

export const resetOrderList = () => ({
  type: RESET_ORDER_LIST,
});

export const editOrder = (orderDetails: any,orderIdx: number) => ({
  type: EDIT_ORDER,
  payload: {orderDetails, orderIdx},
})
