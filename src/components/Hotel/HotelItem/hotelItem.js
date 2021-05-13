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
import { onDetailRoom, onUpDateRoom, onShowcity } from "../../../apis/rooms";
import _ from "lodash";
function RoomItem(props) {
  const [room, setRoom] = useState();
  const [price, setPrice] = useState();
  const [cityId, setCityId] = useState();
  const [city, setCity] = useState();
  const [getCity, setGetCity] = useState();
  const [roomError, setRoomError] = useState();
  const [validRoom, setValidRoom] = useState(false);
  const [priceError, setPriceError] = useState();
  const [validPrice, setValidPrice] = useState(false);
  const [cityError, setCityError] = useState();
  const [validCity, setValidCity] = useState(false);
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [idRoom, setIdRoom] = useState(null);

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
  const detailRoom = async () => {
    try {
      var res = await onDetailRoom(idRoom);
      setRoom(res.data.hotelName);
      setPrice(res.data.price);
      setCityId(res.data.__cities__.id);
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
  function onChangePrice(e) {
    setPrice(e.target.value);
    setValidRoom(false);
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
      imageId: ["string"],
      cityId: cityId,
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
      <td>{item.rates}</td>
      <td>{item.__cities__.__countries__.countryName}</td>
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
                <Label for="Email">Room Name</Label>
                <Input
                  type="text"
                  placeholder="Room Name"
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
                  <option selected>choose a Bed</option>

                  {elmCity}
                </CustomInput>
                {cityError ? <FormFeedback>{cityError}</FormFeedback> : null}
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
              Do you want to delete this room?
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
