import { useWallet } from "@solana/wallet-adapter-react";
import React, { FC, ReactElement, useState } from "react";
import { Button } from "react-bootstrap";
import { CampaignVolunteers } from "../../../../interfaces/project";
import { UserIcon } from "../../../../utils/images";
import { getPaidStaus } from "../../../../utils/services/actions/campaigns";
import { Loader } from "../../../../shared/Loader/Loader";

export const VolunteerCard: FC<CampaignVolunteers> = ({
  title,
  description,
  hours,
  number,
  ...props
}): ReactElement => {
  const { campaign_id, id } = props;

  const [transactionStatus] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  React.useEffect(() => {
    if (transactionStatus) {
      if (campaign_id && id) {
        getPaidStaus(campaign_id, id);
      }
    }
  }, [transactionStatus]);

  return (
    <>
      <div className="volunteer_loader">
        {loading === true ? <Loader /> : ""}
      </div>
      <div className="mt-3 col-lg-3 col-md-4 c0l-sm-6 ">
        <div className="search-card">
          <div className="card-content">
            <div className="d-flex justify-content-between align-items-center">
              <h2>{title}</h2>
              <div className="profile-img">
                <img src={UserIcon} alt="" />
              </div>
            </div>
            <p>{description}</p>
          </div>
          <div className="search-card-footer d-flex justify-content-between align-items-center">
            <h4>
              <span>Hours: </span>
              <span className="price-total">{hours}</span>
            </h4>
            <h4 className="d-flex align-items-center">Volunteers: {number}</h4>
          </div>
        </div>
      </div>
    </>
  );
};
