const fullNameRegularExpression = /^[a-zA-Z-. ]*$/;
const emailRegularExpression =
  /^[A-z\d.-]+@[A-z\d-]+([.][A-z\d-]+)+[A-z.]{1,4}$/;

/* 
Minimum eight characters, at least one letter and one number
"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
Minimum eight characters, at least one letter, one number and one special character:
"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$" 
Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
*/

// *Minimum eight characters, maximum 25,  at least one uppercase letter, one lowercase letter and one number and optional special character:
const passwordValidationRE =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\w~@#$%^&*+=`|{}:;!.?\\"()\\[\]-]{8,25}$/;

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
const checkIfEmailIsValid = (email) => emailRegularExpression.test(email);
/**
 *
 * @param {string} password
 * @returns {boolean}
 */
const checkIfPasswordIsValid = (password) =>
  passwordValidationRE.test(password);

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
const checkIfNameIsValid = (name) => fullNameRegularExpression.test(name);

export {
  fullNameRegularExpression,
  emailRegularExpression,
  checkIfEmailIsValid,
  checkIfNameIsValid,
  checkIfPasswordIsValid,
};
