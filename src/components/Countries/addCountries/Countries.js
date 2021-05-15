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
import { onDetailBeds, onCreateBeds } from "../../../apis/countries";
import { onUploadImage } from "../../../apis/hotels";
function Admin(props) {
  const [bedName, setBedName] = useState(null);
  const [bedError, setBedError] = useState(null);
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [validBed, setValidBed] = useState(false);
  const [description, setDescription] = useState();

  const [file, setFile] = useState(null);
  const { params } = props.match;
  useEffect(() => {
    onUpdateAvatars();
  }, [image]);

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

  function onChangeBedName(e) {
    setBedName(e.target.value);
    setValidBed(false);
  }

  async function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      countryName: bedName,
      imageId: [imageId],
      description: description,
    };
    if (isValid) {
      return onCreateBeds(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push("/admin/countries");
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          notifytoast("error", err.response.data.message);
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
  return (
    <Row>
      <Col xl="6" md="6" xs="12" className="mx-auto">
        <Card className="mx-4">
          <CardBody className="p-4">
            <Form onSubmit={onSubmit}>
              <h1>Create Country</h1>
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
              <FormGroup className="mb-3">
                <Label>Description</Label>
                <Input
                  type="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={onChangeDescription}
                  // invalid={validPatient}
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

export default Admin;
