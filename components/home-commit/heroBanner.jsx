import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {
  ArrowNextIcon,
  ArrowPrevIcon,
  HeroBannerImage,
} from "../../utils/images";

import React from "react";
import Slider from "react-slick";
export default function HeroBanner() {
  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="collectionSliderArrow hero-section-icon-next"
        style={{ ...style }}
        onClick={onClick}
      >
        <span>
          <img src={ArrowNextIcon} alt={"arrow-next"} />
        </span>
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="collectionSliderArrowPrev hero-section-icon-prev"
        style={{ ...style }}
        onClick={onClick}
      >
        <span>
          <img src={ArrowPrevIcon} alt={"arrow-prev"} />
        </span>
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-12 col-md-12 hero-content-main">
            <div className="hero-content">
              <h3>
                Charities Post Projects. <br /> Projects Are Funded with
                Charitable Reward NFT’s. <br /> Volunteers Earn $GOOD.
                <br />
                Charitable Projects Are Now on The Blockchain.
              </h3>
              {/* <button>Explore More</button> */}
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 banner-right-bg">
            <Slider {...settings}>
              <div className="hero-banner-img">
                <img src={HeroBannerImage} alt="" className="img-fluid" />
              </div>
              <div className="hero-banner-img">
                <img src={HeroBannerImage} alt="" className="img-fluid" />
              </div>
              <div className="hero-banner-img">
                <img src={HeroBannerImage} alt="" className="img-fluid" />
              </div>
              <div className="hero-banner-img">
                <img src={HeroBannerImage} alt="" className="img-fluid" />
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
