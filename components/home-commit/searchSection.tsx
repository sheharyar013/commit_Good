import PropTypes from "prop-types";
import React, { memo } from "react";
import { SearchIcon } from "../../utils/images";

type SearchSectionProps = {
  countries: { name: string; country_code: string }[];
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  projectName: string;
  setProjectName: React.Dispatch<React.SetStateAction<string>>;
};

function SearchSection({
  countries,
  country,
  setCountry,
  projectName,
  setProjectName,
}: SearchSectionProps) {
  return (
    <section className="search-section">
      {/* <h3 className="sub-heading">Our</h3> */}
      <h2 className="main-heading">Projects</h2>
      <div className="container">
        <div className="search-main">
          <div className="select-country">
            <label htmlFor="">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              title="country"
            >
              <option value="">Select Country</option>
              {countries?.map((item, index) => (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="search-input">
            <label htmlFor="">Project Name</label>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <span>
                <img src={SearchIcon} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SearchSection.propTypes = {
  countries: PropTypes.array,
  country: PropTypes.string,
  projectName: PropTypes.string,
  setCountry: PropTypes.func,
  setProjectName: PropTypes.func,
};

export default memo(SearchSection);
