import React from "react";
import styled from "styled-components";

const SearchBar = ({ searchKeywordRef, setSearchConditions, handleSearchClick }) => {
  const handleSearchKind = (e) =>
    setSearchConditions((prev) => ({ ...prev, searchType: e.target.value }));

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchClick(searchKeywordRef.current.value);
    }
  };
  const clearSearchKeyword = (e) => {
    handleSearchClick();
    searchKeywordRef.current.value = "";
  };
  return (
    <Wrapper>
      <div className="searchBar">
        <select onChange={handleSearchKind}>
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <input
          className="searchInput"
          onKeyPress={onKeyPress}
          placeholder="검색 입력"
          ref={searchKeywordRef}
        />
        <button onClick={clearSearchKeyword}>검색어 초기화</button>
        <button
          className="searchButton"
          onClick={() => handleSearchClick(searchKeywordRef.current.value)}>
          검색
        </button>
      </div>
    </Wrapper>
  );
};

export default SearchBar;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  .searchBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 470px;
    padding: 0 10px;
    border: 1px solid ${({ theme }) => theme.color.borderline};
    border-radius: 30px;
    background-color: ${({ theme }) => theme.color.inputBackground};

    & > select {
      background-color: ${({ theme }) => theme.color.inputBackground};
      border: 1px solid ${({ theme }) => theme.color.borderline};
      border-radius: 10px;
    }

    .searchInput {
      height: 50px;
      width: 300px;
      margin: 0 10px;
    }

    button {
      border-radius: 10px;
      background-color: ${({ theme }) => theme.color.button};
      color: ${({ theme }) => theme.color.fontWhite};
    }
  }
`;
