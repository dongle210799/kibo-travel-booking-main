import { callAPI } from "../helper";
import axios from "axios";

export const onRegister = (body) => {
  return callAPI("api/v1/users/admin_create_user", "POST", body);
};
export const onShowlistAdmin = (page, pageSize, body) => {
  return callAPI(`api/v1/users`, "GET", body);
};

export const onLogin = (body) => {
  const headers = {
    "Content-Type": "application/json",
  };
  return axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/auth/signin`,
    body,
    headers
  );
};
export const onDetailAdmin = (id) => {
  return callAPI(`api/v1/users/${id}`, "GET");
};
export const onUpDateAdmin = (id, body) => {
  return callAPI(`api/v1/users/updateUser/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`auth/user/${id}/status`, "PATCH");
};
export const onDeleteAdmin = (id) => {
  return callAPI(`api/v1/users/deleteUser/${id}`, "DELETE");
};
export const onUpdateAvatar = (avatar) => {
  return callAPI("auth/avatar", "POST", avatar);
};
