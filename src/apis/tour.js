import { callAPI } from "../helper";

export const onShowListPatient = (page, pageSize, search) => {
  return callAPI(`api/v1/tourist-areas`, "GET");
};
export const onCreatePatient = (body) => {
  return callAPI("api/v1/tourist-areas", "POST", body);
};
export const onDetailPatient = (id) => {
  return callAPI(`api/v1/tourist-areas/${id}`, "GET");
};
export const onUpDatePatient = (id, body) => {
  return callAPI(`api/v1/tourist-areas/updateArea/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`patients/${id}/status`, "PATCH");
};
export const onDeletePatient = (id) => {
  return callAPI(`api/v1/tourist-areas/deleteArea/${id}`, "DELETE");
};
export const onShowcity = () => {
  return callAPI(`api/v1/cities`, "GET");
};
