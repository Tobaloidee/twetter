// Imports
import isEmpty from "./isEmpty";
import Validator from "validator";

interface IRegisterErrorObject {
  email?: string;
  password?: string;
  password2?: string;
  profileImageURL?: string;
  username?: string;
}

export default (data: any) => {
  let errors: IRegisterErrorObject = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.username = !isEmpty(data.username) ? data.username : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.isLength(data.password, { min: 8, max: 100 })) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  } else {
    if (!Validator.equals(data.password, data.password2)) {
      errors.password2 = "Passwords must match.";
    }
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
