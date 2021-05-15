import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BedItem from "../../components/Countries/CountriesItem";
import { onShowBeds, onUpDateStatus, onDeleteBed } from "../../apis/countries";
import Loading from "../../components/loading/loading";
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

function Bed() {
  const [listBed, setListBed] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);
  const [totalCout, setTotalCout] = useState(null);
  const [edit, setEdit] = useState(null);
  useEffect(() => {
    getListBed();
  }, [currentPage, textSearch, edit]);

  const getListBed = async () => {
    try {
      setLoading(true);
      const res = await onShowBeds(currentPage, pageSize, textSearch);
      console.log(res.data);
      setLoading(false);
      setListBed(res.data.items);
      setCurrentPage(res.data.meta.currentPage);
      setPageSize(res.data.meta.itemsPerPage);
      setTotalCout(res.data.meta.totalItems);
      setTotalPage(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  async function onChangeStatus(item) {
    await onUpDateStatus(item.id);
    getListBed();
    notifytoast(
      "success",
      `Change ${item.status ? "inactive" : "active"} successful`
    );
  }
  async function onDelete(id) {
    try {
      await onDeleteBed(id);
      const result = await onShowBeds(currentPage, pageSize, textSearch);
      console.log(result);
      const { data } = result;
      console.log(data);
      setListBed(data.items);
      setTotalCout(data.meta.totalItems);
      setTotalPage(data.meta.totalPages);
      if (currentPage !== 1 && data.data.length === 0) {
        setCurrentPage(currentPage - 1);
      }
      notifytoast("success", "Deleted successfully");
    } catch (error) {
      console.log(error.response);
      notifytoast("error", error.response.data.message);
    }
  }
  function onEdit2(e) {
    setEdit(!edit);
  }
  async function onHandleSearch(e) {
    e.preventDefault();
    setCurrentPage(1);
    setTextSearch(e.target.value);
  }

  async function onSearch(e) {
    await getListBed();
  }
  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }
  function showBed(listBed) {
    var result = null;
    if (listBed.length > 0) {
      result = listBed.map((item, index) => {
        return (
          <BedItem
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            onChangeStatus={onChangeStatus}
            onDelete={onDelete}
            index={index}
            onEdit2={onEdit2}
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
                placeholder="Bed number..."
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
          <Col xs="3" lg="3">
            <Link
              to="/admin/beds/create-bed"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create Country
            </Link>
          </Col>

          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Country Name</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showBed(listBed)}</tbody>
            </Table>

            <PaginationApp
              listAdmin={listBed}
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

export default Bed;
