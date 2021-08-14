import React from "react";
import styled from "styled-components";

const MessageBox = ({ textColor, textAlign, children }) => {
  return <Message textColor={textColor}>{children}</Message>;
};

const Message = styled.p`
  color: ${({ theme, textColor }) => textColor || theme.color.red};
  text-align: ${({ textAlign }) => textAlign || "left"};
  padding: 10px 0;
  font-size: 16px;
  font-weight: 600;
`;
export default MessageBox;
