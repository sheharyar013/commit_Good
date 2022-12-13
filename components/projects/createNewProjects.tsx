import PropTypes from "prop-types";
import { CreateProject } from "../../routes/routes";
import { Link } from "react-router-dom";
import React from "react";

type NewProjectProps = {
  onFilterMyProjects?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filterMyProjects?: boolean;
  isHome?: boolean;
};

export default function CreateNewProjectButton({
  onFilterMyProjects,
  filterMyProjects,
  isHome,
}: NewProjectProps) {
  return (
    <div className="container">
      <div className="text-right create-new-project-btn d-flex justify-content-end gap-3 align-items-center">
        {!isHome ? (
          <div className="d-flex align-items-center mr-5 position-relative project-filter">
            <input
              type="checkbox"
              id="filter"
              className="w-auto"
              checked={filterMyProjects}
              onChange={onFilterMyProjects}
            />
            <label className="mb-0 ml-3" htmlFor="filter">
              My Projects
            </label>
          </div>
        ) : null}
        <div>
          <Link to={CreateProject}>Create New Project</Link>
        </div>
      </div>
    </div>
  );
}

CreateNewProjectButton.propTypes = {
  isHome: PropTypes.bool,
  filterMyProjects: PropTypes.bool,
  onFilterMyProjects: PropTypes.func,
};
