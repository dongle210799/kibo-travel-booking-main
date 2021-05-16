import { callAPI } from "../helper";

export const onDetailLocation = (id) => {
  return callAPI(`api/v1/users/checkLocation/${id}`, "GET");
};
