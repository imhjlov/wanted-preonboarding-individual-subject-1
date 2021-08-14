import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { USERDATA_TEMPLATE, USER_DATA_OBJ, USER_STORAGE } from "Utils/constants";
import { loadLocalStorage, saveLocalStorage, autoIncrementUserId } from "Utils/Storage";
import { hashSync } from "Utils/bcrypt";

const CreateAccount = ({ toggleModal, setIsCreateAccount }) => {
  const [userInput, setUserInput] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectValue, setSelectValue] = useState("");

  useEffect(() => {
    setUserInput(USERDATA_TEMPLATE);
    setUserList(loadLocalStorage(USER_STORAGE));
  }, []);

  const inputUserData = (event) => {
    const {
      target: { value, name },
    } = event;

    return setUserInput({
      ...userInput,
      [name]: value,
    });
  };

  const selectAuthority = (event) => {
    const {
      target: { value },
    } = event;
    if (value) {
      setSelectValue(value);
    }
  };

  const userDataSubmit = (event) => {
    event.preventDefault();
    if (selectValue) {
      const accountObj = {
        ...userInput,
        id: autoIncrementUserId(),
        pw: hashSync(userInput.pw),
        authority: Number(selectValue),
      };
      saveLocalStorage(USER_STORAGE, [...userList, accountObj]);
      setIsCreateAccount((prev) => !prev);
    }
    event.target.reset();
    toggleModal();
  };

  return (
    <FormWrapper>
      <FormContainer action="#" onSubmit={userDataSubmit}>
        {INPUT_TITLE_DATA.map((title) => (
          <Input
            key={title.name}
            type={title.type}
            name={title.name}
            onChange={inputUserData}
            placeholder={title.placeholder}
            required={title.required}
          />
        ))}
        <AuthSelect name="authority" onChange={selectAuthority}>
          <option defaultChecked hidden>
            권한을 선택 해 주세요
          </option>
          {USER_DATA_OBJ.map((item) => (
            <option key={item.name} value={item.authLevel}>
              {item.selectName}
            </option>
          ))}
        </AuthSelect>
        <SubmitButton disabled={!selectValue}>생성</SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

const FormWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 300px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.color.fontWhite};
  border: 1px solid ${({ theme }) => theme.color.green};
`;

const FormContainer = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  padding-left: 4px;

  &:focus {
    border-color: ${({ theme }) => theme.color.green};
    box-shadow: ${({ theme }) => theme.color.green} 0 4px 2px -2px;
    transition: box-shadow 0.5s ease-in-out;
  }

  &::placeholder {
    padding-left: 4px;
  }
`;

const AuthSelect = styled.select`
  padding-left: 4px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  background-color: transparent;
  color: rgba(0, 0, 0, 0.6);

  &:focus {
    border-color: ${({ theme }) => theme.color.green};
    outline: none;
  }
`;

const SubmitButton = styled.button`
  margin-top: 15px;
  padding: 7px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.color.buttonHover};
  color: ${({ theme }) => theme.color.fontWhite};

  &:disabled {
    background-color: ${({ theme }) => theme.color.button};
  }
`;

const INPUT_TITLE_DATA = [
  {
    type: "email",
    name: "email",
    required: true,
    placeholder: "Email",
  },
  {
    type: "password",
    name: "pw",
    required: true,
    placeholder: "패스워드",
  },
  {
    type: "text",
    name: "name",
    required: true,
    placeholder: "이름",
  },
  {
    type: "text",
    name: "address",
    required: false,
    placeholder: "주소",
  },
  {
    type: "text",
    name: "dateOfBirth",
    required: false,
    placeholder: "생년월일",
  },
  {
    type: "text",
    name: "creditCardNum",
    required: false,
    placeholder: "신용카드 번호",
  },
];

export default CreateAccount;
