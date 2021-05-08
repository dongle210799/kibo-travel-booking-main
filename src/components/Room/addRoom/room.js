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
import { onDetailRoom, onCreateRoom, onUpDateRoom } from "../../../apis/rooms";
function Admin(props) {
  const [detail, setDetail] = useState();
  const [room, setRoom] = useState();
  const [roomError, setRoomError] = useState();
  const [validRoom, setValidRoom] = useState(false);
  const { params } = props.match;
  useEffect(() => {
    console.log(props);

    if (_.isEmpty(params)) return;
    detailRoom();
  }, []);
  const detailRoom = async () => {
    try {
      var res = await onDetailRoom(params.id);
      setDetail(res.data);
      setRoom(res.data.roomName);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let roomError = "";
    if (!room) {
      roomError = "Room is not blank";
      setValidRoom(true);
    }
    if (roomError) {
      setRoomError(roomError);
      return false;
    }
    return true;
  }
  function onChangeRoomName(e) {
    setRoom(e.target.value);
    setValidRoom(false);
  }

  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      roomName: room,
    };
    if (isValid) {
      return onCreateRoom(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push(`/admin/rooms${props.location.search}`);
          }, 1000);
        })
        .catch((err) => {
          notifytoast("error", "Room name is already existed");
        });
    }
  }
  function onDetail(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      roomName: room,
      status: true,
    };
    if (isValid) {
      return onUpDateRoom(params.id, body)
        .then((res) => {
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            props.history.push("/admin/rooms");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", err.response.data.message);
        });
    }
  }

  return (
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-8">
            <Form onSubmit={params.id ? onDetail : onSubmit}>
              <h1>{params.id ? "Room Detail" : "Create Room"}</h1>
              <FormGroup className="mb-3">
                <Label for="Email">Room Name</Label>
                <Input
                  type="text"
                  placeholder="Room Name"
                  autoComplete="roomname"
                  value={room}
                  onChange={onChangeRoomName}
                  invalid={validRoom}
                />
                {roomError ? <FormFeedback>{roomError}</FormFeedback> : null}
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
