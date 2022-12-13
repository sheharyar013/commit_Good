// import { v4 as uuid } from 'uuid';
import PropTypes from "prop-types";
import React from "react";
import { IUser } from "../interfaces/user";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { RootStateOrAny, useSelector } from "react-redux";
import useMetaWallet from "../hooks/useMetaWallet";

type TGlobalProps = {
  user?: IUser | null;
  globalId: boolean;
  url?: string;
  btnText?: string;
  showConnectWallet?: boolean;
};

export const GlobalId = React.forwardRef<HTMLButtonElement, TGlobalProps>(
  (props, ref) => {
    const { user, globalId, url, btnText = "Connect" } = props;
    const { connectwalletHandler } = useMetaWallet();
    const walletAddress = useSelector(
      (state: RootStateOrAny) => state.wallet.defaultAccount
    );

    const onButtonClick = () => {
      if (globalId) {
        return;
      }
      const redirectUrl = process.env.NEXT_PUBLIC_GLOBAL_REDIRECT as string;
      //With verification set
      //https://connect.global.id/?client_id=15c0a458-92c5-409a-b935-9922eac52b6f&response_type=code&scope=openid&redirect_uri=${redirectUrl}&qr_only=true&acrc_id=f643e90d-e98b-487c-98f1-9683ff55c0ec&nonce=<INSERT_NONCE_HERE>&document_id=tos%20pp
      const connectUrl = new URL(
        `https://connect.global.id/?client_id=15c0a458-92c5-409a-b935-9922eac52b6f&response_type=code&scope=public&qr_only=true&document_id=tos%20pp`
      );

      // connectUrl.searchParams.set("nonce", uuid());
      connectUrl.searchParams.set("redirect_uri", url ?? redirectUrl);
      window.location.href = connectUrl.toString();
    };

    if (user) {
      return null;
    }

    return (
      <div className={"d-flex"}>
        <button
          className="btn-register padding-18"
          style={{ border: "none", background: "#426ce8" }}
          onClick={connectwalletHandler}
        >
          {walletAddress ? "Connected" : "Connect Wallet"}
        </button>

        <button
          onClick={onButtonClick}
          ref={ref}
          className="btn-register padding-18"
          title="Did you install Global Id app on your mobile? If NOT, please install it."
          disabled={globalId}
        >
          {!globalId ? `${btnText} via GlobalID` : "Verified"}
        </button>
      </div>
    );
  }
);

GlobalId.displayName = "GlobalID button";

GlobalId.propTypes = {
  globalId: PropTypes.any,
  user: PropTypes.any,
  url: PropTypes.string,
  btnText: PropTypes.string,
};
