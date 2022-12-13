import React from "react";
import PropTypes from "prop-types";
export const FormInput = (props) => {
  const {
    label,
    required = true,
    onChange,
    type = "text",
    placeholder,
    name,
    value = "",
    readOnly = false,
    disabled = false,
    hasError = false,
    min = undefined,
    max = undefined,
    minLength = undefined,
    maxLength = undefined,
    errorMessage = "",
    wrapperClassName = undefined,
    autoComplete = undefined,
  } = props;
  const ErrorDiv =
    hasError && errorMessage ? (
      <small className="mt-2 text-danger d-inline-block">{errorMessage}</small>
    ) : null;
  return (
    <div className={`input-form ${wrapperClassName ?? ""}`}>
      <label htmlFor="">
        {label}
        {required ? (
          <span className="ml-1 required-attribute text-danger">*</span>
        ) : null}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className={hasError ? "border border-danger" : ""}
        readOnly={readOnly}
        disabled={disabled}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        autoComplete={autoComplete}
      />
      {ErrorDiv}
    </div>
  );
};

FormInput.propTypes = {
  hasError: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string,
  min: PropTypes.any,
  max: PropTypes.any,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  wrapperClassName: PropTypes.string,
  autoComplete: PropTypes.string,
};
