import React, { useState } from "react";
import styled from "styled-components";
import { ADMIN } from "Utils/constants";
import AuthSelector from "Components/Admin/UserDataTable/AuthSelector";

const UserDataTable = ({ filteredUsers, handleAuthUpdate }) => {
  const {
    authTitle: { choice, admin, teacher, parents },
  } = ADMIN;
  const authTitle = [choice, admin, teacher, parents];
  const [choicedAuth, setChoicedAuth] = useState(-1);

  const handleOptionChange = (auth) => {
    if (auth === -1) return;
    setChoicedAuth(auth);
  };

  return (
    <Wrapper>
      <div className="dataTable">
        <table>
          <tbody>
            <tr>
              <th>id</th>
              <th>이름</th>
              <th>이메일</th>
              <th>pw</th>
              <th>주소</th>
              <th>생년월일</th>
              <th>신용 카드</th>
              <th colSpan="3">권한</th>
            </tr>
            {filteredUsers?.map(
              ({ id, name, email, pw, address, dateOfBirth, creditCardNum, authority }) => (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{pw}</td>
                  <td>{address}</td>
                  <td>{dateOfBirth}</td>
                  <td>{creditCardNum}</td>
                  <td>{authTitle.slice(1)[authority]}</td>
                  <td>
                    <AuthSelector handleOptionChange={handleOptionChange} authTitle={authTitle} />
                  </td>
                  <td>
                    <button type="button" onClick={() => handleAuthUpdate(id, choicedAuth)}>
                      수정
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        {filteredUsers.length === 0 && (
          <EmptyData>
            <span>일치하는 데이터가 없습니다. 🤢</span>
          </EmptyData>
        )}
      </div>
    </Wrapper>
  );
};

export default React.memo(UserDataTable);

const Wrapper = styled.div`
  table {
    margin: 0 auto;
    min-width: 1100px;
  }

  th,
  td {
    border: 1px solid ${({ theme }) => theme.color.borderline};
    font-size: 12px;
    padding: 5px;
  }

  tr:nth-child(odd) {
    background-color: rgba(135, 191, 68, 0.3);
  }

  tr:first-child {
    background-color: rgba(0, 0, 0, 0.2);
  }

  button {
    border: 1px solid ${({ theme }) => theme.color.borderline};
  }
`;

const EmptyData = styled.div`
  ${({ theme }) => theme.flexSet()};
  height: 300px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
`;
