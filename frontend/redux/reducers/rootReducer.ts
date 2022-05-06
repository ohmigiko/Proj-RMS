import { combineReducers } from "redux";
import { orderReducer } from "./orderReducer";
import { queueReducer } from "./queueReducer";
import { userReducer } from "./userReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  current_queue: queueReducer,
  order: orderReducer,
});



