import React from "react";
import styled from "styled-components";

const FindTeacher = () => {
  return (
    <Wrapper>
      <div>Find Teacher</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()};
`;

export default FindTeacher;
