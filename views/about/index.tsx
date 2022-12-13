import AboutHeroSection from "../../components/about/aboutHeroSection";
import AboutTeam from "../../components/about/aboutTeam";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader } from "../../shared/Loader/Loader";

const OurAdvisor = dynamic(() => import("../../components/about/ourAdvisors"), {
  loading: () => <Loader />,
});

export default function About() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <main className="main">
      <AboutHeroSection />
      <AboutTeam />
      <OurAdvisor />
      {/* <Testimonial /> */}
    </main>
  );
}
