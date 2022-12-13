import React, { memo, useEffect, useState } from "react";

import CreateNewProjectButton from "../../components/projects/createNewProjects";
import { ERole } from "../../interfaces/user";
import ProjectsHeroSection from "../../components/projects/projectsHeroSection";
import SearchResults from "../../components/home-commit/SearchResultSection";
import SearchSection from "../../components/home-commit/searchSection";
import { getSessionUser } from "../../utils/auth";
import { useCountryCity } from "../../hooks/useCountryCity";
import { useLocation } from "react-router-dom";

function Projects() {
  const { state } = useLocation<{ country?: string; project?: string }>();
  const { countries } = useCountryCity();
  const [country, setCountry] = useState<string>(state?.country ?? "");
  const [projectName, setProjectName] = useState<string>(state?.project ?? "");
  const [filterMyProjects, setFilterMyProjects] = useState<boolean>(false);

  const onFilterMyProjects = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = target;
    setFilterMyProjects(checked);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <main className="main">
      <ProjectsHeroSection />
      <SearchSection
        countries={countries}
        country={country}
        setCountry={setCountry}
        projectName={projectName}
        setProjectName={setProjectName}
      />
      {getSessionUser()?.role === ERole.charity ? (
        <CreateNewProjectButton
          isHome={false}
          filterMyProjects={filterMyProjects}
          onFilterMyProjects={onFilterMyProjects}
        />
      ) : null}
      <SearchResults
        country={country}
        projectName={projectName}
        isHome={false}
        filterMyProjects={filterMyProjects}
      />
    </main>
  );
}

export default memo(Projects);
