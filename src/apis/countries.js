import { callAPI } from "../helper";

export const onCreateBeds = (body) => {
  return callAPI("api/v1/countries", "POST", body);
};
export const onShowBeds = (page, pageSize, search) => {
  return callAPI(`api/v1/countries`, "GET");
};
export const onDetailBeds = (id) => {
  return callAPI(`api/v1/countries/${id}`, "GET");
};
export const onUpDateBeds = (id, body) => {
  return callAPI(`api/v1/countries/updateCountry/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`beds/${id}/status`, "PATCH");
};
export const onShowRoom = () => {
  return callAPI(`rooms?status=true&isJoin=false&page_size=1000`, "GET");
};
export const onDeleteBed = (id) => {
  return callAPI(`api/v1/countries/deleteCountry/${id}`, "DELETE");
};
