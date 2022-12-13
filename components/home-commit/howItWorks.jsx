import React from "react";
import {
  CharityCoordinatorIcon,
  CharityIcon,
  NFTCreatorIcon,
  PatronIcon,
  VolunteerIcon,
} from "../../utils/images";

export default function HowItWorks() {
  return (
    <section id="how_it_works" className="how-it-works-section">
      <div className="container">
        {/* <h3 className="sub-heading">Commit Good</h3> */}
        <h2 className="main-heading">How It Works</h2>
        <p>
          The Commit Good Platform has five registered groups: Charity, Charity
          Coordinator, Volunteer, Patron, and NFT Creator. Charitable Projects
          are funded with $GOOD from NFT purchases while volunteers are rewarded
          for service.
        </p>
        <div className="how-it-works-main">
          <div className="how-it-works-col h-75">
            <div className="side-line "></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={CharityIcon} alt="" />
              </div>
              <h2>Charity</h2>
              <ul className="how-it-works-list">
                <li>We focus on humanitarian projects around the world.</li>
                <li>
                  We bring awareness and credibility to unknown charities.
                </li>
              </ul>
              <h2>Earn</h2>
              <ul className="how-it-works-list">
                <li>Receive 50% of $GOOD for NFT purchases.</li>
                <li>Charitable Donations</li>
                <li>Earn $GOOD reward at project completion.</li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col mt-0 mt-lg-5 pt-0 pt-lg-5">
            <div className="side-line"></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={CharityCoordinatorIcon} alt="" />
              </div>
              <h2>Charity Coordinator</h2>
              <ul className="how-it-works-list">
                <li>Verify that charities are legal and ethical entities.</li>
                <li>Assist with projects.</li>
                <li>Provide documentation that projects were completed.</li>
              </ul>
              <h2>Earn</h2>
              <ul className="how-it-works-list">
                <li>Receive 2% of $GOOD for NFT purchases</li>
                {/* <li>Charitable Donations</li> */}
                <li>Earn $GOOD reward at project completion.</li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col mt-0 mt-lg-5 h-75">
            <div className="side-line"></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={VolunteerIcon} alt="" />
              </div>
              <h2>Volunteer</h2>
              <ul className="how-it-works-list">
                <li>Volunteers are the lifeblood of Commit Good!</li>
                <li>
                  We are working to create a charitable economy by rewarding
                  acts of service.
                </li>
                <li>
                  Volunteers can use $GOOD rewards for Charitable NFT purchases.
                </li>
              </ul>
              <h2>Earn</h2>
              <ul className="how-it-works-list">
                <li>Volunteers receive $GOOD rewards for acts of service.</li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col mt-0 mt-lg-5 pt-0 pt-lg-5">
            <div className="side-line"></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={PatronIcon} alt="" />
              </div>
              <h2>Patron</h2>
              <ul className="how-it-works-list">
                <li>Purchase NFT’s to support Charitable projects.</li>
                <li>
                  Empower a Charitable Economy to make the world a better place.
                </li>
              </ul>
            </div>
          </div>
          <div className="how-it-works-col h-75">
            <div className="side-line "></div>
            <div className="how-it-works-content">
              <div className="pb-3">
                <img src={NFTCreatorIcon} alt="" />
              </div>
              <h2>NFT Creator</h2>
              <ul className="how-it-works-list">
                <li>
                  Create a Charitable NFT that combines Artistic and Reward
                  Incentive.
                </li>
                <li>Determine Reward and Purchase Price.</li>
              </ul>
              <h2>Earn</h2>
              <ul className="how-it-works-list">
                <li>Receive 40% of $GOOD for NFT purchases.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
