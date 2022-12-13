import React, { ReactElement, useCallback, useEffect, useState } from "react";

import { CampaignVolunteers } from "../../../interfaces/project";
import HeroSection from "../../../layouts/hero-section";
import { VolunteerCard } from "./components/volunteer-card";
import { getCampaignVolunteers } from "../../../utils/services/actions/campaigns";
import { useParams } from "react-router-dom";

export const VolunteerOpportunities: React.FC<{
  showHero?: boolean;
}> = ({ showHero = true }): ReactElement => {
  const { id } = useParams<{ id: string }>();
  const [volunteers, setVolunteers] = useState<CampaignVolunteers[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getVolunteers = useCallback(
    async (fetching: boolean) => {
      setLoading(true);
      const data = (await getCampaignVolunteers(id).finally(() => {
        setLoading(false);
      })) as unknown as { volunteers: CampaignVolunteers[] };
      if (fetching) setVolunteers(data.volunteers);
    },
    [id]
  );

  useEffect(() => {
    let fetching = true;
    getVolunteers(fetching);
    return () => {
      fetching = false;
    };
  }, []);

  const LoadingData = loading ? (
    <div className="text-center h4">
      <h4>Loading...</h4>
    </div>
  ) : null;

  const NoData =
    !loading && !volunteers.length ? (
      <div className="text-center h3">
        <h3>No Volunteer(s) for this campaign</h3>
      </div>
    ) : null;

  return (
    // <main className="main">
    <>
      {" "}
      {showHero && <HeroSection heading="Volunteers" />}
      <section className={`search-results-section ${!showHero ? "pt-3" : ""}`}>
        <div className={showHero ? "container" : ""}>
          {LoadingData}
          {NoData}
          <div className="row">
            {volunteers.map((item) => (
              <VolunteerCard {...item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </>
    // </main>
  );
};

export default VolunteerOpportunities;
