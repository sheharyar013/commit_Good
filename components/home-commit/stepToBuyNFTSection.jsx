import {
  ArrowStraightIcon,
  LeftArrowDownOneIcon,
  RightArrowDownIcon,
} from "../../utils/images";

import ConnectModal from "../modal/connectModal";
import React from "react";
import { Link } from "react-router-dom";
import useMetaWallet from "../../hooks/useMetaWallet";
import { RootStateOrAny, useSelector } from "react-redux";

export default function StepToBuyNFT() {
  const [modalShow, setModalShow] = React.useState(false);
  const { defaultAccount, connectwalletHandler } = useMetaWallet();
  const [toggleButton, setToggleButton] = React.useState(false);

  console.log(defaultAccount, "hello ");

  // const todos = useSelector(
  //   (state: RootStateOrAny) => state.wallet.defaultAccount
  // );

  const onButtonToggle = () => {
    setToggleButton((prev) => !prev);
  };

  return (
    <section className="step-section">
      <div className="container">
        <h2 className="main-heading">
          How to Purchase $Good Token to Support Charities Around the world
        </h2>
        <div className="my-4 row justify-content-center">
          <div className="col-lg-6 col-12">
            <div className="step-left-main">
              <div className="step-counter-main">
                <div className="step-counter">
                  <h4>1</h4>
                  <h5>STEP</h5>
                </div>
              </div>
              <div className="step-content">
                <h3>
                  Select &quot;Connect Wallet&quot;. Sign in or create an
                  account on{" "}
                  <a
                    href="https://biconomy.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary"
                  >
                    Biconomy.com
                  </a>{" "}
                </h3>
                <div className="mt-3 how-to-buy-steps-btns">
                  <div>
                    <button
                      className="btn-connect-wallet"
                      onClick={() => {
                        if (defaultAccount) {
                          return;
                        } else {
                          connectwalletHandler();
                        }
                      }}
                    >
                      {defaultAccount ? "Connected" : "Connect Wallet"}
                    </button>
                  </div>
                  <div>
                    <button className="btn-buy-good" onClick={onButtonToggle}>
                      Buy $GOOD
                    </button>
                  </div>
                </div>
                {toggleButton ? (
                  <div className="mb-3 btns-show mt-3">
                    <a
                      href="https://biconomy.com"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-buy-good"
                      onClick={onButtonToggle}
                    >
                      Buy $GOOD on Biconomy
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="arrow-img">
              <img src={RightArrowDownIcon} alt="" />
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="pr-md-3 left-arrow-down-img">
              <img src={LeftArrowDownOneIcon} alt="" />
            </div>
          </div>
          <div className="offset-lg-1 col-lg-5 col-12">
            <div className="step-right-main">
              <div className="text-right step-content">
                <h3>Complete ID verification</h3>
              </div>
              <div className="step-counter-main">
                <div className="step-counter-right">
                  <h4>2</h4>
                  <h5>STEP</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 col-12">
            <div className="step-left-main">
              <div className="step-counter-main">
                <div className="step-counter">
                  <h4>3</h4>
                  <h5>STEP</h5>
                </div>
              </div>
              <div className="step-content">
                <h3>
                  Purchase or deposit USDT, in order to purchase or convert into
                  GOOD. To deposit select “USDT” and copy wallet address and
                  confirm ERC20. network. To purchase select “Buy Crypto” to be
                  redirected through third party process.
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="arrow-img">
              <img src={RightArrowDownIcon} alt="" />
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="pr-md-3 left-arrow-down-img">
              <img src={LeftArrowDownOneIcon} alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="step-right-main">
              <div className="text-right step-content">
                <h3>
                  After new balance is reflected in Biconomy wallet, select
                  “Market” and search “GOOD/USDT”
                </h3>
              </div>
              <div className="step-counter-main">
                <div className="step-counter-right">
                  <h4>4</h4>
                  <h5>STEP</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 col-12">
            <div className="step-left-main">
              <div className="step-counter-main">
                <div className="step-counter">
                  <h4>5</h4>
                  <h5>STEP</h5>
                </div>
              </div>
              <div className="step-content">
                <h3>
                  Set your buy order according to how much you wish to purchase.
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-6 d-none d-lg-block">
            <div className="arrow-img">
              <img src={RightArrowDownIcon} alt="" />
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="pr-md-3 left-arrow-down-img">
              <img src={LeftArrowDownOneIcon} alt="" />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="step-right-main">
              <div className="text-right step-content">
                <h3>
                  Head back to{" "}
                  <Link to="/" className="text-primary">
                    Commitgood.com
                  </Link>{" "}
                  to purchase NFT in $GOOD from project
                </h3>
              </div>
              <div className="step-counter-main">
                <div className="step-counter-right">
                  <h4>6</h4>
                  <h5>STEP</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 col-12 d-lg-none">
            <div className="straight-arrow-img">
              <img src={ArrowStraightIcon} alt="" />
            </div>
          </div>
        </div>
        <div className="my-4 row">
          <div className="col-lg-6 col-12">
            <div className="step-left-main">
              <div className="step-counter-main">
                <div className="step-counter">
                  <h4>7</h4>
                  <h5>STEP</h5>
                </div>
              </div>
              <div className="step-content">
                <h3>
                  Withdraw $GOOD from Biconomy Wallet to Commit Good Wallet
                  Platform
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConnectModal show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
}
