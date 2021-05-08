import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { notifytoast } from "../../../helper/index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Label,
  FormFeedback,
} from "reactstrap";
import logo from "../../../assets/images/logo.png";
import { onLogin } from "../../../apis/users";
import { trim } from "lodash";
function Login(props) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [remember, setRemember] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");
  const [validemail, setValidEmail] = useState(false);
  const [validpass, setValidPass] = useState(false);
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("token"));
  // const [admin, setAdmin] = useState(localStorage.getItem("user"));
  useEffect(() => {
    if (localStorage.checkbox && localStorage.email !== "") {
      setRemember(true);
      setEmail(localStorage.Email);
      setPassword(localStorage.password);
    }
  }, []);
  function validate() {
    let emailError = "";
    let passError = "";
    const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/;

    if (!email) {
      emailError = "Email is not blank";
      setValidEmail(true);
    } else if (!regEmail.test(email)) {
      emailError = "Invalid email";
      setValidEmail(true);
    }
    if (!password) {
      passError = "Password is not blank ";
      setValidPass(true);
    }

    if (emailError || passError) {
      setEmailError(emailError);
      setPassError(passError);
      return false;
    }
    return true;
  }
  // const handleKeyDown = (e) => {
  //   if (e.key === 32) {
  //     e.preventDefault();
  //     console.log("ok");
  //   }
  // };
  function onChangeName(e) {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }

    setEmail(e.currentTarget.value);
    setValidEmail(false);
  }
  function onChangePass(e) {
    if (e.currentTarget.value.includes(" ")) {
      e.currentTarget.value = e.currentTarget.value.replace(/\s/g, "");
    }

    setPassword(e.currentTarget.value);
    setValidPass(false);
  }
  function onRemember(e) {
    setRemember(e.target.checked);
  }
  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      email: email,
      password: password,
    };
    if (remember === true && email !== "") {
      localStorage.setItem("Email", email);
      localStorage.setItem("password", password);
      localStorage.setItem("checkbox", remember);
    } else {
      localStorage.removeItem("Email");
      localStorage.removeItem("password");
    }

    if (isValid) {
      return onLogin(body)
        .then((res) => {
          notifytoast("success", "Logged in successfully");
          localStorage.setItem("token", res.data.accessToken);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          setTimeout(() => {
            props.history.push("/admin");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", err.response.data.message);
        });
    }
  }

  if (loggedIn) {
    return <Redirect to="/admin"></Redirect>;
  }
  return (
    <div className="app flex-row align-items-center">
      <Container>
        <Row
          className="section-login container "
          style={{ marginTop: -100, textAlign: "center" }}
        >
          {/* <Col md="6">
            <img src={logo} className="Logo" />
          </Col> */}
          <h1>TRAVEL BOOKING</h1>
        </Row>
        <Row className="justify-content-center">
          <Col md="6">
            <CardGroup>
              <Card className="p-3">
                <CardBody>
                  <Form onSubmit={onSubmit}>
                    <h4 className="text-center" style={{ marginBottom: 40 }}>
                      Sign in to start your session
                    </h4>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Email address"
                        value={email}
                        onChange={onChangeName}
                      />
                      {emailError ? (
                        <FormFeedback>{emailError}</FormFeedback>
                      ) : null}
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="email"
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="off"
                        value={password}
                        onChange={onChangePass}
                        invalid={validpass}
                      />
                      {passError ? (
                        <FormFeedback>{passError}</FormFeedback>
                      ) : null}
                    </InputGroup>

                    {/* <Switch
                        value={this.state.rememberMe}
                        onValueChange={(value) =>
                          this.toggleRememberMe(value)
                        }
                        />
                        <Text>Remember Me</Text> */}

                    <Row>
                      <Col xs="6">
                        <Button
                          color="primary"
                          className="px-4"
                          style={{
                            boxShadow: "0px 2px 1px rgba(0, 0, 0, 0.12)",
                          }}
                        >
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button
                          color="link"
                          className="px-0"
                          onClick={onRemember}
                        ></Button>
                        <Label check style={{ color: "#555" }}>
                          <Input
                            type="checkbox"
                            checked={remember}
                            onChange={onRemember}
                          />{" "}
                          Remember Me
                        </Label>
                      </Col>
                    </Row>
                  </Form>
                  <ToastContainer />
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
