export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export const setUser = (userData: string) => ({
  type: SET_USER,
  payload: userData
});

export const resetUser = () => ({
  type: RESET_USER,
});

