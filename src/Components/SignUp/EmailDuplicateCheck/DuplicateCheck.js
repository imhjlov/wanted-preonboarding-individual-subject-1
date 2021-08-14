import { SIGNUP_EMAIL_STATUS, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage } from "Utils/Storage";
import * as regex from "Utils/regex";

export const DuplicateCheck = (props) => {
  const { setEmailDuplicateChecked, errors, setErrors, formData, setEmailDuplicateStatus } = props;

  setEmailDuplicateChecked(true);

  if (!regex.isEmail(formData.email)) {
    setErrors({ ...errors, email: true });
    setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.invalidType);
    return;
  }

  const userData = loadLocalStorage(USER_STORAGE);
  if (!userData) {
    setErrors({ ...errors, email: false });
    setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedSuccess);
    return;
  }

  const searchEmail = userData.filter((user) => user.email === formData.email);
  if (searchEmail.length) {
    setErrors({ ...errors, email: true });
    setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedFailure);
  } else {
    setErrors({ ...errors, email: false });
    setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.confirmedSuccess);
  }
};

export default DuplicateCheck;
