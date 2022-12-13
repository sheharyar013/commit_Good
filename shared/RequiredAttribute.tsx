import React from "react";

export const RequiredAttribute = ({
  classNames,
}: {
  classNames?: string;
}): React.ReactElement => (
  <span className={`text-danger ${classNames}`}>*</span>
);
