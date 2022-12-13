import React from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";

export default function DropdownUserSelection({
  modalHandleShow,
  setUserType,
}) {
  return (
    <DropdownButton className="chat-dropdown">
      <Dropdown.Item>
        <div className="d-flex mr-2">
          <img
            src={"/images/adduser.png"}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
          <p
            className="ml-1"
            onClick={() => {
              setUserType("adduser");
              modalHandleShow();
            }}
          >
            Add user
          </p>
        </div>
      </Dropdown.Item>
      {/* <Dropdown.Item>
        <div className="d-flex mr-2">
          <img
            src={"/images/removeuser.png"}
            alt=""
            style={{ width: "20px", height: "20px" }}
          />
          <p
            className="ml-1"
            onClick={() => {
              modalHandleShow();
              setUserType("removeuser");
            }}
          >
            Remove user
          </p>
        </div>
      </Dropdown.Item> */}
    </DropdownButton>
  );
}
