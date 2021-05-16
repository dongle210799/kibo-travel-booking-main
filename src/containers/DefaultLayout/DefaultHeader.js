import React, { useState, useEffect } from "react";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CustomInput,
  FormGroup,
  Button,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";
import { onUpDateAdmin, onUpdateAvatar, onDetailAdmin } from "../../apis/users";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import { notifytoast, formatDate } from "../../helper/index";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/images/logo.png";
import logomini from "../../assets/images/Logomini.png";
import defaultAvatar from "../../assets/images/defaultAvatar.png";

import _ from "lodash";

function DefaultHeader(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [detail, setDetail] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [dateofbirth, setDateofbirth] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState("ADMIN");
  const [firstNameError, setFirstError] = useState("");
  const [lastNameError, setLastError] = useState("");
  const [validFristName, setValidFirst] = useState(false);
  const [validLastName, setValidLast] = useState(false);
  const [modals, setModals] = useState(false);
  const [gender, setGender] = useState("MALE");
  const [isAvatar, setIsAvatar] = useState(false);
  const [isName, setIsName] = useState(false);
  const getUser = Object.assign({}, JSON.parse(localStorage.getItem("user")));
  const [file, setFile] = useState(null);

  useEffect(() => {
    detailUser();
  }, [isAvatar, isName, modals]);
  const detailUser = async () => {
    try {
      var res = await onDetailAdmin(user.id);
      setIsAvatar(false);
      setDetail(res.data);
      setEmail(res.data.email);
      setFirstname(res.data.firstName);
      setLastname(res.data.lastName);
      setAvatar(res.data.avatar);
      setDateofbirth(res.data.dateOfBirth);
      setRole(res.data.role);
      setGender(res.data.gender);
    } catch (error) {
      console.log(error);
    }
  };
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
      setFirstError(firstNameError);
      setLastError(lastNameError);
      return false;
    }

    return true;
  }
  function onToggleModals(e) {
    setModals(!modals);
    setValidFirst(false);
    setValidLast(false);
  }

  function onChangefirstname(e) {
    setFirstname(e.target.value);
    setValidFirst(false);
  }
  function onChangelastname(e) {
    setLastname(e.target.value);
    setValidLast(false);
  }
  async function onChangeAvatar(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setAvatar(e.target.files[0]);
    }
  }
  function onChangedate(e) {
    setDateofbirth(moment().format(e.target.value));
  }

  function onChangegender(e) {
    setGender(e.target.value);
  }
  function onDetail(e) {
    const isValid = validate();
    const body = {
      firstName: firstname,
      lastName: lastname,
      gender: gender,
      dateOfBirth: dateofbirth,
    };
    if (isValid) {
      return onUpDateAdmin(user.id, body)
        .then((res) => {
          notifytoast("success", "Updated successfully");
          setIsName(true);
          onToggleModals();
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", "Updated unsuccessfully");
          setIsName(false);
        });
    }
  }
  function onUpdateAvatars(e) {
    const formData = new FormData();
    formData.append("avatar", avatar);
    return onUpdateAvatar(formData)
      .then((res) => {
        setIsAvatar(true);
        setIsName(true);
      })
      .catch((err) => {
        console.log(err);
        setIsAvatar(false);
        setIsName(false);
      });
  }

  return (
    <React.Fragment>
      <AppSidebarToggler className="d-lg-none" display="md" mobile />
      {/* <AppNavbarBrand
        full={{ src: logo, width: 110, height: 50, alt: "Logo" }}
        minimized={{ src: logomini, width: 17, height: 40, alt: "sygnet" }}
      /> */}
      <AppSidebarToggler
        className="d-md-down-none"
        display="lg"
      ></AppSidebarToggler>
      <Nav className="ml-auto" navbar>
        {detail ? detail.fullName : " "}
        <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
            <img
              src={
                avatar
                  ? `${process.env.REACT_APP_API_URL}/${detail.avatar}`
                  : defaultAvatar
              }
              className="img-avatar"
              style={{ maxWidth: 35 }}
            />
          </DropdownToggle>

          <DropdownMenu right>
            {/* <DropdownItem onClick={onToggleModals}>
              <i className="fa fa-user"></i> Profile
            </DropdownItem> */}
            <Modal isOpen={modals} className="modals modal-dialog-centered">
              <ModalHeader
                toggle={onToggleModals}
                className="modals-header"
                style={{ background: "#1b8eb7" }}
              >
                <h3>Profile</h3>
              </ModalHeader>
              <ModalBody>
                <center>
                  {file ? (
                    <img
                      id="frame"
                      alt="your image"
                      src={file}
                      name="aboutme"
                      border="0"
                      className="image-profile"
                    />
                  ) : (
                    <img
                      id="frame"
                      alt="your image"
                      src={
                        avatar
                          ? `${process.env.REACT_APP_API_URL}/${detail.avatar}`
                          : defaultAvatar
                      }
                      name="aboutme"
                      border="0"
                      className="image-profile"
                    />
                  )}
                </center>
                <FormGroup className="mb-3" style={{ marginTop: 50 }}>
                  <Label for="Email">Email</Label>
                  <Input
                    type="text"
                    name="userName"
                    value={email}
                    style={{ background: "#D3D3D3" }}
                    disabled
                  />
                  <FormFeedback>You can not change email</FormFeedback>
                </FormGroup>

                <FormGroup className="mb-3">
                  <Label for="Email">First name</Label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    autoComplete="off"
                    value={firstname}
                    onChange={onChangefirstname}
                    invalid={validFristName}
                  />
                  {firstNameError ? (
                    <FormFeedback>{firstNameError}</FormFeedback>
                  ) : null}
                </FormGroup>
                <FormGroup className="mb-3">
                  <Label for="Email">Last name</Label>
                  <Input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    autoComplete="off"
                    value={lastname}
                    onChange={onChangelastname}
                    invalid={validLastName}
                  />
                  {lastNameError ? (
                    <FormFeedback>{lastNameError}</FormFeedback>
                  ) : null}
                </FormGroup>

                <FormGroup className="mb-3">
                  <Label for="Email">Date of birth</Label>
                  <Input
                    type="date"
                    name="date"
                    placeholder="date of birth"
                    max={moment().format("YYYY-MM-DD")}
                    value={formatDate(dateofbirth)}
                    onChange={onChangedate}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <Label for="Email">Avatar </Label>
                  <CustomInput
                    type="file"
                    id="imgInp"
                    name="customFile"
                    label={avatar || "choose an image file"}
                    onChange={onChangeAvatar}
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <Label for="Email">Role</Label>
                  <Input
                    name="select"
                    value={role}
                    style={{ background: "#D3D3D3" }}
                    disabled
                  ></Input>
                </FormGroup>

                <FormGroup className="mb-3">
                  <Label for="Email">Gender</Label>
                  <FormGroup
                    tag="fieldset"
                    onChange={onChangegender}
                    className="radio"
                    checked={gender}
                  >
                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value="MALE"
                        checked={gender === "MALE"}
                      />{" "}
                      Male
                    </Label>

                    <Label check>
                      <Input
                        type="radio"
                        name="radio1"
                        value="FEMALE"
                        checked={gender === "FEMALE"}
                      />{" "}
                      Female
                    </Label>
                  </FormGroup>
                </FormGroup>
              </ModalBody>
              <ModalFooter className="modals-footer">
                <Button
                  color="primary"
                  onClick={() => {
                    onDetail();
                    onUpdateAvatars();
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
            <ToastContainer />
            <DropdownItem
              onClick={(e) => props.onLogout(e)}
              style={{ color: "red" }}
            >
              <i className="fa fa-sign-out" style={{ color: "Tomato" }}></i>{" "}
              Logout
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </React.Fragment>
  );
}

export default DefaultHeader;
