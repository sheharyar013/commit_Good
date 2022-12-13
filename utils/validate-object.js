import {
  checkIfEmailIsValid,
  checkIfNameIsValid,
  checkIfPasswordIsValid,
} from "../constants/regular-expressions";

import { capitalizeFirstLetterAndSplitByUnderscore } from "./functions";

/**
 *
 * @param {Record<string|number, any> | undefined} obj
 * @param {string[] | number[] | undefined} requiredKeys
 * @param {() => {}|undefined} callback
 * @returns {{hasErrors: boolean, errors: Record<string, string>}}
 * @description Check an object for empty value and return errors
 */
const validateObject = (
  obj,
  requiredKeys = undefined,
  callback = undefined
) => {
  if (!requiredKeys) {
    requiredKeys = Object.keys(obj);
  }
  const modifiedObj = {};
  let errors = {};
  Object.entries(obj)
    .filter(([key]) => requiredKeys.includes(key))
    .map(([key, value]) => {
      return Object.assign(modifiedObj, { [key]: value });
    });
  Object.entries(modifiedObj).every(([key, value]) => {
    const modKey = capitalizeFirstLetterAndSplitByUnderscore(key)
      .split("_")
      .join(" ");
    if (!value) {
      errors = { ...errors, [key]: `${modKey} is required` };
    }
    if (Array.isArray(value) && !value.length) {
      errors = { ...errors, [key]: `${modKey} is required` };
      return false;
    }
    if (key.includes("email") && !checkIfEmailIsValid(value)) {
      errors = { ...errors, [key]: `${modKey} must be valid` };
      return false;
    }
    if (key.includes("name") && !checkIfNameIsValid(value)) {
      errors = {
        ...errors,
        [key]: `${modKey} can only contain Letters, -, . and spaces`,
      };
      return false;
    }
    if (key.includes("password") && !checkIfPasswordIsValid(value)) {
      errors = {
        ...errors,
        [key]: `${modKey} must contain minimum eight characters, maximum 25 characters at least one uppercase letter, one lowercase letter and one number`,
      };
      return false;
    }
    // if (key.includes("name") && !checkIfNameIsValid(value)) {
    // 	errors = { ...errors, [key]: `Please enter correct ${modKey}` };
    // 	return false;
    // }
    return !!value;
  });
  callback?.();
  return { hasErrors: Object.values(errors).length !== 0, errors };
};

export { validateObject };
