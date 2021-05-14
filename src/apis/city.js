import { callAPI } from "../helper";

export const onCreateNurse = (body) => {
  return callAPI("api/v1/cities", "POST", body);
};
export const onShowlistNurse = (page, pageSize, search) => {
  return callAPI(`api/v1/cities`, "GET");
};
export const onDetailNurse = (id) => {
  return callAPI(`nurses/detail/${id}`, "GET");
};
export const onUpDateNurse = (id, body) => {
  return callAPI(`nurses/update/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`nurses/${id}/status`, "PATCH");
};
export const onDeleteNurse = (id) => {
  return callAPI(`nurses/${id}`, "DELETE");
};
export const onShowcountry = () => {
  return callAPI(`api/v1/countries`, "GET");
};
