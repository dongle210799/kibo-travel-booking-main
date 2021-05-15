import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NurseItem from "../../components/city/cityItem";
import {
  onShowlistNurse,
  onUpDateStatus,
  onDeleteNurse,
} from "../../apis/city";
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

function Admin() {
  const [listNurse, setListNurse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [totalCout, setTotalCout] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getListNurse();
  }, [currentPage, textSearch, edit]);

  const getListNurse = async () => {
    try {
      setLoading(true);
      const res = await onShowlistNurse(currentPage, pageSize, textSearch);
      setLoading(false);
      setListNurse(res.data.items);
      setCurrentPage(res.data.meta.currentPage);
      setPageSize(res.data.meta.itemsPerPage);
      setTotalCout(res.data.meta.totalItems);
      setTotalPage(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  async function onDelete(id) {
    try {
      await onDeleteNurse(id);
      const result = await onShowlistNurse(currentPage, pageSize, textSearch);
      console.log(result);
      const { data } = result;
      setListNurse(data.items);
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
  async function onChangeStatus(item) {
    await onUpDateStatus(item.id);
    getListNurse();
    notifytoast(
      "success",
      `${item.status ? "Inactivated" : "Activated"} successfully`
    );
  }
  async function onHandleSearch(e) {
    e.preventDefault();
    setTextSearch(e.target.value);
    setCurrentPage(1);
  }

  async function onSearch(e) {
    await getListNurse();
  }

  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }
  function showNurse(listNurse) {
    var result = null;
    if (listNurse.length > 0) {
      result = listNurse.map((item, index) => {
        return (
          <NurseItem
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            index={index}
            onChangeStatus={onChangeStatus}
            onDelete={onDelete}
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
          <Col xs="3" lg="3">
            <Link
              to="/admin/nurses/create-nurse"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create city
            </Link>
          </Col>
          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>City Name</th>
                  <th>Country Name</th>
                  <th>image</th>
                  <th>description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showNurse(listNurse)}</tbody>
            </Table>

            <PaginationApp
              listAdmin={listNurse}
              currentPage={currentPage}
              pageSize={pageSize}
              totalCount={totalCout}
              totalPage={totalPage}
              handleClickItem={handleClickItem}
            />
            <ToastContainer />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Admin;
