import { css } from "styled-components";

const flexSet = (horizon, vertical, direction) => css`
  display: flex;
  justify-content: ${horizon || "center"};
  align-items: ${vertical || "center"};
  flex-direction: ${direction || "row"};
`;

const absoluteCenter = () =>
  css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

const Mixin = { flexSet, absoluteCenter };

export default Mixin;
