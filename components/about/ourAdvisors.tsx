import {
  ChandlerBowersImage,
  DianaAdachiImage,
  KristenBakerGeczyImage,
  DougHunterImage,
  HarryLoubserImage,
  JamieJordanImage,
  JorgeRianoImage,
} from "../../utils/images";

import React from "react";

export default function OurAdvisor() {
  return (
    <section className="about-team">
      <div className="container">
        {/* <h3 className="sub-heading">Our</h3> */}
        <h2>Advisors</h2>
        <div className="row mt-5">
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={DianaAdachiImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Diana Adachi</h3>
                <h4>Advisor</h4>
                <p>
                  Diana’s been applying her passion for blockchain and payments
                  to the underserved markets for years. Previously, Diana was
                  the CEO for the Yaka Ecosystem a global, closed loop payment
                  system in Silicon Valley and a Global Blockchain Lead for
                  Accenture.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={JamieJordanImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Jamie Jordan</h3>
                <h4>Advisor</h4>
                <p>
                  Jamie Jordan is a global award winning, industry leader with
                  over 25 years of experience as an entrepreneur, consultant and
                  leader in technology, healthcare, renewable energy,
                  manufacturing and service environments.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img
                  src={KristenBakerGeczyImage}
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="advisor-card-content">
                <h3>Kristen Baker-Geczy</h3>
                <h4>Advisor</h4>
                <p>
                  Kristen Baker-Geczy (pronounced geh-zee) is a PR specialist
                  with nearly 20 years of experience helping nonprofits and
                  small businesses share their story through media. A graduate
                  of the University of West Florida, Kristen is passionate
                  about.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={DougHunterImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Doug Hunter</h3>
                <h4>Chief Connector and Coach</h4>
                <p>
                  As a Connector and Coach, Doug serves in multiple executive
                  roles in Marketplace Ministry with Organizations around the
                  globe.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={ChandlerBowersImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Chandler Bowers</h3>
                <h4>Advisor</h4>
                <p>
                  Chandler Bowers is a corporate and technology attorney who
                  focuses his practice on advising startup and emerging
                  companies.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={HarryLoubserImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Harry Loubser</h3>
                <h4>Advisor</h4>
                <p>
                  Harry serves as Executive Director of Unashamedly Ethical. He
                  has a rich background in the church & ministry, business and
                  non-profit environment.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mt-4">
            <div className="advisor-card">
              <div className="advisor-img">
                <img src={JorgeRianoImage} className="img-fluid" alt="" />
              </div>
              <div className="advisor-card-content">
                <h3>Jorge Riano </h3>
                <h4>Advisor</h4>
                <p>
                  Jorge started GreenBy3 eight years ago to help business owners
                  improve the process of working with the construction industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
