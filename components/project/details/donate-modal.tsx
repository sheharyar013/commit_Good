import React, { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { BsXLg } from "react-icons/bs";
import { ErrorsWrapper } from "../../../shared/ErrorsWrapper";
import Modal from "react-bootstrap/Modal";
import { getSessionUser } from "../../../utils/auth";
import { sendDonation } from "../../../utils/rpc/balance";
import { toast } from "react-toastify";
import { validateObject } from "../../../utils/validate-object";
import { addTransactionToCampaign } from "../../../utils/services/actions/wallet";
import { convertToFormData } from "../../../utils/convert-to-form-data";
import { useParams } from "react-router-dom";
import { fetchWalletAddressesOfProject } from "../../../utils/services/actions/nft";
import { TProjectWalletAddresses } from "../../../interfaces/project";
import { Send } from "../../../views/artCreate/EtherCall";
import { RootStateOrAny, useSelector } from "react-redux";
import { ExtractErrorMessage } from "../../../utils/ExtractErrorMessage";
import { Loader } from "../../../shared/Loader/Loader";

export default function DonateModal(props: any) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { connection } = useConnection();
  const wallet = useWallet();
  const walletAddress = useSelector(
    (state: RootStateOrAny) => state.wallet.defaultAccount
  );
  const onSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (disabled) {
      return;
    }
    if (!walletAddress) {
      return toast.info("Please connect the wallet first", {
        toastId: "nft",
      });
    }
    // Validation
    const { hasErrors, errors } = validateObject({ amount });
    if (hasErrors) {
      setValidationErrors(errors);
      return;
    }

    // Reset Values
    setValidationErrors({});
    const wallets = (await fetchWalletAddressesOfProject(
      id || 147
    )) as unknown as { wallet_addresses: TProjectWalletAddresses };
    console.log(wallets);

    try {
      setDisabled(true);
      props?.onHide?.();

      const transactionId = await Send(
        wallets.wallet_addresses.charity_admin_wallet_address,
        amount
      ).then((res) => {
        if (res) {
          setLoading(false);
          toast.success(`${amount} $GOOD has been donated to charity`, {
            toastId: "nft",
          });
          addTransactionToCampaign(
            convertToFormData({
              title: "N/A",
              tx_id: res,
              amount_in_good: amount,
              amount_in_usd: amount,
              campaign_id: id,
            })
          );
          setAmount("");
        }
      });
    } catch (e) {
      console.log(e, "akjkj");
      if (e && e.message) {
        toast.error(ExtractErrorMessage(e), {
          toastId: "nft",
        });
      }
    } finally {
      setDisabled(false);
      setLoading(false);
    }
  };

  const onValueChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setValidationErrors({});
    setAmount(value);
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="connect-modal"
      >
        <button
          type="button"
          title="Show Modal"
          className="close"
          onClick={props.onHide}
        >
          <BsXLg />
        </button>
        <Modal.Body className="success-modal-body text-left">
          <form onSubmit={onSubmitClick}>
            <ErrorsWrapper errors={validationErrors} />
            <div className="input-form mb-3">
              <label htmlFor="">$Good Amount</label>
              <input
                type="number"
                min={0}
                placeholder="Enter Amount"
                name="good_amount"
                onChange={onValueChange}
                value={amount}
                required
              />
            </div>
            <button
              type="submit"
              className="text-center"
              disabled={!amount || disabled}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
      {loading && (
        <div className="volunteer_loader">
          <Loader />
        </div>
      )}
    </>
  );
}
