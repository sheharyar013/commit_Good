import {
  FaFacebookSquare,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";

import DonateModal from "./donate-modal";
import { IProject } from "../../../interfaces/project";
import { ProjectDetailThumbnail, WatchIcon } from "../../../utils/images";
import { ProjectDetailsRoute } from "../../../routes/routes";
import { baseUrlAPI } from "../../../utils/services/end-points";
import { getCampaignDetailsByID } from "../../../utils/services/actions/campaigns";
import { shareViaSocial } from "../../../utils/functions";
import { useParams } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useGoodTokenPrice } from "../../../hooks/useGoodPrice";

export default function ProjectDetailsWrapper() {
  const { id } = useParams<{ id: string }>();
  const [projectDetails, setProjectDetails] = useState<IProject>();
  const [modalShow, setModalShow] = useState(false);
  const [ShowSocial, setShowSocial] = useState(false);
  const { price } = useGoodTokenPrice();
  const route = baseUrlAPI + ProjectDetailsRoute.replace(":id", id);
  const shareViaFacebook = () => {
    shareViaSocial(route, "facebook");
  };

  const shareViaTwitter = () => {
    shareViaSocial(route, "twitter");
  };

  const shareViaPinterest = () => {
    shareViaSocial(route, "pinterest");
  };

  const shareViaLinkedin = () => {
    shareViaSocial(route, "linkedin");
  };

  const getDetails = useCallback(async (fetching: boolean) => {
    if (fetching) {
      const data = (await getCampaignDetailsByID(id)) as unknown as IProject;
      setProjectDetails(data);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    getDetails(isMounted);

    window.scrollTo(0, 0);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="project-detail-section pt-5 mt-5">
      <div className="container">
        {!projectDetails && (
          <h2 className="h2 text-center text-dark">Loading...</h2>
        )}
        {projectDetails && (
          <>
            <div className="row">
              <div className="col-md-7 position-relative project-detail-banner">
                <h2 className="project-detail-heading">
                  Charity Life{" "}
                  <small className="ml-3">
                    {" "}
                    <span className="charity-img">
                      <img src={WatchIcon} />
                    </span>{" "}
                    ({projectDetails?.days_left} Day
                    {projectDetails?.days_left > 1 ? "s" : ""} Left)
                  </small>
                </h2>
                <img
                  className="img-fluid border "
                  src={
                    projectDetails?.images?.[0]?.image_url ??
                    ProjectDetailThumbnail
                  }
                  alt=""
                />
              </div>
              <div className="col-md-5 d-flex flex-column justify-content-center mt-3 mt-md-0">
                <div className="project-content-detail">
                  <h3>{projectDetails?.name}</h3>
                  <p>{projectDetails?.description ?? "N/A"}</p>
                  {/* <div className="corrdinator-detail">
                <span>
                  <img src={UserIcon} alt="" />
                </span>
                <Link to="#?">@Orian Art is Corrdinator of this Project</Link>
              </div> */}
                  <div className="row bg-gray no-gutter charity_card_small">
                    <div className="col-md-4 mb-2 mb-md-0 border-right">
                      <div className="project-amount-detail">
                        <div className="project-amount">
                          <h5 className="font-weight-bold">
                            {projectDetails?.donation_amount_in_usd} $GOOD
                          </h5>
                          <h4>Raised</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0 border-right">
                      <div className="project-amount-detail">
                        <div className="project-amount">
                          <h5 className="font-weight-bold">
                            {projectDetails?.donation_amount_in_good} $GOOD
                          </h5>
                          <h4>Donations</h4>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-2 mb-md-0">
                      <div className="project-amount-detail">
                        <div className="project-amount">
                          <h5 className="font-weight-bold">
                            {(
                              parseInt(projectDetails?.goal_amount) / price
                            ).toFixed(2) + " $GOOD"}
                          </h5>
                          <h4>Goal</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="project-amount-btn my-3 text-right">
                    <button className="">
                      $GOOD Goal (
                      {(parseInt(projectDetails?.goal_amount) / price).toFixed(
                        2
                      )}
                      )
                    </button>
                  </div>
                  <ProgressBar now={60} />
                  <div
                    className={`project-amount-btn d-flex gap-3 align-items-center ${
                      ShowSocial ? "mt-2" : "mt-3"
                    }`}
                  >
                    <button
                      className="btn-block text-primary border w-50 bg-white"
                      onClick={() => setShowSocial(!ShowSocial)}
                    >
                      Share
                    </button>
                    <button
                      onClick={() => setModalShow(true)}
                      className="btn-block mt-0 ml-3"
                    >
                      $GOOD Amount
                    </button>
                  </div>
                  {ShowSocial ? (
                    <div className="project-detail-social-icons text-right">
                      <span className="twitter-icon">
                        <FaTwitter onClick={shareViaTwitter} />
                      </span>
                      <span className="fb-icon">
                        <FaFacebookSquare onClick={shareViaFacebook} />
                      </span>
                      <span className="pinterest-icon">
                        <FaPinterest onClick={shareViaPinterest} />
                      </span>
                      <span className="linkedin-icon">
                        <FaLinkedin onClick={shareViaLinkedin} />
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <DonateModal show={modalShow} onHide={() => setModalShow(false)} />
    </section>
  );
}
