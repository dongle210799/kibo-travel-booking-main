import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/loading/loading";
import RoomItem from "../../components/Hotel/HotelItem/hotelItem";
import { onShowRooms, onUpDateStatus, onDeleteRoom } from "../../apis/rooms";
import PaginationApp from "../../components/Pagination/pagination";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../helper/index";
import "react-toastify/dist/ReactToastify.css";
import {
  InputGroup,
  InputGroupAddon,
  Button,
  Input,
  Col,
  Row,
  Table,
} from "reactstrap";

function Room() {
  const [listRoom, setListRoom] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [totalCout, setTotalCout] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getListRoom();
  }, [currentPage, textSearch, edit]);

  //get listRoom
  const getListRoom = async () => {
    try {
      setLoading(true);
      const res = await onShowRooms(currentPage, pageSize, textSearch);
      setLoading(false);
      setListRoom(res.data.items);
      setCurrentPage(res.data.meta.currentPage);
      setPageSize(res.data.meta.itemsPerPage);
      setTotalCout(res.data.meta.totalItems);
      setTotalPage(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  async function onChangeStatus(item) {
    await onUpDateStatus(item.id);
    getListRoom();
    notifytoast(
      "success",
      `${item.status ? "Inactivated" : "Activated"}  successfully`
    );
  }
  async function onDelete(id) {
    try {
      await onDeleteRoom(id);
      const result = await onShowRooms(currentPage, pageSize, textSearch);
      console.log(result);
      const { data } = result;
      setListRoom(data.items);
      setTotalCout(data.meta.totalItems);
      setTotalPage(data.meta.totalPages);
      if (currentPage !== 1 && data.data.length === 0) {
        console.log("aaa");
        setCurrentPage(currentPage - 1);
      }
      notifytoast("success", "Deleted successfully");
    } catch (error) {
      console.log(error.response);
      notifytoast("error", error.response.data.message);
    }
  }
  async function onHandleSearch(e) {
    e.preventDefault();
    setTextSearch(e.target.value);
    setCurrentPage(1);
  }

  async function onSearch(e) {
    await getListRoom();
  }
  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }
  function onEdit2(e) {
    setEdit(!edit);
  }
  function showRoom(listRoom) {
    var result = null;
    if (listRoom.length > 0) {
      result = listRoom.map((item, index) => {
        return (
          <RoomItem
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangeStatus={onChangeStatus}
            onDelete={onDelete}
            onEdit2={onEdit2}
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

  return (
    <>
      {loading ? <Loading /> : ""}
      <div className="animated fadeIn">
        <Row>
          <Col xs="9" lg="4">
            <InputGroup>
              <Input
                placeholder="Room name..."
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
          </Col>
          <Col xs="3" lg="3">
            <Link
              to="/admin/rooms/create-room"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create room
            </Link>
          </Col>

          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Hotel Name</th>
                  <th>Price</th>
                  <th>City</th>
                  <th>rate</th>
                  <th>Country</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showRoom(listRoom)}</tbody>
            </Table>

            <PaginationApp
              listAdmin={listRoom}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCout}
              totalPage={totalPage}
              handleClickItem={handleClickItem}
            ></PaginationApp>
            <ToastContainer />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Room;
