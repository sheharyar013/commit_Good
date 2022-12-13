import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Uploader from "../wallet/uploader";
import {
  getAreasOfInterest,
  getCoordinators,
} from "../../utils/services/actions";
import React from "react";
import { FormInput } from "../../shared/FormInput";
import { ERole } from "../../interfaces/user";

export const CharityInfo = ({ values, onAllianceChange, onPdfChange }) => {
  const [projectCoordinations, setProjectCoordinators] = useState([]);
  const [areasOfInterests, setAreasOfInterests] = useState([]);

  const { alliance, user } = values;

  const getData = async () => {
    const interest = await getAreasOfInterest();
    const coordinators = await getCoordinators();
    setProjectCoordinators(coordinators.data);
    setAreasOfInterests(interest.data);
  };

  useEffect(() => {
    if (
      user.member_type === ERole.charity &&
      !projectCoordinations.length &&
      !areasOfInterests.length
    ) {
      getData();
    }
  }, [user, projectCoordinations.length, areasOfInterests.length]);

  if (user.member_type !== ERole.charity) {
    return null;
  }

  return (
    <div className="charity-info">
      <h2>Your Charity Info</h2>
      {alliance.map((item, idx) => (
        <div className="wizard-form-group" key={idx}>
          <div className="input-form">
            <label htmlFor="">
              Project Coordinator{" "}
              {/* <span className="required-attribute text-danger">*</span> */}
            </label>
            <select
              name="campaign_coordinator_id"
              // required
              value={item.campaign_coordinator_id}
              onChange={(e) => onAllianceChange(e, idx)}
            >
              <option value="">Select Coordinator</option>
              <DropDownList list={projectCoordinations} />
            </select>
          </div>
          <div className="input-form">
            <label htmlFor="">
              Area of Interest{" "}
              {/* <span className="required-attribute text-danger">*</span> */}
            </label>
            <select
              name="area_of_interest_id"
              onChange={(e) => onAllianceChange(e, idx)}
              value={item.area_of_interest_id}
              // required
            >
              <option value="">Please Select</option>
              <DropDownList list={areasOfInterests} />
            </select>
          </div>

          <FormInput
            placeholder="Website URL"
            label="Website URL"
            name="website_url"
            type="url"
            required={false}
            onChange={(e) => onAllianceChange(e, idx)}
            value={item.website_url}
          />
          <FormInput
            label="Facebook URL"
            type="url"
            required={false}
            placeholder="Facebook URL"
            name="facebook_url"
            onChange={(e) => onAllianceChange(e, idx)}
            value={item.facebook_url}
          />
          <FormInput
            label="Twitter URL"
            type="url"
            required={false}
            placeholder="Twitter URL"
            name="twitter_url"
            onChange={(e) => onAllianceChange(e, idx)}
            value={item.twitter_url}
          />

          <div className="input-form-desc-reg input-form">
            <label htmlFor="" className="w-100">
              Description{" "}
              <span className="required-attribute text-danger">*</span>
            </label>
            <textarea
              cols="100"
              className="form-control"
              rows="5"
              name="description"
              onChange={(e) => onAllianceChange(e, idx)}
              value={item.description}
              required
            />
          </div>

          <div className="input-form">
            <label htmlFor="">
              Charity Verification Document
              <small className="ml-2">
                (File Must be PDF or Docs)
                <span className="required-attribute text-danger ml-1">*</span>
              </small>
            </label>
            <Uploader
              accept="application/pdf"
              handleImageChange={onPdfChange}
              name={"verification_doc"}
              index={idx}
              initialFiles={
                item.verification_doc ? [item.verification_doc] : []
              }
            />
          </div>

          <div className="input-form">
            <label htmlFor="">
              Charity Logo
              <small className="ml-2">
                (File Must be .Png or Jpeg)
                <span className="required-attribute text-danger ml-1">*</span>
              </small>
            </label>
            <Uploader
              name={"logo"}
              index={idx}
              handleImageChange={onPdfChange}
              initialFiles={item.logo ? [item.logo] : []}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

CharityInfo.propTypes = {
  onAllianceChange: PropTypes.func,
  onPdfChange: PropTypes.func,
  values: PropTypes.shape({
    alliance: PropTypes.array,
    user: PropTypes.shape({
      member_type: PropTypes.any,
    }),
  }),
};

const DropDownList = ({ list }) => {
  return (
    <>
      {list.map(({ id, name }) => (
        <option value={id} key={id}>
          {name}
        </option>
      ))}
    </>
  );
};

DropDownList.propTypes = {
  list: PropTypes.array,
};
