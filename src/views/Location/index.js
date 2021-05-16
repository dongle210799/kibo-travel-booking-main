import React, { useState, useEffect, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import UserItem from "../../components/Location/locationItem/index";
import {
  onShowlistAdmin,
  onUpDateStatus,
  onDeleteAdmin,
} from "../../apis/users";
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

function Location() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [listadmin, setListAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [textSearch, setTextSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState();
  const [totalCout, setTotalCout] = useState();
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getListAdmin();
  }, [currentPage, textSearch, edit]);

  //get listAdmin
  const getListAdmin = async () => {
    const body = {
      page: currentPage,
      limit: pageSize,
    };
    try {
      setLoading(true);
      const res = await onShowlistAdmin(currentPage, pageSize, body);
      setLoading(false);
      console.log(res.data);
      setListAdmin(res.data.items);
      setCurrentPage(res.data.meta.currentPage);
      setPageSize(res.data.meta.itemsPerPage);
      setTotalCout(res.data.meta.totalItems);
      setTotalPage(res.data.meta.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  // async function onChangeStatus(item) {
  //   await onUpDateStatus(item.id)
  //     .then((res) => {
  //       getListAdmin();
  //       notifytoast(
  //         "success",
  //         `${item.status ? "Inactivated" : "Activated"} successfully`
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err.response);
  //       Array.isArray(err.response.data.message)
  //         ? err.response.data.message.map((message) => {
  //             notifytoast("error", message);
  //           })
  //         : notifytoast("error", err.response.data.message);
  //     });
  // }
  // async function onDelete(id) {
  //   try {
  //     await onDeleteAdmin(id);
  //     const result = await onShowlistAdmin(currentPage, pageSize, textSearch);
  //     const { data } = result;
  //     setListAdmin(data.data);
  //     setTotalCout(data.pagitation.totalCount);
  //     setTotalPage(data.pagitation.totalPage);
  //     if (currentPage !== 1 && data.data.length === 0) {
  //       setCurrentPage(currentPage - 1);
  //     }
  //     notifytoast("success", "Deleted successfully");
  //   } catch (error) {
  //     console.log(error.response);
  //     notifytoast("error", error.response.data.message);
  //   }
  // }
  function onEdit2(e) {
    setEdit(!edit);
  }
  async function onHandleSearch(e) {
    e.preventDefault();
    setTextSearch(e.target.value);
    setCurrentPage(1);
  }
  async function onSearch(e) {
    await getListAdmin();
  }
  function handleClickItem(newPage) {
    setCurrentPage(newPage);
  }

  function showAdmin(listadmin) {
    var result = null;
    if (listadmin.length > 0) {
      result = listadmin.map((item, index) => {
        return (
          <UserItem
            key={index}
            item={item}
            pageSize={pageSize}
            currentPage={currentPage}
            index={index}
            // onChangeStatus={onChangeStatus}
            // onDelete={onDelete}
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
                placeholder="User name..."
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
              to="/admin/users/create-user"
              className="btn btn-primary mb10 mr5"
            >
              <span className="fa fa-plus mr5"></span>Create account
            </Link>
          </Col> */}
          <Col xs="12" lg="12">
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Email</th>
                  <th>User Name</th>
                  <th>Created Time</th>
                  <th>View location</th>
                </tr>
              </thead>
              <tbody>{showAdmin(listadmin)}</tbody>
            </Table>

            <PaginationApp
              listAdmin={listadmin}
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

export default Location;
