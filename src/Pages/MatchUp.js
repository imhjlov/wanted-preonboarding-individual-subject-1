import React from "react";
import styled from "styled-components";

const MatchUp = () => {
  return (
    <Wrapper>
      <div>This is MatchUp Page🔧</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()};
`;

export default MatchUp;
