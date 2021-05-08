import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormGroup,
  FormFeedback,
  CustomInput,
  Label,
  Form,
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import _ from "lodash";
import ModalApp from "../../Modals/modals";
import {
  onDetailPatient,
  onUpDatePatient,
  onShowBed,
  onShowNurse,
  onUpDateStatus,
} from "../../../apis/patients";
function PatientItem(props) {
  const [patient, setPatient] = useState(null);
  const [chart, setChart] = useState(null);
  const [getBed, setGetBed] = useState(null);
  const [status, setStatus] = useState(null);
  const [bed, setBed] = useState(null);
  const [bedId, setBedId] = useState(null);
  const [getNurse, setGetNurse] = useState(null);
  const [nurseId, setNurseId] = useState(null);
  const [patientError, setPatientError] = useState(null);
  const [chartNumberError, setChartNumberError] = useState(null);
  const [bedError, setBedError] = useState(null);
  const [nurseError, setNurseError] = useState(null);
  const [validPatient, setValidPatient] = useState(false);
  const [validChart, setValidChart] = useState(false);
  const [validBed, setValidBed] = useState(false);
  const [validNurse, setValidNurse] = useState(false);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idPatient, setIdPatient] = useState(null);

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
    detailPatient();
    GetBed();
    GetNurse();
  }, [idPatient]);
  const detailPatient = async () => {
    try {
      var res = await onDetailPatient(idPatient);
      setChart(res.data.chartNumber);
      setBedId(res.data.bedId);
      setNurseId(res.data.nurseId);
      setPatient(res.data.patientName);
      setBed(res.data.bed.bedName);
      setStatus(res.data.status);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let patientError = "";
    let bedError = "";
    let nurseError = "";
    if (!patient) {
      patientError = "Patient is not blank";
      setValidPatient(true);
    }
    if (!bedId) {
      bedError = "Bed is not blank";
      setValidBed(true);
    }
    if (!nurseId) {
      nurseError = "Nurse is not blank";
      setValidNurse(true);
    }
    if (patientError || bedError || nurseError) {
      setPatientError(patientError);
      setBedError(bedError);
      setNurseError(nurseError);
      return false;
    }
    return true;
  }
  const GetBed = async () => {
    try {
      var bed = await onShowBed();
      setGetBed(bed.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const GetNurse = async () => {
    try {
      var nurse = await onShowNurse();
      setGetNurse(nurse.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let patientError = "";
    let bedError = "";
    let nurseError = "";
    if (!patient) {
      patientError = "Patient is not blank";
      setValidPatient(true);
    }
    if (!bedId) {
      bedError = "Bed is not blank";
      setValidBed(true);
    }
    if (!nurseId) {
      nurseError = "Nurse is not blank";
      setValidNurse(true);
    }
    if (patientError || bedError || nurseError) {
      setPatientError(patientError);
      setBedError(bedError);
      setNurseError(nurseError);
      return false;
    }
    return true;
  }
  function onChangePatientName(e) {
    setPatient(e.target.value);
    setValidPatient(false);
  }
  function onChangeChartNumber(e) {
    if (e.target.value.length === 30) {
      return false;
    }
    (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault();
    (e.key === "e" || e.key === "," || e.key === "-" || e.key === "+") &&
      e.preventDefault();
    setChart(e.target.value);
    setValidChart(false);
  }
  function onChangeBedId(e) {
    setBedId(e.target.value);
    setValidBed(false);
  }
  function onChangeNurseId(e) {
    setNurseId(e.target.value);
    setValidNurse(false);
  }

  function onToggleModals(e) {
    setModals(!modals);
  }
  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onToggleModalsEdit(item) {
    setIdPatient(item.id);
    setModals3(!modals3);
  }
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      patientName: patient,
      chartNumber: chart,
      bedId: bedId,
      nurseId: nurseId,
      status: true,
    };
    if (isValid) {
      return onUpDatePatient(idPatient, body)
        .then((res) => {
          !status && onUpDateStatus(idPatient);
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

  var elmBed = Array.isArray(getBed)
    ? getBed.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            {option.bedName}
          </option>
        );
      })
    : "";
  var elmNurse = Array.isArray(getNurse)
    ? getNurse.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            {option.nurseName}
          </option>
        );
      })
    : "";
  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.patientName}</td>
      <td>{item.chartNumber}</td>
      <td>{item.bed ? item.bed.bedName : ""}</td>
      <td>{item.nurse ? item.nurse.nurseName : ""}</td>
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
              patient?
            </p>
          </ModalBody>
          <ModalFooter className="modals-footer">
            <Button
              color="primary"
              onClick={() => {
                onToggleModals();
                if (!item.status) {
                  onToggleModalsEdit(item);
                } else {
                  onChangeStatus(item);
                }
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
          onClick={() => onToggleModalsEdit(item)}
        >
          <span className="fa fa-pencil "></span>
        </button>
        <ModalApp
          modal={modals3}
          children={
            <Form>
              <FormGroup className="mb-3">
                <Label>Patient Name</Label>
                <Input
                  type="text"
                  placeholder="Patient Name"
                  autoComplete="patientname"
                  value={patient}
                  maxLength="50"
                  onChange={onChangePatientName}
                  invalid={validPatient}
                />
                {patientError ? (
                  <FormFeedback>{patientError}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Chart Number</Label>
                <Input
                  type="number"
                  placeholder="Chart number"
                  autoComplete="chart"
                  value={chart}
                  onKeyDown={onChangeChartNumber}
                  onChange={onChangeChartNumber}
                  invalid={validChart}
                />
                {chartNumberError ? (
                  <FormFeedback>{chartNumberError}</FormFeedback>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label>Bed Number</Label>
                <CustomInput
                  name="select"
                  id="select"
                  type="select"
                  onChange={onChangeBedId}
                  value={bedId}
                  invalid={validBed}
                  required
                >
                  {bed ? (
                    <option selected>{bed}</option>
                  ) : (
                    <option selected>choose a Bed</option>
                  )}
                  {elmBed}
                </CustomInput>
                {bedError ? <FormFeedback>{bedError}</FormFeedback> : null}
              </FormGroup>

              <FormGroup className="mb-3">
                <Label>Nurse Name</Label>
                <CustomInput
                  type="select"
                  name="select"
                  onChange={onChangeNurseId}
                  value={nurseId}
                  invalid={validNurse}
                >
                  <option selected>choose a Nurse</option>
                  {elmNurse}
                </CustomInput>
                {nurseError ? <FormFeedback>{nurseError}</FormFeedback> : null}
              </FormGroup>
            </Form>
          }
          onSubmit={onEdit}
          title={"Patient Detail"}
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
              Do you want to delete this patient?
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

export default PatientItem;
