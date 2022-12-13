import React from "react";
import { AboutUsImage } from "../../utils/images";

export default function AboutUs() {
  return (
    <section className="about-us-section">
      <div className="container">
        <div className="row">
          <div className=" col-md-6 col-lg-5 d-flex align-items-center">
            <div className="about-us-content">
              <h4>About us</h4>
              <h2>Let’s Build A Charitable Economy Together</h2>
              <p>
                Commit Good is a Philanthropic Ecosystem built on the Solana
                Blockchain powered by Charitable NFT purchases. We are a
                Humanitarian Project platform that rewards Volunteers for
                service with our $GOOD Token, disrupting the way Charities and
                Volunteers have traditionally functioned.
              </p>
              <p>
                Our long-term focus is to create a Global Charitable Economy. We
                are connecting Artists, Charities, Patrons, Businesses and
                Volunteers alike as we expand into the Meta-verse.
              </p>
              {/* <button>Explore More</button> */}
            </div>
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className="about-us-image">
              <img src={AboutUsImage} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
