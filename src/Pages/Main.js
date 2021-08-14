import React from "react";
import main from "Assets/img/main.png";
import styled from "styled-components";

const Main = () => {
  return (
    <Wrapper>
      <img src={main} alt="자란다" width={800} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()}
`;

export default Main;
