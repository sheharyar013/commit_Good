import React from "react";
import {
  // LinkIcon,
  // SearchCardImageEight,
  // SearchCardImageFive,
  // SearchCardImageSeven,
  // SearchCardImageSix,
  UserIcon,
  WatchIcon,
} from "../../utils/images";
// import { Link } from "react-router-dom";

export default function TopSellingProject({ list, loading }) {
  return (
    <section className="top-selling-section">
      <div className="container">
        <h4>Commit Good</h4>
        <h2>Top Selling Collections</h2>
        {loading ? (
          <div className="loading-projects">Loading...</div>
        ) : (
          <div className="row">
            {list.map((item, index) => {
              return (
                <div key={index} className="col-lg-3 col-md-4 c0l-sm-6 mt-3">
                  <div className="search-card">
                    {/* <Link to="#">
                    <img src={LinkIcon} alt="" />
                  </Link> */}

                    <div className="card-img">
                      <img
                        src={item.image ?? ""}
                        alt=""
                        className="img-fluid"
                      />
                    </div>

                    <div className="card-content">
                      <div className="d-flex justify-content-between align-items-center">
                        <h2>{item.name}</h2>
                        <div className="profile-img">
                          <img src={UserIcon} alt="" />
                        </div>
                      </div>

                      <p>{item.description ?? ""}</p>
                    </div>

                    <div className="search-card-footer d-flex justify-content-between align-items-center">
                      <h4>
                        <span>Price :</span>
                        <span className="price-total">
                          ${item.price ?? 0} (USD)
                        </span>
                      </h4>

                      <h4 className="d-flex align-items-center">
                        <span className="mr-1">
                          <img src={WatchIcon} alt="" />
                        </span>
                        3 days left
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
