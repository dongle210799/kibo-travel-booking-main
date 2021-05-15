import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  CustomInput,
} from "reactstrap";
import { Switch } from "antd";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifytoast } from "../../../helper/index";
import "react-toastify/dist/ReactToastify.css";
import ModalApp from "../../Modals/modals";
import _ from "lodash";
import {
  onDetailBeds,
  onUpDateBeds,
  onShowRoom,
} from "../../../apis/countries";
import { onUploadImage } from "../../../apis/hotels";
function BedItem(props) {
  const [bedName, setBedName] = useState(null);
  const [bedError, setBedError] = useState(null);
  const [validBed, setValidBed] = useState(false);
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [imageId, setImageId] = useState();

  const [modals2, setModals2] = useState(false);
  const [modals3, setModals3] = useState(false);
  const [modals5, setModals5] = useState(false);
  const [idBed, setIdBed] = useState(null);
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
  useEffect(() => {
    detailBed();
  }, [idBed]);
  useEffect(() => {
    onUpdateImage();
  }, [file]);
  const detailBed = async () => {
    try {
      var res = await onDetailBeds(idBed);
      setBedName(res.data.countryName);
      setDescription(res.data.description);
      setImage(res.data.countryMedias[0].filePath);
      setImageId(res.data.countryMedias[0].id);
    } catch (error) {
      console.log(error);
    }
  };
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

  function onToggleModalsEdit(id) {
    setIdBed(id);
    setModals3(!modals3);
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
  function onToggleModalsDelete(e) {
    setModals2(!modals2);
  }
  function onEdit(e) {
    e.preventDefault();
    const isValid = validate();
    const body = {
      countryName: bedName,
      imageId: ["string"],
    };
    if (isValid) {
      return onUpDateBeds(idBed, body)
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

  return (
    <tr key={index}>
      <td>{index + 1 + (currentPage - 1) * pageSize}</td>
      <td>{item.countryName}</td>
      <td>
        {" "}
        {item.countryMedias[0] ? (
          <div>
            <img
              onClick={() => setModals5(true)}
              id="frame"
              alt="your image"
              src={item.countryMedias[0].filePath}
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
                  src={item.countryMedias[0].filePath}
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
      <td>{item.description}</td>
      <td>
        <button
          type="button"
          className="btn btn-warning mr-2 ml-2 mb-2 mt-2 "
          onClick={() => onToggleModalsEdit(item.id)}
        >
          <span className="fa fa-pencil "></span>
        </button>
        <ModalApp
          modal={modals3}
          children={
            <Form>
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
                src={file ? file : image}
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
            </Form>
          }
          onSubmit={onEdit}
          title={"Bed Detail"}
          toggleModal={onToggleModalsEdit}
          showModalFooter={onToggleModalsEdit}
        />
        <button
          type="button"
          className="btn btn-danger mb-2 mt-2 "
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
              Do you want to delete this country?
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

export default BedItem;
