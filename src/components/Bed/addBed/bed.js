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
  onDetailBeds,
  onCreateBeds,
  onUpDateBeds,
  onShowRoom,
} from "../../../apis/beds";
function Admin(props) {
  const [detail, setDetail] = useState(null);
  const [bedName, setBedName] = useState(null);
  const [bedError, setBedError] = useState(null);
  const [validBed, setValidBed] = useState(false);
  const [getRoom, setGetRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const { params } = props.match;
  useEffect(() => {
    if (_.isEmpty(params)) {
      GetRoom();
    } else {
      detailBed();
      GetRoom();
    }
  }, []);
  const detailBed = async () => {
    try {
      var res = await onDetailBeds(params.id);
      setDetail(res.data);
      setRoomId(res.data.roomId);
      setBedName(res.data.bedName);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let bedError = "";
    if (!bedName) {
      bedError = "Bed is not blank";
      setValidBed(true);
    }
    if (bedError) {
      setBedError(bedError);
      return false;
    }
    return true;
  }
  const GetRoom = async () => {
    try {
      var room = await onShowRoom();
      setGetRoom(room.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  function onChangeBedName(e) {
    setBedName(e.target.value);
    setValidBed(false);
  }
  function onChangeRoomId(e) {
    setRoomId(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      bedName: bedName,
      roomId: roomId,
    };
    if (isValid) {
      return onCreateBeds(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/beds");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", err.response.data.message);
        });
    }
  }
  function onDetail(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      bedName: bedName,
      roomId: roomId,
      status: true,
    };
    if (isValid) {
      return onUpDateBeds(params.id, body)
        .then((res) => {
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            props.history.push("/admin/beds");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", err.response.data.message);
        });
    }
  }
  var elOption = Array.isArray(getRoom)
    ? getRoom.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            {option.roomName}
          </option>
        );
      })
    : "";
  return (
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-4">
            <Form onSubmit={params.id ? onDetail : onSubmit}>
              <h1>{params.id ? "Bed Detail" : "Create Bed"}</h1>
              <FormGroup className="mb-3">
                <Label>Bed Number</Label>
                <Input
                  type="text"
                  placeholder="Bed number"
                  value={bedName}
                  onChange={onChangeBedName}
                  invalid={validBed}
                />
                {bedError ? <FormFeedback>{bedError}</FormFeedback> : null}
              </FormGroup>

              <FormGroup className="mb-3">
                <Label>Room Name</Label>
                <Input
                  type="select"
                  name="select"
                  onChange={onChangeRoomId}
                  value={roomId}
                >
                  <option selected>choose a room</option>
                  {elOption}
                </Input>
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
