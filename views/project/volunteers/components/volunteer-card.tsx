import React, { FC, ReactElement, useState } from "react";

import { CampaignVolunteers } from "../../../../interfaces/project";
import { ERole } from "../../../../interfaces/user";
import { UserIcon } from "../../../../utils/images";
import { applyForVolunteer } from "../../../../utils/services/actions/campaigns";
import { getSessionUser } from "../../../../utils/auth";
import { toast } from "react-toastify";

export const VolunteerCard: FC<CampaignVolunteers> = ({
  id,
  campaign_id,
  title,
  description,
  hours,
  number,
  is_applied,
}): ReactElement => {
  const [applied, setApplied] = useState(is_applied);
  const [loading, setLoading] = useState(false);
  const apply = async () => {
    if (loading || applied) {
      return;
    }
    setLoading(true);
    await applyForVolunteer({
      campaign_id,
      volunteer_id: id,
      hours,
    }).finally(() => {
      setLoading(false);
    });
    setApplied(true);
    toast.success("Applied successfully", {
      toastId: "volunteer-application",
    });
  };

  return (
    <div className="mt-3 col-lg-3 col-md-4 col-sm-6">
      <div className="search-card">
        <div className="card-content">
          <div className="card-img project-image">
            <img
              src={UserIcon}
              alt=""
              className="img-fluid"
              height={"200px"}
              width={"100%"}
            />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="font-weight-bold">{title}</h2>
            {/* <div className="profile-img">
              <img src={UserIcon} alt="" />
            </div> */}
          </div>
          <p>{description}</p>
        </div>
        <div className="search-card-footer d-flex justify-content-between align-items-center">
          <h4 className="d-flex align-items-center font-weight-bold">
            <span>Positions: </span>
            <span className="price-total">{number}</span>
          </h4>
          <h4 className="font-weight-bold">
            <span>Hours: </span>
            <span className="price-total">{hours}</span>
          </h4>
        </div>
        {getSessionUser()?.role === ERole.volunteer ? (
          <div className="create-nft-card-btn">
            <button type="button" onClick={apply} disabled={applied}>
              {applied ? "Applied" : "Apply"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
