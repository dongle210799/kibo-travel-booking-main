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
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import _ from "lodash";
import { onCreatePatient, onShowcity } from "../../../apis/tour";
import { onUploadImage } from "../../../apis/hotels";
function Patient(props) {
  const [patient, setPatient] = useState();
  const [chart, setChart] = useState();
  const [getCity, setGetCity] = useState();
  const [city, setCity] = useState();
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [cityId, setCityId] = useState();
  const [description, setDescription] = useState();
  const [patientError, setPatientError] = useState();
  const [chartNumberError, setChartNumberError] = useState();
  const [cityError, setCityError] = useState();
  const [validPatient, setValidPatient] = useState(false);
  const [validChart, setValidChart] = useState(false);
  const [validCity, setValidCity] = useState(false);
  const { params } = props.match;
  console.log(description);

  useEffect(() => {
    GetCity();
  }, []);
  useEffect(() => {
    onUpdateAvatars();
  }, [image]);
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
      var city = await onShowcity();
      setGetCity(city.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  function onChangePatientName(e) {
    setPatient(e.target.value);
    setValidPatient(false);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeChartNumber(e) {
    (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault();
    (e.key === "e" || e.key === "," || e.key === "-" || e.key === "+") &&
      e.preventDefault();
    setChart(e.target.value);
    setValidChart(false);
  }
  async function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }
  function onChangeCityId(e) {
    setCityId(e.target.value);
    setValidCity(false);
  }
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
  function onSubmit(e) {
    console.log(description);
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
      return onCreatePatient(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/tours");
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
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-8">
            <Form onSubmit={onSubmit}>
              <h1>Create Tour</h1>
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
                src={file}
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
                  <option selected>choose a City</option>

                  {elmBed}
                </CustomInput>
                {cityError ? <FormFeedback>{cityError}</FormFeedback> : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Description</Label>
                <CKEditor
                  editor={ClassicEditor}
                  data={description}
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onBlur={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                  onFocus={(event, editor) => {
                    const data = editor.getData();
                    setDescription(data);
                  }}
                />
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
