import React, { ChangeEvent, useEffect, useState } from "react";

import { BsXLg } from "react-icons/bs";
import { GetUserWalletStatusValueMessage } from "../../utils/functions";
import Modal from "react-bootstrap/Modal";
import { USER_WALLET_STATUS } from "../../constants/constants";
import { FormInput } from "../../shared/FormInput";
import { updateUserDetails } from "../../utils/services/actions";
import { convertToFormData } from "../../utils/convert-to-form-data";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Home } from "../../routes/routes";

type UserUnverifiedProps = {
  userVerified?: number;
  role?: string;
};

export default function UserVerifiedModal({
  userVerified,
}: UserUnverifiedProps) {
  const [show, setShow] = useState(false);
  const [walletHash, setWalletHash] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { pathname } = useLocation();

  const onClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(
      userVerified !== undefined &&
        userVerified !== 1 &&
        ["/", Home].includes(pathname)
    );
  }, [userVerified, pathname]);

  const onWalletChange = (e: ChangeEvent<HTMLInputElement>) => {
    setWalletHash(e.target.value);
  };

  const getMessage = GetUserWalletStatusValueMessage(
    USER_WALLET_STATUS[userVerified]
  );

  const saveWalletAddress = () => {
    if (walletHash.length > 40) {
      setDisabled(true);
      updateUserDetails(
        convertToFormData({
          wallet_address: walletHash,
        })
      )
        .then(() => {
          onClose();
        })
        .catch(() => {
          setDisabled(false);
        });
    } else {
      toast.info("Please enter a valid wallet address", {
        toastId: "validation",
      });
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="connect-modal"
      show={show}
      onHide={onClose}
    >
      <button type="button" title="Close" className="close" onClick={onClose}>
        <BsXLg />
      </button>
      <Modal.Body>
        <h2 className="connect-modal-heading">{getMessage}</h2>
        {Number(userVerified) < 1 ? (
          <>
            <FormInput
              label="Wallet Address"
              name="walletAddress"
              onChange={onWalletChange}
              value={walletHash}
              placeholder="Enter Wallet Address"
              required
            />
            <button
              className="btn-connect-wallet p-3 mt-3"
              onClick={saveWalletAddress}
              disabled={disabled}
            >
              Save
            </button>
          </>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}
