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
  CustomInput,
} from "reactstrap";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import "react-toastify/dist/ReactToastify.css";

import _ from "lodash";
import {
  onDetailPatient,
  onCreatePatient,
  onUpDatePatient,
  onShowBed,
  onShowNurse,
  onUpDateStatus,
} from "../../../apis/patients";
function Patient(props) {
  const [detail, setDetail] = useState();
  const [patient, setPatient] = useState();
  const [chart, setChart] = useState();
  const [getBed, setGetBed] = useState();
  const [bed, setBed] = useState();
  const [bedId, setBedId] = useState();
  const [getNurse, setGetNurse] = useState();
  const [nurseId, setNurseId] = useState();
  const [patientError, setPatientError] = useState();
  const [chartNumberError, setChartNumberError] = useState();
  const [bedError, setBedError] = useState();
  const [nurseError, setNurseError] = useState();
  const [validPatient, setValidPatient] = useState(false);
  const [validChart, setValidChart] = useState(false);
  const [validBed, setValidBed] = useState(false);
  const [validNurse, setValidNurse] = useState(false);
  const { params } = props.match;
  useEffect(() => {
    if (_.isEmpty(params)) {
      GetBed();
      GetNurse();
    } else {
      detailPatient();
      GetBed();
      GetNurse();
    }
  }, []);
  const detailPatient = async () => {
    try {
      var res = await onDetailPatient(params.id);
      setDetail(res.data);
      setChart(res.data.chartNumber);
      setBedId(res.data.bedId);
      setNurseId(res.data.nurseId);
      setPatient(res.data.patientName);
      setBed(res.data.bed.bedName);
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
  function onChangePatientName(e) {
    setPatient(e.target.value);
    setValidPatient(false);
  }
  function onChangeChartNumber(e) {
    if (e.target.value.length == 30) {
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

  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      patientName: patient,
      chartNumber: chart,
      bedId: bedId,
      nurseId: nurseId,
    };
    if (isValid) {
      return onCreatePatient(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/patients");
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
      patientName: patient,
      chartNumber: chart,
      bedId: bedId,
      nurseId: nurseId,
      status: true,
    };
    if (isValid) {
      return onUpDatePatient(params.id, body)
        .then((res) => {
          onUpDateStatus(params.id);
          notifytoast("success", "Saved successfully");
          setTimeout(() => {
            props.history.push("/admin/patients");
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
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-8">
            <Form onSubmit={params.id ? onDetail : onSubmit}>
              <h1>{params.id ? "Patient Detail" : "Create Patient"}</h1>
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
                  onKeyDown={onChangeChartNumber}
                  placeholder="Chart number"
                  autoComplete="chart"
                  value={chart}
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
                    <option selected>{detail.bed.bedName}</option>
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
              <Button color="success">Submit</Button>
            </Form>
            <ToastContainer />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}

export default Patient;
