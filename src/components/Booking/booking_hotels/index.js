import React from "react";

import { formatDate } from "../../../helper/index";

function BookingHotel(props) {
  var { item, index, currentPage, pageSize } = props;

  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.__users__.username}</td>
      <td></td>
      <td>{item.__hotels__.hotelName}</td>
      <td>{formatDate(item.startTime)}</td>
      <td>{formatDate(item.endTime)}</td>
      <td>{item.numberPerson}</td>
    </tr>
  );
}

export default BookingHotel;
