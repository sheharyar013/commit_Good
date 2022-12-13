import PropTypes from "prop-types";
import { FormTextArea } from "../../shared/TextArea";
import { IoArrowBack, IoSave } from "react-icons/io5";
import React from "react";
import { useCountryCity } from "../../hooks/useCountryCity";
import { FormInput } from "../../shared/FormInput";

export default function ProjectFootPrintStep(props) {
  const { countries, cities, states, onCountryChange, onStateChange } = props;

  const { onChange, values, onSubmit } = props;

  if (props.createProjectId !== 2) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <h2 className="wizard-heading">Project Footprint</h2>
        <div className="wizard-form">
          <div className="wizard-form-group mb-3">
            <div className="input-form">
              <label htmlFor="">
                Country <span className="text-danger">*</span>
              </label>
              <select
                name="address_country"
                id=""
                onChange={(e) => {
                  onChange(e);
                  onCountryChange(e);
                }}
                value={values.address_country}
                required
              >
                <option value="">Select Country</option>
                {countries.map(({ name }) => (
                  <option value={name} key={name + Math.random()}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-form">
              <label htmlFor="">
                State/Province <span className="text-danger">*</span>
              </label>
              <select
                name="address_state"
                id=""
                required
                onChange={(e) => {
                  onChange(e);
                  onStateChange(e);
                }}
                value={values.address_state}
              >
                <option value="">Please Select State</option>
                {states.map(({ name }) => (
                  <option value={name} key={name + Math.random()}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-form">
              <label htmlFor="">
                City <span className="text-danger">*</span>
              </label>
              <select
                name="address_city"
                id=""
                required
                onChange={onChange}
                value={values.address_city}
              >
                <option value="">Please Select City</option>
                {cities.map(({ name }) => (
                  <option value={name} key={name + Math.random()}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <FormInput
              label="Zip/Postal Code"
              type="text"
              placeholder="Zip/Postal Code"
              name="address_zip"
              onChange={onChange}
              value={values.address_zip}
              required={false}
              minLength={3}
              maxLength={10}
            />
          </div>
          <FormTextArea
            label="Project Category"
            name=""
            id=""
            rows="5"
            placeholder="Enter Details"
          />
          <div className="step-buttons mb-5">
            <div>
              <button
                // className="back-btn"
                onClick={() => props.setcreateProjectId(1)}
              >
                <span className="mr-1">
                  <IoArrowBack />
                </span>
                Back
              </button>
              <button onClick={onSubmit}>
                Save
                <span className="ml-1">
                  <IoSave />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ProjectFootPrintStep.propTypes = {
  createProjectId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setcreateProjectId: PropTypes.func,
  values: PropTypes.shape({
    address_city: PropTypes.string,
    address_country: PropTypes.string,
    address_state: PropTypes.string,
    address_zip: PropTypes.string,
  }),
};
