import PropTypes from "prop-types";
import { IoArrowBack } from "react-icons/io5";
import React from "react";

export default function UserRegionStep(props) {
  const {
    values: { user },
    onValueChange,
    onRegister,
    cityCountries,
    isSubmitting,
  } = props;
  const { countries, cities, states, onCountryChange, onStateChange } =
    cityCountries;

  const onUserInfoChange = (e) => {
    onValueChange(e, "user");
  };

  return (
    <>
      {props.regId === 1 ? (
        <section>
          <form onSubmit={onRegister} className={"needs-validation"}>
            <div className="container">
              <div className="wizard-form">
                <div className="mb-3 wizard-form-group">
                  <div className="input-form">
                    <label htmlFor="">
                      Address Line 1{" "}
                      <span className="required-attribute text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter Address"
                      name="address_line1"
                      onChange={onUserInfoChange}
                      value={user.address_line1}
                    />
                  </div>
                  <div className="input-form">
                    <label htmlFor="">Address Line 2</label>
                    <input
                      type="text"
                      placeholder="Enter Address 2 (Optional)"
                      name="address_line2"
                      onChange={onUserInfoChange}
                      value={user.address_line2}
                    />
                  </div>
                  <div className="input-form">
                    <label htmlFor="">
                      Country{" "}
                      <span className="required-attribute text-danger">*</span>
                    </label>
                    <select
                      name="address_country"
                      id=""
                      required
                      onChange={(e) => {
                        onUserInfoChange(e);
                        onCountryChange(e);
                      }}
                      value={user.address_country}
                    >
                      <option value="">Please Select Country</option>
                      {countries.map(({ name }) => (
                        <option value={name} key={name + Math.random()}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-form">
                    <label htmlFor="">
                      State / Province{" "}
                      {states.length > 0 ? (
                        <span className="required-attribute text-danger">
                          *
                        </span>
                      ) : null}
                    </label>
                    <select
                      name="address_state"
                      id=""
                      required={states.length > 0}
                      onChange={(e) => {
                        onUserInfoChange(e);
                        onStateChange(e);
                      }}
                      value={user.address_state}
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
                      City{" "}
                      {cities.length > 0 ? (
                        <span className="required-attribute text-danger">
                          *
                        </span>
                      ) : null}
                    </label>
                    <select
                      name="address_city"
                      id=""
                      required={cities.length > 0}
                      onChange={onUserInfoChange}
                      value={user.address_city}
                    >
                      <option value="">Please Select City</option>
                      {cities.map(({ name }) => (
                        <option value={name} key={name + Math.random()}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-form">
                    <label htmlFor="">
                      Zip / Postal Code
                      {/* <span className='required-attribute text-danger'>*</span> */}
                    </label>
                    <input
                      type="text"
                      // required
                      placeholder="Enter Zip / Postal Code"
                      name="address_zip"
                      min={3}
                      max={8}
                      onChange={onUserInfoChange}
                      value={user.address_zip}
                    />
                  </div>
                </div>
                <div className="mb-5 step-buttons">
                  <div>
                    <button
                      className="back-btn"
                      onClick={() => props.setregId(0)}
                    >
                      <span>
                        <IoArrowBack />
                      </span>
                      Back
                    </button>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        ""
      )}
    </>
  );
}

UserRegionStep.propTypes = {
  cityCountries: PropTypes.shape({
    cities: PropTypes.array.isRequired,
    countries: PropTypes.array.isRequired,
    onCountryChange: PropTypes.func.isRequired,
    onStateChange: PropTypes.func.isRequired,
    states: PropTypes.array.isRequired,
  }),
  onRegister: PropTypes.func,
  onValueChange: PropTypes.func,
  regId: PropTypes.number,
  setregId: PropTypes.func,
  values: PropTypes.shape({
    user: PropTypes.shape({
      address_line1: PropTypes.string,
      address_line2: PropTypes.string,
      address_country: PropTypes.string,
      address_state: PropTypes.string,
      address_city: PropTypes.string,
      address_zip: PropTypes.string,
    }),
  }),
  isSubmitting: PropTypes.bool,
};
