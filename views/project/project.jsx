import React, { useEffect, useState } from "react";

import CollectNFT from "../../components/project/collectNFT";
import Footer from "../../layouts/Footer";
import NavbarTop from "../../layouts/Navbar";
import ProjectHeroSection from "../../components/project/projectHeroSection";
import TopSellingProject from "../../components/project/topSellingProject";
import { getWalletTokens } from "../../utils/services/actions";

export default function Project() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const populateTokens = () => {
    setLoading(true);
    getWalletTokens(`?offset=0&limit=100`)
      .then((resp) => {
        setList(resp);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    populateTokens();
  }, []);

  return (
    <main className="main">
      <NavbarTop />
      <ProjectHeroSection />
      {/* <ProjectDetail /> */}
      <TopSellingProject list={list} loading={loading} />
      <CollectNFT />
      <Footer />
    </main>
  );
}
