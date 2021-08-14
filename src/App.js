import React, { useEffect } from "react";
import Routes from "Routes";
import styled from "styled-components";
import { USER_STORAGE } from "Utils/constants";
import { userMockData } from "Utils/MockData";
import { loadLocalStorage, saveLocalStorage } from "Utils/Storage";

const App = () => {
  useEffect(() => {
    if (!loadLocalStorage(USER_STORAGE)) {
      saveLocalStorage(USER_STORAGE, userMockData);
    }
  }, []);

  return (
    <Container>
      <Routes />
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;
