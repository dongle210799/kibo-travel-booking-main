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
  onShowcity,
  onUpDatePatient,
} from "../../../apis/tour";
import { onUploadImage } from "../../../apis/hotels";
function PatientItem(props) {
  const [Id, setId] = useState();
  const [patient, setPatient] = useState();
  const [chart, setChart] = useState();
  const [getCity, setGetCity] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [description, setDescription] = useState();
  const [patientError, setPatientError] = useState();
  const [chartNumberError, setChartNumberError] = useState();
  const [cityError, setCityError] = useState();
  const [validPatient, setValidPatient] = useState(false);
  const [validChart, setValidChart] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idPatient, setIdPatient] = useState(null);

  var { item, index, currentPage, pageSize, onDelete, onEdit2 } = props;
  useEffect(() => {
    detailPatient();
    GetCity();
  }, [idPatient]);
  useEffect(() => {
    onUpdateAvatars();
  }, [image]);
  const detailPatient = async () => {
    try {
      var res = await onDetailPatient(idPatient);
      setId(res.data.id);
      setPatient(res.data.areaName);
      setChart(res.data.price);
      setDescription(res.data.description);
      setCityId(res.data.cityId);
      setImage(res.data.areaMedias[0].filePath);
      setCity(res.data.__cities__.cityName);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let patientError = "";
    let cityError = "";

    if (!patient) {
      patientError = "Tour Name is not blank";
      setValidPatient(true);
    }
    if (!cityId) {
      cityError = "City is not blank";
      setValidCity(true);
    }

    if (patientError || cityError) {
      setPatientError(patientError);
      setCityError(cityError);
      return false;
    }
    return true;
  }
  const GetCity = async () => {
    try {
      var bed = await onShowcity();
      setGetCity(bed.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  function onUpdateAvatars(e) {
    const formData = new FormData();
    formData.append("files", image);
    return onUploadImage(formData)
      .then((res) => {
        setImageId(res.data[0].id);
        console.log(res.data[0].id);
      })
      .catch((err) => {});
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
  function onChangePatientName(e) {
    setPatient(e.target.value);
    setValidPatient(false);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeCityId(e) {
    setCityId(e.target.value);
    setValidCity(false);
  }
  async function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
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
      areaName: patient,
      price: chart,
      description: description,
      cityId: cityId,
      imageId: [`${imageId}`],
    };
    if (isValid) {
      return onUpDatePatient(idPatient, body)
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

  var elmBed = Array.isArray(getCity)
    ? getCity.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            {option.cityName}
          </option>
        );
      })
    : "";

  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.areaName}</td>
      <td>{item.price}</td>
      <td>{item.__cities__.cityName}</td>
      <td>{item.createdAt}</td>
      <td>{item.__cities__.__countries__.countryName}</td>
      <td>
        <p
          dangerouslySetInnerHTML={{ __html: item.description }}
          className="description"
        ></p>
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
                <Label>Tour Name</Label>
                <Input
                  type="text"
                  placeholder="Tour Name"
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
                <Label>Price</Label>
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
              <FormGroup className="mb-3">
                <Label for="Email">Image</Label>
                <CustomInput
                  type="file"
                  label={image || "choose an image file"}
                  onChange={onChangeImage}
                />

                {/* {priceError ? <FormFeedback>{priceError}</FormFeedback> : null} */}
              </FormGroup>
              <img
                id="frame"
                alt="your image"
                src={file ? file : image}
                name="aboutme"
                border="0"
                className="image-upload"
              />
              <FormGroup>
                <Label>City</Label>
                <CustomInput
                  name="select"
                  id="select"
                  type="select"
                  onChange={onChangeCityId}
                  value={cityId}
                  invalid={validCity}
                  required
                >
                  {city ? (
                    <option value={cityId}>{city}</option>
                  ) : (
                    <option selected>choose a City</option>
                  )}

                  {elmBed}
                </CustomInput>
                {cityError ? <FormFeedback>{cityError}</FormFeedback> : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Description</Label>
                <Input
                  type="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={onChangeDescription}
                  // invalid={validPatient}
                />
                {patientError ? (
                  <FormFeedback>{patientError}</FormFeedback>
                ) : null}
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
              Do you want to delete this tour?
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
