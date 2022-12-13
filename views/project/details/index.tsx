import React, { useEffect } from "react";
import ProjectDetailsWrapper from "../../../components/project/details";
import { ArtworksView, CampaignVolunteersView } from "../../";
import { VolunteerApplied } from "./applied-volunteers";
import { getSessionUser } from "../../../utils/auth";
import { ERole } from "../../../interfaces/user";
import { TEMP_WALLET } from "../../../constants/constants";

export const ProjectDetails = () => {
  return (
    <>
      <ProjectDetailsWrapper />
      <div className="container">
        <div className="ml-3 mt-4">
          <h4 className="text-dark h4 ml-2 font-weight-bold">
            Project Volunteer Opportunities
          </h4>
          <CampaignVolunteersView showHero={false} />
        </div>
        <div className={"mt-3"}>
          <h4 className="text-dark h4 ml-4 font-weight-bold">$GOOD NFTs</h4>
          <ArtworksView pubKey={TEMP_WALLET} />
        </div>

        {getSessionUser()?.role === ERole.charity_coordinator ||
        getSessionUser()?.role === ERole.charity ? (
          <VolunteerApplied />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
