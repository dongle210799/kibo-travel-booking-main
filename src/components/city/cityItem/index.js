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
import { onDetailNurse, onUpDateNurse } from "../../../apis/nurses";
import _ from "lodash";
function NurseItem(props) {
  const [nurse, setNurse] = useState();
  const [nurseError, setNurseError] = useState();
  const [validNurse, setValidNurse] = useState();
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idNurse, setIdNurse] = useState(null);
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
    detailNurse();
  }, [idNurse]);
  const detailNurse = async () => {
    try {
      var res = await onDetailNurse(idNurse);
      setNurse(res.data.nurseName);
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
    setIdNurse(id);
    setModals3(!modals3);
  }
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
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      nurseName: nurse,
      status: true,
    };
    if (isValid) {
      return onUpDateNurse(idNurse, body)
        .then((res) => {
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            setModals3(!modals3);
            onEdit2();
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
  const patients = item.patients;
  var listPatients = Array.isArray(patients)
    ? patients.map((option, i) => {
        return option.patientName;
      })
    : "";

  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.nurseName}</td>
      <td>{listPatients + "  "}</td>
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
              nurse?
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
              <Label for="Email">Nurse Name</Label>
              <Input
                type="text"
                placeholder="Nurse Name"
                autoComplete="nursename"
                value={nurse}
                maxlength="30"
                onChange={onChangeNurseName}
                invalid={validNurse}
              />
              {nurseError ? <FormFeedback>{nurseError}</FormFeedback> : null}
            </FormGroup>
          }
          onSubmit={onEdit}
          title={"Nurse Detail"}
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
              Do you want to delete this nurse?
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

export default NurseItem;
