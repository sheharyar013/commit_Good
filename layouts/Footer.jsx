import { About, GoodEconomy, Home } from "../routes/routes";
import {
  CommitGoodNFTTermsDocs,
  CommitGoodTermsDocs,
  CommitGoodWiteDisclaimerDocs,
  CommitGoodWitePaperDocs2022V2,
} from "../utils/docs";
import {
  DiscordIcon,
  FbIcon,
  LogoFooter,
  TelegramIcon,
  TwitterIcon,
} from "../utils/images";
import { Link, NavLink, useHistory } from "react-router-dom";

import React from "react";
import { scrollToDiv } from "../utils/shared";

export default function Footer() {
  const history = useHistory();

  const redirectToSection = (e) => {
    e.preventDefault();
    history.push(Home);
    setTimeout(() => {
      scrollToDiv("how_it_works");
    }, 100);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-logo logo mb-3">
          <img src={LogoFooter} alt="" />
        </div>
        <div className="row py-4">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-links">
              <h2 className="footer-heading">Navigate</h2>
              <ul className="social-link-list">
                <li>
                  <a href={"/"} onClick={redirectToSection}>
                    How it Works
                  </a>
                </li>

                <li>
                  <NavLink activeClassName="active" exact={true} to={About}>
                    About Us
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    activeClassName="active"
                    exact={true}
                    to={GoodEconomy}
                  >
                    $GOOD Economy
                  </NavLink>
                </li>

                <li>
                  <a
                    href={CommitGoodWitePaperDocs2022V2}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Whitepaper
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer-links">
              <h2 className="footer-heading">Quick Links</h2>
              <ul className="social-link-list">
                <li>
                  <a
                    href={CommitGoodWiteDisclaimerDocs}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Disclaimer
                  </a>
                </li>

                <li>
                  <a
                    href={CommitGoodTermsDocs}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Terms & Conditions
                  </a>
                </li>

                <li>
                  <a
                    href={CommitGoodNFTTermsDocs}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    NFT Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-6">
            <div className="footer-links">
              <h2 className="footer-heading">Social</h2>
              <ul className="social-link-list">
                <li>
                  <Link
                    to={{
                      pathname: "https://www.facebook.com/CommitGood",
                    }}
                    target="_blank"
                  >
                    <span className="icon-box">
                      <img src={FbIcon} alt="" />
                    </span>
                    <span>Facebook</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "https://twitter.com/commitgdoffical",
                    }}
                    target="_blank"
                  >
                    <span className="icon-box">
                      <img src={TwitterIcon} alt="" />
                    </span>
                    <span>Twitter</span>
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to={{
                      pathname: "https://t.me/CommitGoodToken",
                    }}
                    target="_blank"
                  >
                    <span className="icon-box">
                      <img src={TelegramIcon} alt="" />
                    </span>
                    <span>Telegram</span>
                  </Link>
                </li> */}
                <li>
                  <Link
                    to={{
                      pathname: "https://discord.com/invite/wFhqeP69gv",
                    }}
                    target="_blank"
                  >
                    <span className="icon-box">
                      <img src={DiscordIcon} alt="" />
                    </span>
                    <span>Discord</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-lg-4 col-md-6  col-sm-6">
            <div className="footer-links">
              <h2 className="footer-heading">Disclaimer</h2>
              <p>
                Nothing on this Website shall constitute an offer of securities
                to any person or in any jurisdiction where the same may be
                prohibited. No offer or solicitation for investment of any kind
                will be made prior to the delivery of definitive documentation
                relating to the matters herein. Neither the SEC nor any state
                securities commission or regulatory authority approved, passed
                upon or endorsed the merits of any content provided on this
                website.
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <h3>© 2022 Commit Good, All rights reserved</h3>
        </div>
      </div>
    </footer>
  );
}
