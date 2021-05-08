import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  Input,
  Row,
  Label,
  FormGroup,
  FormFeedback,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import { notifytoast, formatDate } from "../../../helper/index";
import "react-toastify/dist/ReactToastify.css";
import { onRegister, onDetailAdmin, onUpDateAdmin } from "../../../apis/users";

import moment from "moment";

import _ from "lodash";
import Password from "antd/lib/input/Password";
function Admin(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [ID, setID] = useState("");
  const [detail, setDetail] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [age, setAge] = useState(0);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userError, setuserError] = useState("");
  const [firstNameError, setFirstError] = useState("");
  const [lastNameError, setLastError] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validFristName, setValidFirst] = useState(false);
  const [validLastName, setValidLast] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
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

  const { params } = props.match;

  function validate() {
    const param = params;
    let emailError = "";
    let firstNameError = "";
    let lastNameError = "";
    let passwordError = "";
    let userError = "";

    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

    if (!email) {
      emailError = "Email is not blank";
      setValidEmail(true);
    } else if (!regEmail.test(email)) {
      emailError = "Invalid email";
      setValidEmail(true);
    }
    if (!password) {
      passwordError = "Password is not blank ";
      setValidPassword(true);
    }
    if (!firstname) {
      firstNameError = "Firstname is not blank ";
      setValidFirst(true);
    }
    if (!userName) {
      userError = "User name is not blank ";
      setValidUserName(true);
    }
    if (!lastname) {
      lastNameError = "Lastname is not blank ";
      setValidLast(true);
    }
    if (param.id) {
      if (firstNameError || lastNameError) {
        setFirstError(firstNameError);
        setLastError(lastNameError);
        return false;
      }
    } else {
      if (
        emailError ||
        passwordError ||
        userError ||
        firstNameError ||
        lastNameError
      ) {
        setEmailError(emailError);
        setuserError(userError);
        setPasswordError(passwordError);
        setFirstError(firstNameError);
        setLastError(lastNameError);
        return false;
      }
    }
    return true;
  }
  function onChangeEmail(e) {
    setEmail(e.target.value);
    setValidEmail(false);
  }
  function onChangePassword(e) {
    setPassword(e.target.value);
    setValidPassword(false);
  }
  function onChangefirstname(e) {
    setFirstname(e.target.value);
    setValidFirst(false);
  }
  function onChangeUserName(e) {
    setUserName(e.target.value);
    setValidUserName(false);
  }
  function onChangelastname(e) {
    setLastname(e.target.value);
    setValidLast(false);
  }
  const onChangeAge = (e) => {
    setAge(e.target.value);
  };
  // function onChangedate(e) {
  //   setDateofbirth(moment().format(e.target.value));
  // }
  // function onChangerole(e) {
  //   setRole(e.target.value);
  // }
  // function onChangegender(e) {
  //   setGender(e.target.value);
  // }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      username: userName,
      passsword: password,
      email: email,

      firstName: firstname,
      lastName: lastname,
      age: age,
    };
    if (isValid) {
      return onRegister(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/users");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          Array.isArray(err.response.data.message)
            ? err.response.data.message.map((message) => {
                notifytoast("error", message);
              })
            : notifytoast("error", "Email is already existed");
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
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-4">
            <Form onSubmit={onSubmit}>
              <h1> Create User</h1>

              <FormGroup className="mb-3">
                <Label for="Email">Email</Label>
                <Input
                  type="text"
                  name="userName"
                  placeholder="Email"
                  autoComplete="username"
                  value={email}
                  onChange={onChangeEmail}
                  invalid={validEmail}
                />
                {emailError ? <FormFeedback>{emailError}</FormFeedback> : null}
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
                  placeholder="date of birth"
                  value={age}
                  // max={moment().format("YYYY-MM-DD")}
                  onChange={onChangeAge}
                />
              </FormGroup>

              {/* {user.id === ID ? (
                <FormGroup className="mb-3">
                  <Label for="Email">Role</Label>
                  <Input
                    type="text"
                    name="select"
                    value={role}
                    style={{ background: "#D3D3D3" }}
                    disabled
                  ></Input>
                </FormGroup>
              ) : (
                <FormGroup className="mb-3">
                  <Label for="Email">Role</Label>
                  <Input
                    type="select"
                    name="select"
                    value={role}
                    onChange={onChangerole}
                  >
                    {elOption}
                  </Input>
                </FormGroup>
              )}

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
              </FormGroup> */}
              <Button color="success" block>
                Submit
              </Button>
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Admin;
