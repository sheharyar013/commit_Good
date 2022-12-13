import { Projects, SignUp } from "../../routes/routes";
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { getSessionUser, isLoggedIn } from "../../utils/auth";

import { CheckIfGetParamExistsInUrl } from "../../utils/check-get-param-exists";
import HeroBanner from "../../components/home-commit/heroBanner";
import StepToBuyNFT from "../../components/home-commit/stepToBuyNFTSection";
import dynamic from "next/dynamic";
import { roleNames } from "../../constants/constants";
import { useCountryCity } from "../../hooks/useCountryCity";

const CreateNewProjectButton = dynamic(
  () => import("../../components/projects/createNewProjects"),
  { ssr: false }
);

const HowItWorks = dynamic(
  () => import("../../components/home-commit/howItWorks"),
  { ssr: false }
);

const SearchSection = dynamic(
  () => import("../../components/home-commit/searchSection"),
  { ssr: false }
);

const SearchResults = dynamic(
  () => import("../../components/home-commit/SearchResultSection"),
  { ssr: false }
);

const AboutUs = dynamic(() => import("../../components/home-commit/aboutUs"), {
  ssr: false,
});

export default function Home(): React.ReactElement {
  const [country, setCountry] = useState<string>("");
  const [projectName, setProjectName] = useState<string>("");
  const { countries } = useCountryCity();
  const getGlobalIdCode = CheckIfGetParamExistsInUrl("code");
  const { push } = useHistory();

  if (getGlobalIdCode) {
    return (
      <Redirect
        to={{
          pathname: SignUp,
          state: getGlobalIdCode,
        }}
      />
    );
  }

  const onViewMoreClick = () => {
    push(Projects, {
      country,
      project: projectName,
    });
  };

  return (
    <>
      <HeroBanner />
      <HowItWorks />

      <SearchSection
        countries={countries}
        country={country}
        setCountry={setCountry}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      {isLoggedIn() && getSessionUser()?.role === roleNames.charity ? (
        <CreateNewProjectButton isHome={true} />
      ) : null}
      <SearchResults
        country={country}
        projectName={projectName}
        isHome={true}
      />
      <div className="text-center">
        <button
          type="button"
          className="btn-connect-wallet p-3"
          onClick={onViewMoreClick}
        >
          View More
        </button>
      </div>
      <AboutUs />

      <StepToBuyNFT />
    </>
  );
}
