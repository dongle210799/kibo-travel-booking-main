import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import "react-toastify/dist/ReactToastify.css";
import ModalApp from "../../Modals/modals";
import _ from "lodash";
import { onDetailBeds, onUpDateBeds, onShowRoom } from "../../../apis/beds";
function BedItem(props) {
  const [bedName, setBedName] = useState(null);
  const [bedError, setBedError] = useState(null);
  const [validBed, setValidBed] = useState(false);
  const [getRoom, setGetRoom] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idBed, setIdBed] = useState(null);
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
    detailBed();
    GetRoom();
  }, [idBed]);
  const detailBed = async () => {
    try {
      var res = await onDetailBeds(idBed);
      setBedName(res.data.countryName);
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
  function onToggleModalsEdit(id) {
    setIdBed(id);
    setModals3(!modals3);
  }
  function onChangeBedName(e) {
    setBedName(e.target.value);
    setValidBed(false);
  }
  function onChangeRoomId(e) {
    setRoomId(e.target.value);
  }

  function onToggleModals(e) {
    setModals(!modals);
  }
  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      countryName: bedName,
      imageId: ["string"],
    };
    if (isValid) {
      return onUpDateBeds(idBed, body)
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
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.countryName}</td>
      <td>{item.room ? item.room.roomName : ""}</td>
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
              <FormGroup className="mb-3">
                <Label>Country Name</Label>
                <Input
                  type="text"
                  placeholder="Country Name"
                  value={bedName}
                  onChange={onChangeBedName}
                  invalid={validBed}
                />
                {bedError ? <FormFeedback>{bedError}</FormFeedback> : null}
              </FormGroup>

              <FormGroup className="mb-3">
                <Label>Image</Label>
                <Input
                  type="file"
                  name="select"
                  onChange={onChangeRoomId}
                  value={roomId}
                ></Input>
              </FormGroup>
            </Form>
          }
          onSubmit={onEdit}
          title={"Bed Detail"}
          toggleModal={onToggleModalsEdit}
          showModalFooter={onToggleModalsEdit}
        />
        <button
          type="button"
          className="btn btn-danger mb-2 mt-2 "
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
              Do you want to delete this bed?
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

export default BedItem;
