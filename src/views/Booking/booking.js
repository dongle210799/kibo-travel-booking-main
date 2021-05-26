import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NurseItem from "../../components/city/cityItem";
import { onShowBooking, onShowBookingHotel } from "../../apis/booking";
import Loading from "../../components/loading/loading";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../helper/index";
import "react-toastify/dist/ReactToastify.css";
import PaginationApp from "../../components/Pagination/pagination";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Col,
  Row,
  Table,
} from "reactstrap";
import BookingItem from "../../components/Booking/booking_tour";
import BookingHotel from "../../components/Booking/booking_hotels";

function Admin() {
  const [listBooking, setListBooking] = useState([]);
  const [listBookingHotel, setListBookingHotel] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [totalCout, setTotalCout] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getListNurse();
    getListHotel();
  }, [currentPage, textSearch, edit]);

  const getListNurse = async () => {
    try {
      setLoading(true);
      const res = await onShowBooking();
      setLoading(false);
      console.log(res.data);
      setListBooking(res.data.items);
      setCurrentPage(res.data.meta.currentPage);
      setPageSize(res.data.meta.itemsPerPage);
      setTotalCout(res.data.meta.totalItems);
      setTotalPage(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const getListHotel = async () => {
    try {
      setLoading(true);
      const res = await onShowBookingHotel();
      setLoading(false);

      setListBookingHotel(res.data.items);
      // setCurrentPage(res.data.meta.currentPage + currentPage);
      // setPageSize(res.data.meta.itemsPerPage + pageSize);
      // setTotalCout(res.data.meta.totalItems + totalCout);
      // setTotalPage(res.data.meta.totalPages + totalPage);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }
  function showNurse(listBooking) {
    var result = null;
    if (listBooking.length > 0) {
      result = listBooking.map((item, index) => {
        return (
          <BookingItem
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            index={index}
          />
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={10} style={{ textAlign: "center" }}>
            No Data...
          </td>
        </tr>
      );
    }
    return result;
  }
  function showHotel(listBooking) {
    var result = null;
    if (listBooking.length > 0) {
      result = listBooking.map((item, index) => {
        return (
          <BookingHotel
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            index={index + currentPage}
          />
        );
      });
    } else {
      return (
        <tr>
          <td colSpan={10} style={{ textAlign: "center" }}>
            No Data...
          </td>
        </tr>
      );
    }
    return result;
  }
  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="animated fadeIn">
        <Row>
          {/* <Col xs="9" lg="4">
            <InputGroup>
              <Input
                placeholder="Nurse name..."
                value={textSearch}
                onChange={onHandleSearch}
              />
              <InputGroupAddon addonType="append">
                <Button
                  className="fa fa-search mb10"
                  onClick={onSearch}
                ></Button>
              </InputGroupAddon>
            </InputGroup>
          </Col> */}
          {/* <Col xs="3" lg="3">
            <Link
              to="/admin/nurses/create-nurse"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create city
            </Link>
          </Col> */}
          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>User Name</th>
                  <th>Tour Name</th>
                  <th>Hotel Name</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Number Of Person</th>
                </tr>
              </thead>
              <tbody>
                {showNurse(listBooking)}
                {showHotel(listBookingHotel)}
              </tbody>
            </Table>

            {/* <PaginationApp
              listAdmin={listBooking}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCout}
              totalPage={totalPage}
              handleClickItem={handleClickItem}
            /> */}
            <ToastContainer />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;
