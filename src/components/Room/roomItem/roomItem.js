import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import ModalApp from "../../Modals/modals";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import { onDetailRoom, onUpDateRoom } from "../../../apis/rooms";
import _ from "lodash";
function RoomItem(props) {
  const [room, setRoom] = useState();
  const [roomError, setRoomError] = useState();
  const [validRoom, setValidRoom] = useState(false);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idRoom, setIdRoom] = useState(null);

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
    detailRoom();
  }, [idRoom]);
  const detailRoom = async () => {
    try {
      var res = await onDetailRoom(idRoom);
      setRoom(res.data.roomName);
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
    setIdRoom(id);
    setModals3(!modals3);
  }
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
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      roomName: room,
      status: true,
    };
    if (isValid) {
      return onUpDateRoom(item.id, body)
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

  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.roomName}</td>
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
              room?
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
          className="btn btn-warning mr-2 ml-2 mb-2 mt-2"
          onClick={() => onToggleModalsEdit(item.id)}
        >
          <span className="fa fa-pencil "></span>
        </button>
        <ModalApp
          modal={modals3}
          children={
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
          }
          onSubmit={onEdit}
          title={"Room Detail"}
          toggleModal={onToggleModalsEdit}
          showModalFooter={onToggleModalsEdit}
        />
        <button
          type="button"
          className="btn btn-danger "
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
              Do you want to delete this room?
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
        <ToastContainer />
      </td>
    </tr>
  );
}

export default RoomItem;
