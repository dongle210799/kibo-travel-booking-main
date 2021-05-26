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
import { formatDate, notifytoast } from "../../../helper/index";
import {
  onDetailNurse,
  onShowcountry,
  onUpDateNurse,
} from "../../../apis/city";
import _ from "lodash";
import { onUploadImage } from "../../../apis/hotels";
function BookingItem(props) {
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
  const [modals, setModals] = useState(false);
  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [modals5, setModals5] = useState(false);
  const [idNurse, setIdNurse] = useState(null);
  var { item, index, currentPage, pageSize, onDelete, onEdit2 } = props;
  useEffect(() => {
    detailNurse();
    GetCity();
  }, [idNurse]);
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
  const detailNurse = async () => {
    try {
      var res = await onDetailNurse(idNurse);
      setNurse(res.data.cityName);
      setCountryId(res.data.__countries__.id);
      setImageId(res.data.cityMedias[0].id);
      setImage(res.data.cityMedias[0].filePath);
    } catch (error) {
      console.log(error);
    }
  };

  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onToggleModalsEdit(id) {
    setIdNurse(id);
    setModals3(!modals3);
  }
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
  async function onChangeImage(e) {
    if (e.target.files && e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  }
  function onChangeCountryId(e) {
    setCountryId(e.target.value);
    setValidCountry(false);
  }
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      cityName: nurse,
      imageId: [imageId],
      countryId: countryId,
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
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.__users__.username}</td>
      <td>{item.__areas__.areaName}</td>
      <td></td>
      <td>{formatDate(item.startTime)}</td>
      <td>{formatDate(item.endTime)}</td>
      <td>{item.numberPerson}</td>
    </tr>
  );
}

export default BookingItem;
