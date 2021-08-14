import * as Regex from "Utils/Regex.js";
import { AUTH_LEVEL } from "Utils/Constants";

export const Validator = (formData, setErrors) => {
  const ValidationUsingRegex = {
    authority: (authority) => !(authority === AUTH_LEVEL.unknown),
    email: (email) => Regex.isEmail(email),
    pw: (pw) => Regex.isPassword(pw),
    pwCheck: (pwCheck) => pwCheck === formData.pw,
    name: (name) => Regex.isName(name),
    address: (address) => !(address === ""),
    detailAddress: (detailAddress) => !(detailAddress === ""),
    dateOfBirth: (dateOfBirth) => Regex.isDateOfBirth(dateOfBirth),
    creditCardNum: (creditCardNum) => Regex.isCreditNum(creditCardNum),
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
