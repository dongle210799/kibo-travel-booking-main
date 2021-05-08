import { callAPI } from "../helper";

export const onCreateRoom = (body) => {
  return callAPI("rooms", "POST", body);
};
export const onShowRooms = (page, pageSize, search) => {
  return callAPI(
    `rooms?page=${page}&page_size=${pageSize}&search=${search}&isJoin=false`,
    "GET"
  );
};
export const onDetailRoom = (id) => {
  return callAPI(`rooms/detail/${id}`, "GET");
};
export const onUpDateRoom = (id, body) => {
  return callAPI(`rooms/update/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`rooms/${id}/status`, "PATCH");
};
export const onDeleteRoom = (id) => {
  return callAPI(`rooms/${id}`, "DELETE");
};
