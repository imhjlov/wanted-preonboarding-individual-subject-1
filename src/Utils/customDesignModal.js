import Button from "Components/common/Button";
import styled from "styled-components";

export const setTitleContent = (title = "", content = "") => {
  const ContentContainer = styled.div`
    ${({ theme }) => theme.flexSet("center", "center", "column")}
    margin-bottom: 20px;
  `;

  const Title = styled.div`
    font-weight: 700;
    font-size: 1.2rem;
    margin-bottom: 20px;
  `;
  const Content = styled.div`
    font-size: 1rem;
    padding: 10px;
    width: 80%;
  `;

  return (
    <ContentContainer>
      <Title>{title}</Title>
      <Content>{content}</Content>
    </ContentContainer>
  );
};

export const setButton = (submitButton = false, closeButton = false, onClick) => {
  <>
    {submitButton && <Button type="submit" width="30%" value="등록" onClick={onClick}></Button>}
    {closeButton && <Button width="30%" value="닫기" onClick={onClick}></Button>}
  </>;
};
