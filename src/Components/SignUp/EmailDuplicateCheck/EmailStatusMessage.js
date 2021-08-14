import { SIGNUP_EMAIL_STATUS } from "Utils/constants";

const EmailStatusMessage = (props) => {
  const { errors, emailDuplicateStatus } = props;

  let message = errors.email ? "이메일을 입력하세요" : "";
  if (emailDuplicateStatus === SIGNUP_EMAIL_STATUS.invalidType)
    message = "이메일 형식을 확인해주세요";
  else if (emailDuplicateStatus === SIGNUP_EMAIL_STATUS.unConfirmed)
    message = "중복 검사를 진행해주세요";
  else if (emailDuplicateStatus === SIGNUP_EMAIL_STATUS.confirmedFailure)
    message = "중복된 이메일 입니다.";
  return message;
};

export default EmailStatusMessage;
