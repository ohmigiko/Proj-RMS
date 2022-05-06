import { SET_USER, RESET_USER } from "redux/actions/userAction";

const initialState = {};

// * id: "",
// * name: "",
// * role: "",

export const userReducer = (state = initialState, { type, payload }): any => {
  switch (type) {
    case SET_USER:
      const updateUser = { ...payload };
      return updateUser;

    case RESET_USER:
      return {};

    default:
      return state;
  }
};
