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
  onDetailNurse,
  onCreateNurse,
  onUpDateNurse,
  onShowcountry,
} from "../../../apis/city";
import { onUploadImage } from "../../../apis/hotels";
function Admin(props) {
  const [detail, setDetail] = useState();
  const [nurse, setNurse] = useState();
  const [imageId, setImageId] = useState();
  const [countryId, setCountryId] = useState();
  const [getCountry, setGetCountry] = useState();
  const [nurseError, setNurseError] = useState();
  const [validNurse, setValidNurse] = useState();
  const [countryError, setCountryError] = useState();
  const [validCountry, setValidCountry] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState();
  const { params } = props.match;
  useEffect(() => {
    GetCity();
  }, []);
  useEffect(() => {
    onUpdateAvatars();
  }, [image]);
  const GetCity = async () => {
    try {
      var country = await onShowcountry();
      setGetCountry(country.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let nurseError = "";
    let countryError = "";

    if (!nurse) {
      nurseError = "City Name is not blank";
      setValidNurse(true);
    }
    if (!countryId) {
      countryError = "Country is not blank";
      setValidCountry(true);
    }
    if (nurseError || countryError) {
      setNurseError(nurseError);
      setCountryError(countryError);
      return false;
    }
    return true;
  }
  function onChangeNurseName(e) {
    setNurse(e.target.value);
    setValidNurse(false);
  }
  function onChangeCountryId(e) {
    setCountryId(e.target.value);
    setValidCountry(false);
  }
  async function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      cityName: nurse,
      imageId: [imageId],
      countryId: countryId,
    };
    if (isValid) {
      return onCreateNurse(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/city");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", "City name is already existed");
        });
    }
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
  var elmCountry = Array.isArray(getCountry)
    ? getCountry.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            {option.countryName}
          </option>
        );
      })
    : "";
  return (
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="">
            <Form onSubmit={onSubmit}>
              <h1>Create City</h1>
              <FormGroup className="mb-3">
                <Label for="Email">City Name</Label>
                <Input
                  type="text"
                  placeholder="City Name"
                  autoComplete="roomname"
                  value={nurse}
                  maxlength="30"
                  onChange={onChangeNurseName}
                  invalid={validNurse}
                />
                {nurseError ? <FormFeedback>{nurseError}</FormFeedback> : null}
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
                <Label>Country</Label>
                <CustomInput
                  name="select"
                  id="select"
                  type="select"
                  onChange={onChangeCountryId}
                  value={countryId}
                  invalid={validCountry}
                  required
                >
                  <option selected>choose a Country</option>

                  {elmCountry}
                </CustomInput>
                {countryError ? (
                  <FormFeedback>{countryError}</FormFeedback>
                ) : null}
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
