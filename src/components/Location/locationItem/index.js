import React, { useState, useEffect } from "react";
import { formatDate } from "../../../helper/index";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormFeedback,
  FormGroup,
  Label,
  Input,
  Form,
  Col,
  Row,
  Table,
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import ModalApp from "../../Modals/modals";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import moment from "moment";
import { onDetailLocation } from "../../../apis/location";
import _ from "lodash";
function UserItem(props) {
  const [idUser, setIdUser] = useState(null);
  const [itemLocation, setItemLocation] = useState();
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  var {
    item,
    index,
    currentPage,
    pageSize,
    onChangeStatus,
    onDelete,
    onEdit2,
  } = props;
  useEffect(() => {
    detailUser();
  }, [idUser]);
  const detailUser = async () => {
    try {
      var res = await onDetailLocation(idUser);
      setItemLocation(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  // function onToggleModals(e) {
  //   setModals(!modals);
  // }
  // function onToggleModalsDelete(e) {
  //   setModals2(!modals2);
  // }
  function onToggleModalsEdit(id) {
    setIdUser(id);
    setModals3(!modals3);
  }
  // function validate() {
  //   let firstNameError = "";
  //   let lastNameError = "";

  //   if (!firstname) {
  //     firstNameError = "Firstname is not blank ";
  //     setValidFirst(true);
  //   }
  //   if (!lastname) {
  //     lastNameError = "Lastname is not blank ";
  //     setValidLast(true);
  //   }

  //   if (firstNameError || lastNameError) {
  //     setEmailError(emailError);
  //     setFirstError(firstNameError);
  //     setLastError(lastNameError);
  //     return false;
  //   }

  //   return true;
  // }
  // function onChangefirstname(e) {
  //   setFirstname(e.target.value);
  //   setValidFirst(false);
  // }
  // function onChangelastname(e) {
  //   setLastname(e.target.value);
  //   setValidLast(false);
  // }
  // function onChangePassword(e) {
  //   setPassword(e.target.value);
  //   setValidPassWord(false);
  // }
  // function onChangeUserName(e) {
  //   setUserName(e.target.value);
  //   setValidUserName(false);
  // }
  // function onChangeAge(e) {
  //   setAge(e.target.value);
  // }

  // function onEdit(e) {
  //   e.preventDefault();

  //   const isValid = validate();
  //   const body = {
  //     firstName: firstname,
  //     lastName: lastname,
  //     age: age,
  //     username: userName,
  //     password: password,
  //   };
  //   if (isValid) {
  //     return onUpDateAdmin(idUser, body)
  //       .then((res) => {
  //         notifytoast("success", "Saved successfully");
  //         setTimeout(() => {
  //           setModals3(!modals3);
  //           onEdit2();
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);

  //         notifytoast("error", err.response.data.message);
  //       });
  //   }
  // }

  function showLocation(listadmin) {
    var result = null;
    if (listadmin) {
      result = listadmin.map((item, index) => {
        return (
          <tr key={index}>
            <td>{index + 1 + (currentPage - 1) * pageSize}</td>
            <td>{item.location.title}</td>
            <td>{item.createdAt}</td>
          </tr>
          // <UserItem
          //   key={index}
          //   item={item}
          //   pageSize={pageSize}
          //   currentPage={currentPage}
          //   index={index}
          // />
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
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.email}</td>
      <td>
        {!item.fullName ? item.firstName + " " + item.lastName : item.fullName}
      </td>

      <td>{formatDate(item.createdAt)}</td>
      <td>
        <button
          type="button"
          className="btn btn-warning mr-2 ml-2 mb-2 mt-2 "
          onClick={() => onToggleModalsEdit(item.id)}
        >
          <span className="fa fa-map "></span>
        </button>
        <ModalApp
          modal={modals3}
          children={
            <Table responsive striped bordered hover className="text-center">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>location</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>{showLocation(itemLocation)}</tbody>
            </Table>
          }
          title={"Location Detail"}
          toggleModal={onToggleModalsEdit}
        />
      </td>
    </tr>
  );
}

export default UserItem;
