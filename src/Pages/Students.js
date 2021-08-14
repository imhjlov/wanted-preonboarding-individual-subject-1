import React from "react";
import styled from "styled-components";

const Students = () => {
  return (
    <Wrapper>
      <div>This is Students Page🔧</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()};
`;

export default Students;
