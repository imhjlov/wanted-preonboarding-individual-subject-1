import React from "react";
import styled, { css } from "styled-components";
import { checkIcon } from "Assets/svg";

const PasswordPolicy = ({ passwordError }) => {
  return (
    <PasswordPolicyWrapper passwordError={passwordError}>
      <div>
        <span className="password-num">숫자</span>
      </div>
      <div>
        <span className="password-spe">특수문자</span>
      </div>
      <div>
        <span className="password-eng">영문</span>
      </div>
      <div>
        <span className="password-digit">8자리 이상</span>
      </div>
    </PasswordPolicyWrapper>
  );
};
const PasswordPolicyWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-around")};

  > div {
    span {
      color: ${({ theme }) => theme.color.borderline};
      text-align: center;
      font-size: 15px;
    }
    &::before {
      display: inline-block;
      background: url(${checkIcon});
      content: "";
      width: 20px;
      height: 16px;
    }
    .password-num {
      ${(props) =>
        props.passwordError.pwNum &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-eng {
      ${(props) =>
        props.passwordError.pwEng &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-spe {
      ${(props) =>
        props.passwordError.pwSpe &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
    .password-digit {
      ${(props) =>
        props.passwordError.pwDigit &&
        css`
          color: ${({ theme }) => theme.color.green};
          font-weight: 600;
        `};
    }
  }
`;
export default PasswordPolicy;
