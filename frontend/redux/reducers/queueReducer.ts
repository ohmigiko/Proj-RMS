import { ADD_QUEUE_DETAILS, SET_ORDER_METHOD, } from "redux/actions/queueAction"

const initialState = {

}

// * id: "",
// * queue_num: "",
// * order_method: "",
// * table_id:"",
// * table_name:"",


export const queueReducer  = (state = initialState, { type, payload }): any => {
  switch (type) {

  case ADD_QUEUE_DETAILS:
    const updateQueueDetails = { ...state, ...payload }
    return updateQueueDetails

  case SET_ORDER_METHOD:
    const updatedOrderMethod = { ...payload }
    return updatedOrderMethod
  
 
  default:
    return state
  }
}
