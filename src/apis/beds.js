import { callAPI } from "../helper";

export const onCreateBeds = (body) => {
  return callAPI("beds", "POST", body);
};
export const onShowBeds = (page, pageSize, search) => {
  return callAPI(
    `beds?page=${page}&page_size=${pageSize}&search=${search}&isJoin=true`,
    "GET"
  );
};
export const onDetailBeds = (id) => {
  return callAPI(`beds/detail/${id}`, "GET");
};
export const onUpDateBeds = (id, body) => {
  return callAPI(`beds/update/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`beds/${id}/status`, "PATCH");
};
export const onShowRoom = () => {
  return callAPI(`rooms?status=true&isJoin=false&page_size=1000`, "GET");
};
export const onDeleteBed = (id) => {
  return callAPI(`beds/${id}`, "DELETE");
};
