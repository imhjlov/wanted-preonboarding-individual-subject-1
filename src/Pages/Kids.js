import React from "react";
import styled from "styled-components";

const Kids = () => {
  return (
    <Wrapper>
      <div>This is KidsManage Page🔧</div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.absoluteCenter()};
`;

export default Kids;
