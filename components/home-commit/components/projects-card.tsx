import {
  CampaignVolunteers,
  ProjectDetailsRoute,
} from "../../../routes/routes";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import { Image } from "antd";
import { Link, useHistory } from "react-router-dom";
import { LinkIcon, UserIcon, WatchIcon } from "../../../utils/images";
import React, { FC, useEffect, useState } from "react";
import { getSessionUser, isLoggedIn } from "../../../utils/auth";

import { IProject } from "../../../interfaces/project";
import { baseUrlAPI } from "../../../utils/services/end-points";
import { roleNames } from "../../../constants/constants";
import { shareViaSocial } from "../../../utils/functions";
import { toggleCampaignCompletion } from "../../../utils/services/actions/campaigns";
import { useGoodTokenPrice } from "../../../hooks/useGoodPrice";
import { toast } from "react-toastify";
import useMetaWallet from "../../../hooks/useMetaWallet";
import { RootStateOrAny, useSelector } from "react-redux";

type TListProjects = {
  filterMyProjects?: boolean;
  campaign: IProject;
};

export const ProjectCard: FC<TListProjects> = ({
  filterMyProjects,
  campaign,
}) => {
  const history = useHistory();
  const [isCompleted, setIsCompleted] = useState(campaign.is_completed);
  const { price } = useGoodTokenPrice();
  const { defaultAccount, connectwalletHandler } = useMetaWallet();
  const todos = useSelector(
    (state: RootStateOrAny) => state.wallet.defaultAccount
  );

  const image =
    campaign.images && campaign.images.length > 0
      ? campaign.images[0].image_url
      : "";

  const toggle = () => {
    toggleCampaignCompletion(campaign.id).then(() => {
      setIsCompleted((prev) => !prev);
    });
  };

  const shareViaFacebook = () => {
    shareViaSocial(`${baseUrlAPI}/project/${campaign.id}`, "facebook");
  };

  const shareViaTwitter = () => {
    shareViaSocial(`${baseUrlAPI}/project/${campaign.id}`, "twitter");
  };

  const shareViaPinterest = () => {
    shareViaSocial(`${baseUrlAPI}/project/${campaign.id}`, "pinterest");
  };

  const shareViaLinkedin = () => {
    shareViaSocial(`${baseUrlAPI}/project/${campaign.id}`, "linkedin");
  };

  return (
    <div className="col-lg-3 col-md-4 c0l-sm-6 mt-3">
      <div className="search-card">
        <Link to={ProjectDetailsRoute.replace(":id", campaign.id.toString())}>
          <img src={LinkIcon} alt="" />
        </Link>
        <div className="card-img project-image">
          <Image
            src={image}
            alt=""
            className="img-fluid"
            height={200}
            width={"100%"}
          />
        </div>
        <div className="card-content">
          <div className="d-flex justify-content-between align-items-center">
            <h2>{campaign.name}</h2>
            <div className="profile-img">
              <img src={UserIcon} alt="" />
            </div>
          </div>
          <p>{campaign.description}</p>
        </div>
        <div className="search-card-footer d-flex justify-content-between align-items-center">
          <h4>
            <span>Price: </span>
            <span className="price-total">
              {(parseInt(campaign.goal_amount) / price).toFixed(2)} $GOOD{" "}
            </span>
          </h4>
          <h4 className="d-flex align-items-center">
            <span className="mr-1">
              <img src={WatchIcon} alt="" />
            </span>
            {campaign.days_left} day{campaign.days_left > 1 ? "s" : ""} left
          </h4>
        </div>
        {getSessionUser()?.role === roleNames.charity_coordinator ? (
          <div className="text-dark d-flex justify-content-between align-items-center">
            <span>Share via:</span>
            <span className="project-share">
              <FaFacebookSquare
                onClick={shareViaFacebook}
                className="mr-2 fb-icon"
              />
              <FaTwitter
                onClick={shareViaTwitter}
                className="mr-2 twitter-icon"
              />
              <FaPinterest
                onClick={shareViaPinterest}
                className="mr-2 pinterest-icon"
              />
              <FaLinkedin
                onClick={shareViaLinkedin}
                className="linkedin-icon"
              />
            </span>
          </div>
        ) : null}

        {filterMyProjects ||
        getSessionUser()?.role === roleNames.charity_coordinator ? (
          <div className="create-nft-card-btn">
            <button onClick={toggle} title="Switch Complete Status">
              Mark as {isCompleted ? "in-complete" : "complete"}
            </button>
          </div>
        ) : null}

        {isLoggedIn() && getSessionUser()?.role === roleNames.nft && (
          <div className="create-nft-card-btn">
            <button
              onClick={() => {
                if (!getSessionUser()?.wallet_address) {
                  history.push("/profile");
                  return toast.info(
                    "please enter your wallet address by editiing your profile"
                  );
                }
                if (!todos) connectwalletHandler();
                // return toast.info("please connect your wallet");
                history.push(`/art/create/${campaign.id}/0`, campaign.name);
              }}
            >
              Create NFT
            </button>
          </div>
        )}

        {getSessionUser()?.role === roleNames.volunteer && (
          <div className="create-nft-card-btn">
            <button
              onClick={() => {
                history.push(
                  CampaignVolunteers.replace(":id", campaign.id.toString())
                );
              }}
            >
              Volunteers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
