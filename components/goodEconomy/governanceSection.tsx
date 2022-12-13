import {
  CharityCoordinatorIcon,
  CharityIcon,
  VolunteerIcon,
} from "../../utils/images";

export default function GovernanceSection() {
  return (
    <section className="governance-section">
      <div className="container">
        {/* <h3 className="sub-heading">Commit Good</h3> */}
        <h2>Governance & Dynamic Rewards</h2>
        <div className="how-it-works-main governance-main pt-4">
          <div className="how-it-works-col h-75">
            <div className="side-line "></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={CharityIcon} alt="" />
              </div>
              <h2>Charity</h2>
              <ul className="how-it-works-list pb-5">
                <li>
                  1 Fully funded project, execution of that project completed
                  and signed off by charity coordinator so that its “certified”
                  and sent to the blockchain (100 $GOOD).
                </li>
                <li>
                  Receives 50% ($GOOD) of NFT purchase price per campaign they
                  lead.
                </li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col mt-0 mt-lg-3 pt-0 pt-lg-5">
            <div className="side-line"></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={CharityCoordinatorIcon} alt="" />
              </div>
              <h2>Charity Coordinator</h2>
              <ul className="how-it-works-list">
                <li>
                  Successfully Register 10 Charities and 2 Fully Funded
                  Campaigns. • For 10 Charities they will receive (100 $GOOD)
                  and 2 Fully Funded Campaigns (200 $GOOD).
                </li>
                <li>
                  The $GOOD will be held in escrow and released once both
                  milestones are complete.
                </li>
                <li>
                  Once released the Charity Coordinators are eligible for
                  another round of milestone $GOOD rewards.
                </li>
                <li>
                  Per charitable project they are assisting, they will receive
                  an immediate 2% ($GOOD) of NFT purchase price.
                </li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col h-75">
            <div className="side-line"></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={VolunteerIcon} alt="" />
              </div>
              <h2>Volunteer</h2>
              <ul className="how-it-works-list pb-5">
                <li>
                  Successfully complete 40 hours of verified service through the
                  Commit Good mobile app (400 $GOOD)
                </li>
                <li>$GOOD is held in escrow until 40 hours are reached.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
