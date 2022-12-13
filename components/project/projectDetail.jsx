import React from "react";
import {
  ArrowIcon,
  FavoriteIcon,
  ProjectDetailImg,
  ShareFBIcon,
  ShareLinkedinIcon,
  SharePinIcon,
  ShareTwitterIcon,
  UserIcon,
} from "../../utils/images";

import { actions } from "@metaplex/js";
import { useSelector } from "react-redux";
import { getConnection } from "features/wallet/walletSlice";
import { toast } from "react-toastify";
import { connectState } from "features/wallet/walletSlice";
import { roleNames } from "../../constants/constants";
import { getSessionUser } from "../../utils/auth";

export default function ProjectDetail() {
  const connection = useSelector(getConnection);
  const connected = useSelector(connectState);

  const placeBidClicked = async () => {
    const wallet = window.solana;
    if (!connected || !wallet?.publicKey) {
      toast("Please connect wallet first");
      return;
    }

    const bidPlace = await actions.placeBid({
      // bidderPotToken: wallet.publicKey,
      auction: "6ogmrHStVzE7uGurNKoPLWMq4Divu9UeY9vkKq4rbuEC",
      connection,
      wallet,
      // amount: 100_000,
    });
  };

  return (
    <section className="project-detail-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="project-img">
              <img src={ProjectDetailImg} alt="" />
              <span className="project-likes">
                <span>
                  <img src={FavoriteIcon} alt="" />
                </span>
                <span>125</span>
              </span>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="project-detail">
              <div className="project-owner">
                <span>
                  <img src={UserIcon} alt="" />
                </span>
                <a href="#">@Orian Art</a>
              </div>
              <h2>Charity 99</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book.
              </p>
              <h4>
                Hours Needed : <span>5</span>
              </h4>
              <h4>
                Spot Available : <span>5</span>
              </h4>
              <h4>Auction Ends in:</h4>
              <div className="counter">
                <div className="time-left">
                  <h5>48</h5>
                  <h6>Days</h6>
                </div>
                <div className="time-left">
                  <h5>24</h5>
                  <h6>Hours</h6>
                </div>
                <div className="time-left">
                  <h5>32</h5>
                  <h6>Min</h6>
                </div>
                <div className="time-left">
                  <h5>20</h5>
                  <h6>Sec</h6>
                </div>
              </div>
              <h4>
                Starting Bid : <span>$ 985 or 0.03 ETH</span>
              </h4>
              {[
                roleNames.charity_coordinator,
                roleNames.patron,
                roleNames.volunteer,
              ].includes(getSessionUser()?.role) ? (
                <div className="purchase-btn">
                  <button onClick={placeBidClicked}>
                    Purchase NFT
                    <span>
                      <img src={ArrowIcon} alt="" />
                    </span>
                  </button>
                </div>
              ) : null}

              <div className="share-project">
                <span>Share</span>
                <a href="">
                  <img src={ShareTwitterIcon} alt="" />
                </a>
                <a href="">
                  <img src={ShareFBIcon} alt="" />
                </a>
                <a href="">
                  <img src={SharePinIcon} alt="" />
                </a>
                <a href="">
                  <img src={ShareLinkedinIcon} alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
