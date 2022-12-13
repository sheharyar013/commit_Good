import { LedgerIcon, SolflareIcon, SolongIcon } from "../../utils/images";

import { BsXLg } from "react-icons/bs";
import Modal from "react-bootstrap/Modal";
import WalletButton from "../wallet/walletButton";

export default function ConnectModal(props) {
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
      <Modal.Body>
        <h2 className="connect-modal-heading">Connect Wallet</h2>
        <div className="connect-wallet-modal-btns">
          <WalletButton />
          <button>
            <span>Solflare</span>
            <span>
              <img src={SolflareIcon} alt="" />
            </span>
          </button>
          <button>
            <span>Ledger</span>
            <span>
              <img src={LedgerIcon} alt="" />
            </span>
          </button>
          <button>
            <span>Solong</span>
            <span>
              <img src={SolongIcon} alt="" />
            </span>
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
