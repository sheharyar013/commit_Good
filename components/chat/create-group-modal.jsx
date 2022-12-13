import React from "react";
import { Modal } from "react-bootstrap";

export default function CreateGroupModal({
  groupName,
  onGroupNameChange,
  onSubmit,
  openCreateGroupModal,
  toggleCreateGroupModal,
}) {
  return (
    <Modal show={openCreateGroupModal} onHide={toggleCreateGroupModal} centered>
      <Modal.Header>
        <div style={{ width: "100%" }}>
          <div className="close-btn">
            <img
              src={"/images/closeicon.png"}
              alt=""
              onClick={toggleCreateGroupModal}
            />
          </div>
          <div className="add-user-head">
            <h2>Create New Chat Group</h2>
          </div>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Group Name</label>
              <input
                name={"group_name"}
                className="form-control"
                value={groupName}
                onChange={onGroupNameChange}
                placeholder="Please Enter Group Name"
                required
                minLength={2}
              />
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          variant="secondary"
          className="btn btn-primary w-100"
          onClick={onSubmit}
        >
          Submit
        </button>
      </Modal.Footer>
    </Modal>
  );
}
