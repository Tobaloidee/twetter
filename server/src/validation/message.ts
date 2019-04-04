// Imports
import Validator from "validator";
import isEmpty from "./isEmpty";

interface IMessageErrorObject {
  text?: string;
}

export default (data: any) => {
  const errors: IMessageErrorObject = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { max: 160 })) {
    errors.text = "Text cannot exceed 160 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
