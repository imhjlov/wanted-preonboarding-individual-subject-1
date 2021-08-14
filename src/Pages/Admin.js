import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import SearchBar from "Components/Admin/SearchBar/SearchBar";
import AuthFilter from "Components/Admin/AuthFilter/AuthFilter";
import UserDataTable from "Components/Admin/UserDataTable/UserDataTable";
import Pagination from "Components/Admin/Pagination/Pagination";
import Modal from "Components/common/Modal/Modal";
import CreateAccount from "Components/Admin/CreateAccount/CreateAccount";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";
import { ADMIN, USER_STORAGE } from "Utils/constants";

const Admin = () => {
  const { PAGE_SIZE } = ADMIN;
  const searchKeywordRef = useRef("");
  const [pageNum, setPageNum] = useState(0);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [wholePages, setWholePages] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [searchConditions, setSearchConditions] = useState({
    searchType: "name",
    condition: { whole: true, teacher: false, parents: false, admin: false },
  });
  const {
    searchType,
    condition: { whole, teacher, parents, admin },
  } = searchConditions;

  const handleAuthUpdate = (selectedId, auth) => {
    if (auth === -1) return;
    const updateUserInfo = (users) => {
      return users.map((user) => (user.id === selectedId ? { ...user, authority: auth } : user));
    };

    const updatedUsers = updateUserInfo(users);
    setUsers(updatedUsers);
    saveLocalStorage(USER_STORAGE, updatedUsers);

    const updateAuthFilteredUsers = updateUserInfo(filteredUsers);
    setFilteredUsers(updateAuthFilteredUsers);
  };

  useEffect(() => {
    setUsers(loadLocalStorage(USER_STORAGE));
    const dividedUsers = dividedPageUsers(search());
    setWholePages(dividedUsers.length);
    setFilteredUsers(dividedUsers[pageNum] || []);
  }, [isCreateAccount]);

  const dividedPageUsers = (users) => {
    if (!users.length) return [];
    const pageGroupUsers = [];
    for (let i = 0; i < users.length; i += PAGE_SIZE) {
      const pageUsers = users.slice(i, i + PAGE_SIZE);
      pageGroupUsers.push(pageUsers);
    }
    return pageGroupUsers;
  };

  useEffect(() => {
    const searchedTotalPages = dividedPageUsers(search()).length;
    setWholePages(searchedTotalPages);
    setFilteredUsers(dividedPageUsers(search())[pageNum] || []);
  }, [searchConditions.condition, pageNum, wholePages, isSearch]);

  useEffect(() => setPageNum(0), [searchConditions.condition, isSearch]);

  const search = (searchKeyword = searchKeywordRef.current.value) => {
    if (searchKeyword)
      return users.filter(
        (item) =>
          ((item.authority === 2 && parents) ||
            (item.authority === 1 && teacher) ||
            (item.authority === 0 && admin) ||
            whole) &&
          item[searchType] === searchKeyword
      );
    return users.filter(
      (item) =>
        (item.authority === 2 && parents) ||
        (item.authority === 1 && teacher) ||
        (item.authority === 0 && admin) ||
        whole
    );
  };

  const handleSearchClick = () => setIsSearch((prev) => !prev);

  return (
    <AdminWrapper>
      <Modal isOpen={isOpen} toggleModal={() => setIsOpen(!isOpen)}>
        <CreateAccount
          setIsCreateAccount={setIsCreateAccount}
          toggleModal={() => setIsOpen(!isOpen)}
        />
      </Modal>
      <SearchContainer>
        <CreateAccountButton onClick={() => setIsOpen(!isOpen)}>계정 생성</CreateAccountButton>
        <SearchBar {...{ searchKeywordRef, setSearchConditions, handleSearchClick }} />
      </SearchContainer>
      <AuthFilter {...{ searchConditions, setSearchConditions }} />
      <UserDataTable {...{ filteredUsers, handleAuthUpdate }} />
      <Pagination {...{ pageNum, setPageNum, wholePages }} />
    </AdminWrapper>
  );
};

const AdminWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1200px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  position: relative;
  margin: 30px;
  width: 66.5%;
`;

const CreateAccountButton = styled.button`
  position: absolute;
  top: 8px;
  right: 11px;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.color.borderline};
  border-radius: 30px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.color.button};
  color: ${({ theme }) => theme.color.fontWhite};

  &:hover {
    background-color: ${({ theme }) => theme.color.buttonHover};
  }
`;

export default React.memo(Admin);
