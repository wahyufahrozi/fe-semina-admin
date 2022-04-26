import { USER_LOGIN, USER_LOGOUT } from "./constants";

export function userLogin(token, role, username) {
  return {
    type: USER_LOGIN,
    token,
    role,
    username,
  };
  //ke reducer
}

export function userLogout() {
  localStorage.removeItem("auth");
  return {
    type: USER_LOGOUT,
  };
}