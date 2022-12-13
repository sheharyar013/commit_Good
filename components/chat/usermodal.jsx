import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import { FaMinus } from "react-icons/fa";
import { checkIfRemovingUserInChat } from "../../utils/functions";

export default function UserModal({
  usersList,
  userType,
  modalShow,
  modalHandleClose,
  onAddUser,
  onRemoveUser,
}) {
  return (
    <Modal show={modalShow} onHide={modalHandleClose}>
      <Modal.Header>
        <div style={{ width: "100%" }}>
          <div className="close-btn">
            <img
              src={"/images/closeicon.png"}
              alt=""
              onClick={modalHandleClose}
            />
          </div>
          <div className="add-user-head">
            <h2>
              {checkIfRemovingUserInChat(userType) ? "Remove" : "Add"} User(s)
            </h2>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-scroll">
          {usersList?.map(({ id, name, image_url, email }) => (
            <div className="user-row row" key={id}>
              <div className="ml-3 row">
                <img
                  src={image_url}
                  alt="userimg"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Breezeicons-actions-22-im-user.svg/1200px-Breezeicons-actions-22-im-user.svg.png";
                  }}
                />
                <p className="mt-2 ml-2">
                  {name} ({email})
                </p>
              </div>

              {userType === "removeuser" ? (
                <div
                  className="mr-3 remove-icon"
                  onClick={onRemoveUser}
                  data-id={id}
                >
                  <FaMinus />
                </div>
              ) : (
                <div
                  className="mr-3 user-icon"
                  onClick={onAddUser}
                  data-id={id}
                >
                  <img src={"/images/addicon.png"} alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          variant="secondary"
          className="btn btn-primary w-100"
          onClick={modalHandleClose}
        >
          Done
        </button>
      </Modal.Footer>
    </Modal>
  );
}

UserModal.propTypes = {
  modalHandleClose: PropTypes.func.isRequired,
  modalShow: PropTypes.bool.isRequired,
  onAddUser: PropTypes.func,
  onRemoveUser: PropTypes.func,
  userType: PropTypes.string,
  usersList: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string,
      id: PropTypes.number.isRequired,
      image: PropTypes.string,
      name: PropTypes.string.isRequired,
    })
  ),
};
