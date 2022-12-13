import { FormInput } from "../../shared/FormInput";
import { FormTextArea } from "../../shared/TextArea";
import PropTypes from "prop-types";
import React from "react";
import Uploader from "../wallet/uploader";
import { IoArrowForward } from "react-icons/io5";
import { useGoodTokenPrice } from "../../hooks/useGoodPrice";

export default function ProjectDetailStep(props) {
  const { onChange, onSubmit, values, onFileChange } = props;
  const { price } = useGoodTokenPrice();
  if (props.createProjectId !== 0) {
    return null;
  }

  return (
    <section>
      <div className="container">
        <h2 className="wizard-heading">Project Details</h2>
        <div className="wizard-form">
          <div className="wizard-form-group mb-3">
            <FormInput
              label="Title"
              type="text"
              placeholder="Enter Title"
              name="name"
              onChange={onChange}
              value={values.name}
              required
            />
            <FormInput
              label="Time frame"
              type="number"
              placeholder="30 days"
              name="time_length"
              onChange={onChange}
              value={values.time_length}
              min={0}
              required
            />
          </div>
          <div className="wizard-form-group mb-3">
            <FormInput
              label="Expiration Date"
              type="date"
              placeholder=""
              name="expiration_date"
              onChange={onChange}
              value={values.expiration_date}
              max="2050-12-31"
              min={new Date().toLocaleDateString("en-ca")}
              required
            />
            <FormInput
              label="Goal Amount (USDT)"
              type="number"
              placeholder="Amount in USDT"
              name="goal_amount"
              onChange={onChange}
              value={values.goal_amount}
              min={0}
              required
            />
            {values?.goal_amount && (
              <span className="last_price">
                {values?.goal_amount + " USDT"} ={" "}
                {(values?.goal_amount / price).toFixed(2) + " (in $GOOD)"}
              </span>
            )}
          </div>
          <FormTextArea
            label="Description"
            id=""
            rows="5"
            name="description"
            onChange={onChange}
            value={values.description}
            placeholder="Enter Description"
            required
          />

          <div className="upload-file-create-project mb-3">
            <Uploader
              handleImageChange={onFileChange}
              multiple
              initialFiles={values.images}
            />
          </div>
          <div className="step-buttons mb-5">
            <button onClick={onSubmit}>
              Next{" "}
              <span className="ml-1">
                <IoArrowForward />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

ProjectDetailStep.propTypes = {
  createProjectId: PropTypes.number,
  onChange: PropTypes.func,
  onFileChange: PropTypes.func,
  onSubmit: PropTypes.func,
  values: PropTypes.shape({
    description: PropTypes.any,
    expiration_date: PropTypes.any,
    goal_amount: PropTypes.any,
    name: PropTypes.any,
    time_length: PropTypes.any,
    images: PropTypes.array,
  }),
};
