import GoodEconomyHeroSection from "../../components/goodEconomy/goodEconomyHeroSection";
import GovernanceSection from "../../components/goodEconomy/governanceSection";
import React, { useEffect } from "react";

export default function GoodEconomyComponent() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main">
      <GoodEconomyHeroSection />
      <GovernanceSection />
    </main>
  );
}
