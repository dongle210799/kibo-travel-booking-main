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

import _, { isBuffer, uniqueId } from "lodash";
import { onUploadImage, onCreateRoom, onShowcity } from "../../../apis/hotels";
function Admin(props) {
  const [detail, setDetail] = useState();
  const [room, setRoom] = useState();
  const [price, setPrice] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [getCity, setGetCity] = useState();
  const [roomError, setRoomError] = useState();
  const [validRoom, setValidRoom] = useState(false);
  const [priceError, setPriceError] = useState();
  const [validPrice, setValidPrice] = useState(false);
  const [cityError, setCityError] = useState();
  const [validCity, setValidCity] = useState(false);
  const [file, setFile] = useState(null);
  const { params } = props.match;
  useEffect(() => {
    GetCity();
  }, []);
  useEffect(() => {
    onUpdateAvatars();
  }, [image]);
  function validate() {
    let roomError = "";
    let priceError = "";
    let cityError = "";
    if (!room) {
      roomError = "Hotel Name is not blank";
      setValidRoom(true);
    }
    if (!price) {
      roomError = "Price is not blank";
      setValidPrice(true);
    }
    if (!cityId) {
      cityError = "City is not blank";
      setValidCity(true);
    }
    if (roomError || priceError || cityError) {
      setRoomError(roomError);
      setPriceError(priceError);
      setCityError(cityError);
      return false;
    }
    return true;
  }
  function onChangeRoomName(e) {
    setRoom(e.target.value);
    setValidRoom(false);
  }
  function onChangePrice(e) {
    setPrice(e.target.value);
    setValidRoom(false);
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
  function onSubmit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      hotelName: room,
      price: price,
      imageId: [`${imageId}`],
      cityId: cityId,
    };
    if (isValid) {
      return onCreateRoom(body)
        .then((res) => {
          notifytoast("success", "Created successfully");
          setTimeout(() => {
            props.history.push(`/admin/tours`);
          }, 1000);
        })
        .catch((err) => {
          notifytoast("error", "Hotel name is already existed");
        });
    }
  }
  var elmCity = Array.isArray(getCity)
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
              <h1>Create Hotel</h1>
              <FormGroup className="mb-3">
                <Label for="Email">Hotel Name</Label>
                <Input
                  type="text"
                  placeholder="Hotel Name"
                  value={room}
                  onChange={onChangeRoomName}
                  invalid={validRoom}
                />
                {roomError ? <FormFeedback>{roomError}</FormFeedback> : null}
              </FormGroup>
              <FormGroup className="mb-3">
                <Label for="Email">Price</Label>
                <Input
                  type="text"
                  placeholder="Price"
                  // autoComplete="roomname"
                  value={price}
                  onChange={onChangePrice}
                  invalid={validPrice}
                />
                {priceError ? <FormFeedback>{priceError}</FormFeedback> : null}
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

                  {elmCity}
                </CustomInput>
                {cityError ? <FormFeedback>{cityError}</FormFeedback> : null}
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
