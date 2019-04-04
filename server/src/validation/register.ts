// Imports
import Validator from "validator";
import isEmpty from "./isEmpty";

interface IRegisterErrorObject {
  email?: string;
  password?: string;
  password2?: string;
  profileImageURL?: string;
  username?: string;
}

export default (data: any) => {
  const errors: IRegisterErrorObject = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.profileImageURL = !isEmpty(data.profileImageURL)
    ? data.profileImageURL
    : "";
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

  if (
    !isEmpty(data.profileImageURL) &&
    !Validator.isURL(data.profileImageURL)
  ) {
    errors.profileImageURL = "URL is not valid.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  }

  if (!Validator.isLength(data.username, { min: 4, max: 50 })) {
    errors.username = "Username must be between 4 and 50 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
