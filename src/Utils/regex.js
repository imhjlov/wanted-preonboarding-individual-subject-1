export const isEmail = (checkString) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return emailRegex.test(checkString);
};

export const isName = (checkString) => {
  const nameRegex = /^[가-힣]{2,4}$/;
  return nameRegex.test(checkString);
};

export const isDateOfBirth = (checkString) => {
  const dateOfBirthRegex = /([0-9]{2}(0[1-9]|1[0-2])(0[1-9]|[1,2][0-9]|3[0,1]))$/;
  return dateOfBirthRegex.test(checkString);
};

export const isPassword = (checkString) => {
  const passwordRegex = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,50}$/;
  return passwordRegex.test(checkString);
};

export const isCreditNum = (checkString) => {
  const creditNumRegexp = /^[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}$/;
  return creditNumRegexp.test(checkString);
};

export const isPwNum = (checkString) => {
  const pwNumRegex = /[0-9]/g;
  return checkString.search(pwNumRegex);
};

export const isPwEng = (checkString) => {
  const engRegex = /[a-zA-Z]/gi;
  return checkString.search(engRegex);
};

export const isPwSpe = (checkString) => {
  const speRegex = /[~`!@#$%\^&*()-+=]/gi;
  return checkString.search(speRegex);
};
