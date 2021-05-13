import { callAPI } from "../helper";

export const onShowListPatient = (page, pageSize, search) => {
  return callAPI(`api/v1/tourist-areas`, "GET");
};
export const onCreatePatient = (body) => {
  return callAPI("patients", "POST", body);
};
export const onDetailPatient = (id) => {
  return callAPI(`patients/detail/${id}`, "GET");
};
export const onUpDatePatient = (id, body) => {
  return callAPI(`patients/update/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`patients/${id}/status`, "PATCH");
};
export const onDeletePatient = (id) => {
  return callAPI(`patients/${id}`, "DELETE");
};
export const onShowBed = () => {
  return callAPI(`beds/empty-bed?page_size=1000`, "GET");
};
export const onShowNurse = () => {
  return callAPI(`nurses?status=true&isJoin=false&page_size=1000`, "GET");
};
