import {
  ClayBraswellImage,
  PastorMarcelImage,
  ShaunRatliffImage,
  SolomonNkwochaImage,
  kainatImage,
  AndreDublinImage,
  PaulaHeadShot,
} from "../../utils/images";

import React from "react";

export default function AboutTeam() {
  return (
    <section className="about-team">
      <div className="container">
        {/* <h3 className="sub-heading">Our</h3> */}
        <h2>Committed Team</h2>
        <div className="row mt-5">
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={ClayBraswellImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Clay Braswell</h3>
                <h4>Founder & CEO</h4>
                <p>
                  Clay is the Founder & CEO of Commit Good. A social
                  entrepreneur with over 15 years experience in applying
                  technology solutions to charitable organizations. He has
                  designed and built multiple large-scale enterprise grade
                  applications that have had real-life community impact.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={PaulaHeadShot} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Paula Dezzutti</h3>
                <h4>President</h4>
                <p>
                  Paula is a sought after speaker and thought leader in
                  entrepreneurship. She owns several companies and is pioneer in
                  blockchain brand adoption. She has won numerous awards
                  including International Woman of the Year.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={AndreDublinImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Andre Dublin</h3>
                <h4>CTO</h4>
                <p>
                  Andre is the CTO at Commit Good. He has experience developing
                  software for e-commerce, banking, ETL reporting, game servers
                  and advertising. Using pragmatic principles he has
                  successfully built systems with practiced software
                  architecture disciplines. He first came into contact with the
                  blockchain in 2013 by mining BTC.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={ShaunRatliffImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Shaun Ratliff</h3>
                <h4>Marketing Director</h4>
                <p>
                  Shaun is the marketing director for Commit Good. He has an
                  extensive agency background in developing, implementing and
                  managing brands over the last 20 years. During that time, he
                  also had the pleasure to work with many non-profit groups and
                  experience their needs first hand.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={SolomonNkwochaImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Solomon B. Nkwocha</h3>
                <h4>Executive Director, Global Charity Coordinators</h4>
                <p>
                  Solomon immigrated to the United States in 1984 to further his
                  education and joined the military. He participated in several
                  deployments to the Persian Gulf and earned several awards
                  including the Navy Meritorious Service medal. He was selected
                  as one of six leading engineers to deploy the first ever
                  broadband wireless communications at the White House.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={PastorMarcelImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3>Pastor Marcel Chukwuemeka Ezeorah</h3>
                <h4>Executive Director, Continent of Africa Charitable</h4>
                <p>
                  The General Overseer Of The Throne Of God And Fire Ministries
                  Worldwide with headquarters located in Anambra State Nigeria
                  with over 1,000,000 membership spanned across the continent.
                  Pastor M.C. runs free community food programs for the
                  extremely poor, needy and homeless.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 mb-4">
            <div className="team-card-main">
              <div className="team-member-img">
                <img src={kainatImage} alt="" />
              </div>
              <div className="team-member-info">
                <h3> Kainat Kamran</h3>
                <h4> Community Manager</h4>
                <p>
                  Kainat is the Community Manager for Commit Good. Along with a
                  Liberal Arts and Science degree she has completed the MIT
                  Blockchain Technologies program. She is breaking into the
                  Community Manager space after having worked with multiple
                  cryptocurrencies and NFT projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
