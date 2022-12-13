import PropTypes from "prop-types";
import { FormInput } from "../../shared/FormInput";
import { FormTextArea } from "../../shared/TextArea";
import { Fragment } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import React from "react";

export default function ProjectGoalStep(props) {
  const {
    onSubmit,
    values,
    onVolunteerChange,
    onAddVolunteer,
    onRemoveVolunteer,
  } = props;

  if (props.createProjectId !== 1) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <h2 className="wizard-heading">How Can we Help?</h2>
        <div className="volunteer-wrapper">
          <h4>Volunteer opportunities</h4>
          {/* <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's
          </p> */}
        </div>
        <div className="wizard-form">
          {values.volunteers?.map((item, idx) => (
            <Fragment key={idx}>
              <div className="wizard-form-group mb-3">
                <FormInput
                  label="Title"
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  onChange={(e) => onVolunteerChange(e, idx)}
                  value={item?.title}
                />

                <FormInput
                  label="Number of volunteers"
                  type="number"
                  placeholder="Number of  volunteers"
                  name="number"
                  onChange={(e) => onVolunteerChange(e, idx)}
                  value={item?.number}
                  min={0}
                />

                <FormInput
                  label="Number of Hours Per volunteers"
                  type="number"
                  placeholder="Number of Hours Per volunteers"
                  name="hours"
                  onChange={(e) => onVolunteerChange(e, idx)}
                  value={item?.hours}
                  min={0}
                />
              </div>
              <FormTextArea
                label="Description"
                name="description"
                placeholder="Enter Details"
                onChange={(e) => onVolunteerChange(e, idx)}
                value={item?.description}
                required
              />

              {idx > 0 ? (
                <div className="remove-opportunity-btn mb-4 justify-content-end">
                  <button onClick={() => onRemoveVolunteer(idx)}>
                    Remove Opportunity
                  </button>
                </div>
              ) : null}
              <hr />
            </Fragment>
          ))}
          <div className="remove-opportunity-btn mb-4">
            <button onClick={onAddVolunteer}>
              + Add Additional Volunteers
            </button>
          </div>
          <div className="step-buttons mb-5">
            <div>
              <button
                // className="back-btn"
                onClick={() => props.setcreateProjectId(0)}
              >
                <span className="mr-1">
                  <IoArrowBack />
                </span>
                Back
              </button>
              <button onClick={onSubmit}>
                Next
                <span className="ml-1">
                  <IoArrowForward />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ProjectGoalStep.propTypes = {
  createProjectId: PropTypes.number.isRequired,
  onRemoveVolunteer: PropTypes.func.isRequired,
  onAddVolunteer: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onVolunteerChange: PropTypes.func,
  setcreateProjectId: PropTypes.func,
  values: PropTypes.shape({
    volunteers: PropTypes.array,
  }),
};
