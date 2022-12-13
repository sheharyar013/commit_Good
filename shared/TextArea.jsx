import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

export const FormTextArea = ({
  label,
  id,
  name,
  onChange,
  value,
  required = false,
  classes = "description-area input-form mb-3",
  ...props
}) => {
  const [moreClasses, setClasses] = useState(classes);

  useEffect(() => {
    setClasses(Array.isArray(classes) ? classes.join(" ") : classes);
  }, []);
  return (
    <div className={moreClasses}>
      <label htmlFor="">
        {label}
        {required ? (
          <span className="required-attribute text-danger ml-1">*</span>
        ) : null}
      </label>
      <textarea
        id={id}
        rows={props?.rows ?? 5}
        name={name}
        onChange={onChange}
        value={value}
        required={required}
        {...props}
      />
    </div>
  );
};

FormTextArea.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  classes: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  props: PropTypes.any,
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
