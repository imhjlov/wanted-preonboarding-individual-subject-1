import React, { Component } from "react";
import styled, { css } from "styled-components";

class Button extends Component {
  render() {
    const { value, width, marginTop, onClick, type } = this.props;
    return (
      <StyledButton type={type} width={width} marginTop={marginTop} onClick={onClick}>
        {value}
      </StyledButton>
    );
  }
}

Button.defaltProps = {
  type: "button",
};

const StyledButton = styled.button`
  ${({ theme }) => theme.flexSet("center", "center")}
  width: ${({ width }) => width || "100%"};
  height: 40px;
  padding: 0 15px;
  margin-top: ${({ marginTop }) => marginTop || "0"};
  background: ${({ theme }) => theme.color.button};
  border-radius: 5px;
  color: ${({ theme }) => theme.color.fontWhite};
  font-size: 1rem;
  font-weight: 600;

  ${({ theme }) =>
    css`
      &:hover {
        background: ${theme.color.buttonHover};
      }
    `}
`;

export default Button;
