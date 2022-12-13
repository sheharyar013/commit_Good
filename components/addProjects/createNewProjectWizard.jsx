import React from "react";
import PropTypes from "prop-types";
import {
  IoFlagOutline,
  IoFootstepsOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
export default function CreateNewProjectWizard({ createProjectId }) {
  return (
    <section className="wizard-section">
      <div className="container">
        {createProjectId === 0 ? (
          <div className="steps-container">
            <div className="progress-container">
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoInformationCircleOutline />
                    </span>
                  </p>
                </div>
                <h4>About</h4>
              </div>
              <div className="progress-line"></div>
              <div className="step-wizard">
                <div className="circle">
                  <p>
                    <span className="span-p">
                      <IoFlagOutline />
                    </span>
                  </p>
                </div>
                <h4>Goals</h4>
              </div>
              <div className="progress-line"></div>
              <div className="step-wizard">
                <div className="circle">
                  <p>
                    <span className="span-p">
                      <IoFootstepsOutline />
                    </span>
                  </p>
                </div>
                <h4>Footprint</h4>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {createProjectId === 1 ? (
          <div className="steps-container">
            <div className="progress-container auth-wizard-step">
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoInformationCircleOutline />
                    </span>
                  </p>
                </div>
                <h4>About</h4>
              </div>
              <div className="progress-line active"></div>
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoFlagOutline />
                    </span>
                  </p>
                </div>
                <h4>Goals</h4>
              </div>
              <div className="progress-line"></div>
              <div className="step-wizard">
                <div className="circle">
                  <p>
                    <span className="span-p">
                      <IoFootstepsOutline />
                    </span>
                  </p>
                </div>
                <h4>Footprint</h4>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {createProjectId === 2 ? (
          <div className="steps-container">
            <div className="progress-container auth-wizard-step">
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoInformationCircleOutline />
                    </span>
                  </p>
                </div>
                <h4>About</h4>
              </div>
              <div className="progress-line active"></div>
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoFlagOutline />
                    </span>
                  </p>
                </div>
                <h4>Goals</h4>
              </div>
              <div className="progress-line active"></div>
              <div className="step-wizard active">
                <div className="circle active">
                  <p>
                    <span className="span-p">
                      <IoFootstepsOutline />
                    </span>
                  </p>
                </div>
                <h4>Footprint</h4>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

CreateNewProjectWizard.propTypes = {
  createProjectId: PropTypes.number.isRequired,
};
