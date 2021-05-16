import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PatientItem from "../../components/tour/tourItem/tourItem";
import {
  onShowListPatient,
  onUpDateStatus,
  onDeletePatient,
} from "../../apis/tour";
import { ToastContainer } from "react-toastify";
import Loading from "../../components/loading/loading";
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

function Patients(props) {
  const [listPatient, setListPatient] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [totalCout, setTotalCout] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getListPatient();
  }, [currentPage, textSearch, edit]);

  const getListPatient = async () => {
    try {
      setLoading(true);
      const res = await onShowListPatient(currentPage, pageSize, textSearch);
      setLoading(false);
      setListPatient(res.data.items);
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
    getListPatient();
    notifytoast(
      "success",
      `${item.status ? "Inactivated" : "Activated"} successfully`
    );
  }
  async function onDelete(id) {
    try {
      await onDeletePatient(id);
      const result = await onShowListPatient(currentPage, pageSize, textSearch);
      console.log(result);
      const { data } = result;
      setListPatient(data.items);
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

  function onHandleSearch(e) {
    e.preventDefault();
    setTextSearch(e.target.value);
    setCurrentPage(1);
  }
  async function onSearch(e) {
    await getListPatient();
  }
  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }
  function onEdit2(e) {
    setEdit(!edit);
  }
  function showPatient(listPatient) {
    var result = null;
    if (listPatient.length > 0) {
      result = listPatient.map((item, index) => {
        return (
          <PatientItem
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
                placeholder="Patient Name..."
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
              to="/admin/tours/create-tour"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create Tour
            </Link>
          </Col>
          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Tour Name</th>
                  <th>Price</th>
                  <th>City</th>
                  <th>Created At</th>
                  <th>Country</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{showPatient(listPatient)}</tbody>
            </Table>

            <PaginationApp
              listAdmin={listPatient}
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

export default Patients;
