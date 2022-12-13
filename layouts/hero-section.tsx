import React from "react";

export default function HeroSection({ heading }: { heading: string }) {
  return (
    <section className="about-hero-section">
      <div className="about-hero-content">
        <h2>{heading}</h2>
        <nav className="bread-crumb-custom" aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" onClick={(e) => e.preventDefault()}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {heading}
            </li>
          </ol>
        </nav>
      </div>
    </section>
  );
}
