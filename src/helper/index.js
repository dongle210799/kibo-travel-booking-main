import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
export function callAPI(endpoint, method = "GET", body) {
  const _token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${_token}`,
  };
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_URL}/${endpoint}`,
    data: body,
    headers: headers,
  });
}

export function notifytoast(
  type,
  text,
  position = "top-center",
  autoClose = 1200,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true
) {
  switch (type) {
    case "success":
      return toast.success(text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
      });
    case "error":
      return toast.error(text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
      });
    case "warning":
      return toast.warning(text, {
        position,
        autoClose,
        hideProgressBar,
        closeOnClick,
        pauseOnHover,
        draggable,
      });
  }
}

export const formatDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
