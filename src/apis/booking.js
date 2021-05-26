import { callAPI } from "../helper";

export const onShowBooking = () => {
  return callAPI(`api/v1/user-book-tour/book_tour`, "GET");
};
export const onShowBookingHotel = () => {
  return callAPI(`api/v1/hotels/book_hotel`, "GET");
};
