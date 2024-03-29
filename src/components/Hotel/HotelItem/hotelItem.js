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
  CustomInput,
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import ModalApp from "../../Modals/modals";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import {
  onDetailRoom,
  onUpDateRoom,
  onShowcity,
  onUploadImage,
} from "../../../apis/hotels";
import _ from "lodash";
function RoomItem(props) {
  const [room, setRoom] = useState();
  const [price, setPrice] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [image, setImage] = useState();
  const [imageId, setImageId] = useState();
  const [getCity, setGetCity] = useState();
  const [description, setDescription] = useState();
  const [roomError, setRoomError] = useState();
  const [validRoom, setValidRoom] = useState(false);
  const [priceError, setPriceError] = useState();
  const [validPrice, setValidPrice] = useState(false);
  const [cityError, setCityError] = useState();
  const [validCity, setValidCity] = useState(false);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [modals5, setModals5] = useState(false);
  const [idRoom, setIdRoom] = useState(null);
  const [file, setFile] = useState(null);

  var {
    item,
    index,
    currentPage,
    pageSize,
    onChangeStatus,
    onDelete,
    onEdit2,
  } = props;
  console.log(item);
  useEffect(() => {
    detailRoom();
    GetCity();
  }, [idRoom]);
  useEffect(() => {
    onUpdateImage();
  }, [file]);
  const detailRoom = async () => {
    try {
      var res = await onDetailRoom(idRoom);
      setRoom(res.data.hotelName);
      setPrice(res.data.price);
      setCityId(res.data.__cities__.id);
      setImage(res.data.areaMedias[0].filePath);
      setImageId(res.data.areaMedias[0].id);
      setCity(res.data.__cities__.cityName);
      setDescription(res.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onToggleModalsEdit(id) {
    setIdRoom(id);
    setModals3(!modals3);
  }
  const GetCity = async () => {
    try {
      var bed = await onShowcity();
      setGetCity(bed.data.items);
    } catch (error) {
      console.log(error);
    }
  };
  function validate() {
    let roomError = "";
    let priceError = "";
    let cityError = "";
    if (!room) {
      roomError = "Room is not blank";
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
  function onChangeDescription(e) {
    setDescription(e.target.value);
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
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      hotelName: room,
      price: price,
      imageId: [imageId],
      cityId: cityId,
      description: description,
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
  function onUpdateImage(e) {
    const formData = new FormData();
    formData.append("files", image);
    return onUploadImage(formData)
      .then((res) => {
        setImageId(res.data[0].id);
      })
      .catch((err) => {});
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
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.hotelName}</td>
      <td>{item.price}</td>
      <td>{item.__cities__.cityName}</td>
      <td>
        {" "}
        {item.areaMedias[0] ? (
          <div>
            <img
              onClick={() => setModals5(true)}
              id="frame"
              alt="your image"
              src={item.areaMedias[0].filePath}
              name="aboutme"
              border="0"
              className="image-table"
            />
            <ModalApp
              modal={modals5}
              toggleModal={() => setModals5(false)}
              children={
                <img
                  onClick={() => setModals5(true)}
                  id="frame"
                  alt="your image"
                  src={item.areaMedias[0].filePath}
                  name="aboutme"
                  border="0"
                  className="image-modal"
                />
              }
            />
          </div>
        ) : (
          ""
        )}
      </td>
      <td>{item.rates}</td>
      <td>{item.__cities__.__countries__.countryName}</td>
      <td>{item.description}</td>
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
            <FormGroup>
              <FormGroup className="mb-3">
                <Label for="Email">Hotel Name</Label>
                <Input
                  type="text"
                  placeholder="Hotel Name"
                  autoComplete="roomname"
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

                  {elmCity}
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
              </FormGroup>
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
              Do you want to delete this hotel?
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
