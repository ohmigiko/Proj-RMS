export const ADD_QUEUE_DETAILS = "ADD_QUEUE_DETAILS";
export const SET_ORDER_METHOD = "SET_ORDER_METHOD";

export const addQueueDetails = (queueDetails: any) => {
  return {
    type: ADD_QUEUE_DETAILS,
    payload: queueDetails,
  };
};

export const setOrderMethod = (orderMethod: any) => {
  return {
    type: SET_ORDER_METHOD,
    payload: orderMethod,
  };
};
