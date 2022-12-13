import { BsXLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function ModalPopUp({ children, ...props }) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="connect-modal"
    >
      <button className="close" onClick={props.onHide}>
        <BsXLg />
      </button>
      <Modal.Header>
        <Modal.Title>{props?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button variant="dark" onClick={props?.onContinue}>
          Continue
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
