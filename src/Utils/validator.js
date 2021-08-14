import * as regex from "Utils/regex.js";
import { AUTH_LEVEL } from "Utils/constants";

export const Validator = (formData, setErrors) => {
  const ValidationUsingRegex = {
    authority: (authority) => !(authority === AUTH_LEVEL.unknown),
    email: (email) => regex.isEmail(email),
    pw: (pw) => regex.isPassword(pw),
    pwCheck: (pwCheck) => pwCheck === formData.pw,
    name: (name) => regex.isName(name),
    address: (address) => !(address === ""),
    detailAddress: (detailAddress) => !(detailAddress === ""),
    dateOfBirth: (dateOfBirth) => regex.isDateOfBirth(dateOfBirth),
    creditCardNum: (creditCardNum) => regex.isCreditNum(creditCardNum),
  };

  const isValidator = (formData) => {
    for (const name in formData) {
      const value = formData[name];
      const loginValidateFunction = ValidationUsingRegex[name];
      if (!loginValidateFunction(value)) {
        setErrors((prev) => ({
          ...prev,
          [name]: true,
        }));
        return false;
      } else {
        setErrors((prev) => ({
          ...prev,
          [name]: false,
        }));
      }
    }
    return true;
  };
  return isValidator(formData);
};
