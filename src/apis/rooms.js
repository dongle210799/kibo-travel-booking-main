import { callAPI } from "../helper";

export const onCreateRoom = (body) => {
  return callAPI("api/v1/hotels", "POST", body);
};
export const onShowRooms = (page, pageSize, search) => {
  return callAPI(`api/v1/hotels`, "GET");
};
export const onDetailRoom = (id) => {
  return callAPI(`api/v1/hotels/getDetail/${id}`, "GET");
};
export const onUpDateRoom = (id, body) => {
  return callAPI(`api/v1/hotels/updateHotel/${id}`, "PUT", body);
};
export const onUpDateStatus = (id) => {
  return callAPI(`rooms/${id}/status`, "PATCH");
};
export const onDeleteRoom = (id) => {
  return callAPI(`api/v1/hotels/deleteHotel/${id}`, "DELETE");
};
export const onShowcity = () => {
  return callAPI(`api/v1/cities`, "GET");
};
