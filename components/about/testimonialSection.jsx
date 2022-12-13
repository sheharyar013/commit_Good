import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { QuotesIcon, UserTestimonialImage } from "../utils/images";

import React from "react";
import Slider from "react-slick";

export default function Testimonial() {
  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="collectionSliderArrow"
        style={{ ...style }}
        onClick={onClick}
      >
        <span>
          <BsArrowRight />
        </span>
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="collectionSliderArrowPrev"
        style={{ ...style }}
        onClick={onClick}
      >
        <span>
          <BsArrowLeft />
        </span>
      </div>
    );
  }

  const settings = {
    arrow: false,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <h4>Our</h4>
        <h2>Testimonials</h2>
        <div className="testimonial-main mt-5">
          <Slider {...settings}>
            <div>
              <div className="slider-item">
                <div className="quotes-icon">
                  <img src={QuotesIcon} alt="" />
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="user-info">
                  <div className="user-img">
                    <img src={UserTestimonialImage} alt="" />
                  </div>
                  <h5>john smith</h5>
                  <h6>Founder of Commit Good</h6>
                </div>
              </div>
            </div>
            <div>
              <div className="slider-item">
                <div className="quotes-icon">
                  <img src={QuotesIcon} alt="" />
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="user-info">
                  <div className="user-img">
                    <img src={UserTestimonialImage} alt="" />
                  </div>
                  <h5>john smith</h5>
                  <h6>Founder of Commit Good</h6>
                </div>
              </div>
            </div>
            <div>
              <div className="slider-item">
                <div className="quotes-icon">
                  <img src={QuotesIcon} alt="" />
                </div>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <div className="user-info">
                  <div className="user-img">
                    <img src={UserTestimonialImage} alt="" />
                  </div>
                  <h5>john smith</h5>
                  <h6>Founder of Commit Good</h6>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}
