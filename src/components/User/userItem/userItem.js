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
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import ModalApp from "../../Modals/modals";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import moment from "moment";
import { onDetailAdmin, onUpDateAdmin } from "../../../apis/users";
import _ from "lodash";
function UserItem(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [ID, setID] = useState("");
  const [idUser, setIdUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [password, setPassword] = useState(null);
  const [age, setAge] = useState(0);
  const [userName, setUserName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstNameError, setFirstError] = useState("");
  const [lastNameError, setLastError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userError, setUserError] = useState("");
  const [validFristName, setValidFirst] = useState(false);
  const [validLastName, setValidLast] = useState(false);
  const [validPassword, setValidPassWord] = useState(false);
  const [validUserName, setValidUserName] = useState(false);

  const [arrRole, setArrRole] = useState([
    {
      id: 1,
      value: "ADMIN",
      title: "ADMIN",
    },
    {
      id: 2,
      value: "USER",
      title: "USER",
    },
  ]);
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
      var res = await onDetailAdmin(idUser);
      setID(res.data.id);
      setEmail(res.data.email);
      setFirstname(res.data.firstName);
      setLastname(res.data.lastName);
      setUserName(res.data.username);
      setAge(res.data.age);
    } catch (error) {
      console.log(error);
    }
  };
  function onToggleModals(e) {
    setModals(!modals);
  }
  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onToggleModalsEdit(id) {
    setIdUser(id);
    setModals3(!modals3);
  }
  function validate() {
    let firstNameError = "";
    let lastNameError = "";

    if (!firstname) {
      firstNameError = "Firstname is not blank ";
      setValidFirst(true);
    }
    if (!lastname) {
      lastNameError = "Lastname is not blank ";
      setValidLast(true);
    }

    if (firstNameError || lastNameError) {
      setEmailError(emailError);
      setFirstError(firstNameError);
      setLastError(lastNameError);
      return false;
    }

    return true;
  }
  function onChangefirstname(e) {
    setFirstname(e.target.value);
    setValidFirst(false);
  }
  function onChangelastname(e) {
    setLastname(e.target.value);
    setValidLast(false);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
    setValidPassWord(false);
  }
  function onChangeUserName(e) {
    setUserName(e.target.value);
    setValidUserName(false);
  }
  function onChangeAge(e) {
    setAge(e.target.value);
  }

  function onEdit(e) {
    e.preventDefault();

    const isValid = validate();
    const body = {
      firstName: firstname,
      lastName: lastname,
      age: age,
      username: userName,
      password: password,
    };
    if (isValid) {
      return onUpDateAdmin(idUser, body)
        .then((res) => {
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            setModals3(!modals3);
            onEdit2();
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);

          notifytoast("error", err.response.data.message);
        });
    }
  }
  // var elOption = Array.isArray(arrRole)
  //   ? arrRole.map((option, i) => {
  //       return (
  //         <option key={i} value={option.value}>
  //           {option.title}
  //         </option>
  //       );
  //     })
  //   : "";
  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.email}</td>
      <td>
        {!item.fullName ? item.firstName + " " + item.lastName : item.fullName}
      </td>

      <td>{item.roles}</td>
      <td>{formatDate(item.createdAt)}</td>
      <td>
        <Switch checked={item.status} onChange={onToggleModals}></Switch>
        <Modal isOpen={modals} className="modals modal-dialog-centered">
          <ModalHeader
            toggle={onToggleModals}
            className="modals-header"
          ></ModalHeader>
          <ModalBody>
            <p className="text-center font-weight-bold" style={{ margin: 0 }}>
              Do you want to {item.status ? "inactivate" : "activate"} this
              user?
            </p>
          </ModalBody>
          <ModalFooter className="modals-footer">
            <Button
              color="primary"
              onClick={() => {
                onToggleModals();
                onChangeStatus(item);
              }}
            >
              Submit
            </Button>{" "}
            &nbsp;
            <Button color="danger" onClick={onToggleModals}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-warning mr-2 ml-2 mb-2 mt-2 "
          onClick={() => onToggleModalsEdit(item.id)}
        >
          <span className="fa fa-pencil "></span>
        </button>
        <ModalApp
          modal={modals3}
          children={
            <Form>
              <h1> Create User</h1>

              <FormGroup className="mb-3">
                <Label for="Email">Email</Label>
                <Input
                  disabled
                  type="text"
                  name="userName"
                  placeholder="Email"
                  autoComplete="username"
                  value={email}
                  // onChange={onChangeEmail}
                  // invalid={validEmail}
                />
                {/* {emailError ? <FormFeedback>{emailError}</FormFeedback> : null} */}
              </FormGroup>

              <FormGroup className="mb-3">
                <Label for="Email">Password</Label>
                <Input
                  type="text"
                  placeholder="Password"
                  autoComplete="off"
                  value={password}
                  onChange={onChangePassword}
                  invalid={validPassword}
                />
                {passwordError ? (
                  <FormFeedback>{passwordError}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="Email">User Name</Label>
                <Input
                  type="text"
                  placeholder="User Name"
                  autoComplete="off"
                  value={userName}
                  onChange={onChangeUserName}
                  invalid={validUserName}
                />
                {userError ? <FormFeedback>{userError}</FormFeedback> : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="Email">First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  autoComplete="off"
                  maxLength="30"
                  value={firstname}
                  onChange={onChangefirstname}
                  invalid={validFristName}
                />
                {firstNameError ? (
                  <FormFeedback>{firstNameError}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="Email">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  autoComplete="off"
                  maxLength="30"
                  value={lastname}
                  onChange={onChangelastname}
                  invalid={validLastName}
                />
                {lastNameError ? (
                  <FormFeedback>{lastNameError}</FormFeedback>
                ) : null}
              </FormGroup>

              <FormGroup className="mb-3">
                <Label for="Email">age</Label>
                <Input
                  type="number"
                  name="date"
                  placeholder="age"
                  value={age}
                  // max={moment().format("YYYY-MM-DD")}
                  onChange={onChangeAge}
                />
              </FormGroup>
            </Form>
          }
          onSubmit={onEdit}
          title={"User Detail"}
          toggleModal={onToggleModalsEdit}
          showModalFooter={onToggleModalsEdit}
        />
        <button
          type="button"
          className="btn btn-danger mb-2 mt-2"
          onClick={onToggleModalsDelete}
        >
          <span className="fa fa-trash "></span>
        </button>
        <Modal isOpen={modals2} className="modals modal-dialog-centered">
          <ModalHeader
            toggle={onToggleModalsDelete}
            className="modals-header"
          ></ModalHeader>
          <ModalBody>
            <p className="text-center font-weight-bold" style={{ margin: 0 }}>
              Do you want to delete this user?
            </p>
          </ModalBody>
          <ModalFooter className="modals-footer">
            <Button
              color="primary"
              onClick={() => {
                onToggleModalsDelete();
                onDelete(item.id);
              }}
            >
              Delete
            </Button>{" "}
            &nbsp;
            <Button color="danger" onClick={onToggleModalsDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </td>
    </tr>
  );
}

export default UserItem;
