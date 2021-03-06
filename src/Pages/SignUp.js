import React, { useState } from "react";
import styled, { css } from "styled-components";
import * as regex from "Utils/regex";
import { Validator } from "Utils/validator";
import { hashSync } from "Utils/bcrypt";
import { AUTH_LEVEL, USER_STORAGE, SIGNUP_EMAIL_STATUS, ERRORS_INIT_STATE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { Button, Input, Radio } from "Components/common";
import { Modal, AddressModal, CreditModal, SignupModal } from "Components/common/Modal";
import DuplicateCheck from "Components/SignUp/EmailDuplicateCheck/DuplicateCheck";
import EmailStatusMessage from "Components/SignUp/EmailDuplicateCheck/EmailStatusMessage";
import PasswordPolicy from "Components/SignUp/PasswordPolicy";
import { Calendar, Card, ClosedEye, OpenedEye, Mail, Map, Person } from "Assets/svg";

const SignUp = () => {
  const [modalType, setModalType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [emailDuplicateStatus, setEmailDuplicateStatus] = useState(SIGNUP_EMAIL_STATUS.default);
  const [emailDuplicateChecked, setEmailDuplicateChecked] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [passwordCheckError, setPasswordCheckError] = useState(false);
  const [passwordError, setPasswordError] = useState({
    pwNum: false,
    pwEng: false,
    pwSpe: false,
    pwDigit: false,
  });
  const [formData, setFormData] = useState({
    authority: AUTH_LEVEL.unknown,
    email: "",
    pw: "",
    pwCheck: "",
    name: "",
    address: "",
    detailAddress: "",
    creditCardNum: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState(ERRORS_INIT_STATE);

  const handleDuplicateCheck = () => {
    DuplicateCheck({
      setEmailDuplicateChecked,
      errors,
      setErrors,
      formData,
      setEmailDuplicateStatus,
    });
  };

  const toggleModal = (modal) => {
    setModalOpen(!modalOpen);
    setModalType(modal);
  };

  const handleAuthorityChange = (authority) => {
    setErrors(ERRORS_INIT_STATE);
    setFormData({
      ...formData,
      authority,
    });
  };

  const handleSetAddressValue = (address) => {
    setErrors(ERRORS_INIT_STATE);
    setFormData({
      ...formData,
      address,
    });
  };

  const SetCardNumFromModal = (creditCardNum) => {
    setErrors(ERRORS_INIT_STATE);
    setFormData({
      ...formData,
      creditCardNum,
    });
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setErrors(ERRORS_INIT_STATE);

    if (name === "email") {
      setEmailDuplicateChecked(false);
    }

    if (name === "pw") {
      setPasswordError({
        ...passwordError,
        pwEng: regex.isPwEng(value) >= 0,
        pwNum: regex.isPwNum(value) >= 0,
        pwSpe: regex.isPwSpe(value) >= 0,
        pwDigit: value.length >= 8,
      });
    }

    if (name === "pwCheck") {
      setPasswordCheckError(value !== formData.pw);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    if (!emailDuplicateChecked) {
      setErrors((prev) => ({
        ...prev,
        email: true,
      }));
      setEmailDuplicateStatus(SIGNUP_EMAIL_STATUS.unConfirmed);
      return;
    }

    if (Validator(formData, setErrors)) {
      formData.id = autoIncrementUserId();
      formData.pw = hashSync(formData.pw, 8);
      delete formData.pwCheck;

      const userData = loadLocalStorage(USER_STORAGE);
      userData
        ? saveLocalStorage(USER_STORAGE, [...userData, formData])
        : saveLocalStorage(USER_STORAGE, [formData]);
      toggleModal("success");
    }
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSignupSubmit} passwordError={passwordError}>
        <h4>????????????</h4>

        <Radio
          name="authority"
          value={formData.authority}
          onChange={handleAuthorityChange}
          data={[
            { value: AUTH_LEVEL.teacher, label: "?????????" },
            { value: AUTH_LEVEL.parent, label: "?????????" },
          ]}
          error={errors.authority}
          errorMessage="???????????? ?????? ????????? ????????? ?????????."
        />

        <EmailWrapper>
          <Input
            name="email"
            value={formData.email}
            onChange={handleSignUpChange}
            placeholder="???????????? ???????????????"
            icon={<Mail />}
            error={errors.email}
            errorMessage={EmailStatusMessage({ errors, emailDuplicateStatus })}
            successMessage={emailDuplicateChecked && "?????? ????????? ????????? ?????????"}
            width="75%"
          />
          <Button value="????????????" width="20%" onClick={handleDuplicateCheck} />
        </EmailWrapper>

        <Input
          name="pw"
          value={formData.pw}
          onChange={handleSignUpChange}
          placeholder="??????????????? ???????????????"
          type={visiblePassword ? "password" : "text"}
          icon={
            visiblePassword ? (
              <ClosedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            ) : (
              <OpenedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            )
          }
          error={errors.pw}
          errorMessage="??????????????? ?????? ????????? ?????????"
        />

        <PasswordPolicy passwordError={passwordError} />

        <Input
          name="pwCheck"
          value={formData.pwCheck}
          onChange={handleSignUpChange}
          placeholder="??????????????? ?????? ???????????????"
          type={visiblePassword ? "password" : "text"}
          icon={
            visiblePassword ? (
              <ClosedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            ) : (
              <OpenedEye onClick={() => setVisiblePassword(!visiblePassword)} />
            )
          }
          error={passwordCheckError}
          errorMessage="??????????????? ?????? ????????? ?????????"
        />

        <Input
          name="name"
          value={formData.name}
          onChange={handleSignUpChange}
          placeholder="????????? ???????????????"
          icon={<Person />}
          error={errors.name}
          errorMessage="????????? ?????? ????????? ?????????"
        />

        <AddressWrapper>
          <div className="address-main" onClick={() => toggleModal("address")}>
            <Input
              name="address"
              value={formData.address}
              placeholder="????????? ???????????????"
              icon={<Map />}
              error={errors.address}
              errorMessage="????????? ?????? ????????? ?????????"
            />
            <span>????????????</span>
          </div>
          {formData.address && (
            <Input
              name="detailAddress"
              value={formData.detailAddress}
              onChange={handleSignUpChange}
              placeholder="??????????????? ???????????????"
              icon={<Map />}
              error={errors.detailAddress}
              errorMessage="??????????????? ?????? ????????? ?????????"
            />
          )}
        </AddressWrapper>

        <CreditCardWrapper onClick={() => toggleModal("credit")}>
          <Input
            name="creditCardNum"
            value={formData.creditCardNum}
            placeholder="???????????? ????????? ???????????????"
            icon={<Card />}
            error={errors.creditCardNum}
            errorMessage="??????????????? ?????? ????????? ?????????"
          />
          <span>????????????</span>
        </CreditCardWrapper>

        <Input
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleSignUpChange}
          placeholder="???????????? 6????????? ???????????????"
          icon={<Calendar />}
          error={errors.dateOfBirth}
          maxLength={6}
          errorMessage="??????????????? ?????? ????????? ?????????"
        />

        <Button type="submit" value="????????????" marginTop="10px" />

        <Modal isOpen={modalOpen} toggleModal={toggleModal} modalType={modalType}>
          <>
            {modalType === "success" && <SignupModal />}
            {modalType === "address" && (
              <AddressModal toggleModal={toggleModal} onSelected={handleSetAddressValue} />
            )}
            {modalType === "credit" && (
              <CreditModal
                creditCard={formData.creditCardNum}
                handleSetCardNum={SetCardNumFromModal}
                toggleModal={toggleModal}
              />
            )}
          </>
        </Modal>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.flexSet("center", "center", "column")};
  width: 100%;
  height: calc(100% - 72px);
`;

const Form = styled.form`
  width: 600px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.color.borderline};

  h4 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 500;
    text-align: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 40px 0;
  }
`;

const EmailWrapper = styled.div`
  ${({ theme }) => theme.flexSet("space-between")};
`;

const AddressWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;

const CreditCardWrapper = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12.5px;
    right: 2px;
    color: ${({ theme }) => theme.color.green};
    font-size: 13px;
    font-weight: 600;
    padding: 10px 50px 13px 0;
    cursor: pointer;
    background-color: white;
  }
  svg {
    z-index: 1;
  }
`;

export default SignUp;
