import React from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap";

export default function ModalApp({
  children,
  onSubmit,
  title,
  modal,
  toggleModal,
  className,
  showModalFooter,
}) {
  const closeBtn = (
    <button className="close" onClick={toggleModal}>
      x
    </button>
  );

  return (
    <Modal
      isOpen={modal}
      toggle={toggleModal}
      className={`modal-dialog-centered ${className ? className : ""}`}
    >
      <ModalHeader
        style={{ background: "#1b8eb7" }}
        toggle={toggleModal}
        close={closeBtn}
        className="modals-header"
      >
        <h3> {title}</h3>
      </ModalHeader>
      <ModalBody>{children}</ModalBody>
      {showModalFooter ? (
        <ModalFooter className="modals-footer">
          <Button color="success" onClick={onSubmit}>
            Submit
          </Button>
          <Button color="danger" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      ) : (
        ""
      )}
    </Modal>
  );
}
