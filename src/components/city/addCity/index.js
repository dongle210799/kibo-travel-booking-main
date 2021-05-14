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
import { notifytoast } from "../../../helper/index";
import "react-toastify/dist/ReactToastify.css";

import _ from "lodash";
import {
  onDetailNurse,
  onCreateNurse,
  onUpDateNurse,
} from "../../../apis/city";
function Admin(props) {
  const [detail, setDetail] = useState();
  const [nurse, setNurse] = useState();
  const [nurseError, setNurseError] = useState();
  const [validNurse, setValidNurse] = useState();
  const { params } = props.match;
  useEffect(() => {
    if (_.isEmpty(params)) return;
    detailNurse();
  }, []);
  const detailNurse = async () => {
    try {
      var res = await onDetailNurse(params.id);
      console.log(res);
      setDetail(res.data);
      setNurse(res.data.nurseName);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let nurseError = "";
    if (!nurse) {
      nurseError = "Nurse is not blank";
      setValidNurse(true);
    }
    if (nurseError) {
      setNurseError(nurseError);
      return false;
    }
    return true;
  }
  function onChangeNurseName(e) {
    setNurse(e.target.value);
    setValidNurse(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      nurseName: nurse,
    };
    if (isValid) {
      return onCreateNurse(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/nurses");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          err.response.data.message.map((message) => {
            notifytoast("error", message);
          });
        });
    }
  }
  function onDetail(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      nurseName: nurse,
      status: true,
    };
    if (isValid) {
      return onUpDateNurse(params.id, body)
        .then((res) => {
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            props.history.push("/admin/nurses");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          err.response.data.message.map((message) => {
            notifytoast("error", message);
          });
        });
    }
  }

  return (
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="">
            <Form onSubmit={params.id ? onDetail : onSubmit}>
              <h1>{params.id ? "Nurse Detail" : "Create Nurse"}</h1>
              <FormGroup className="mb-3">
                <Label for="Email">Nurse Name</Label>
                <Input
                  type="text"
                  placeholder="Nurse Name"
                  autoComplete="roomname"
                  value={nurse}
                  maxlength="30"
                  onChange={onChangeNurseName}
                  invalid={validNurse}
                />
                {nurseError ? <FormFeedback>{nurseError}</FormFeedback> : null}
              </FormGroup>
              <Button color="success">Submit</Button>
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Admin;
