// Main Layout Footer
import React from "react";
import { styled } from "../../styles/Theme";
import userData from "../../../user-data";

const Footer = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <FooterText>{`© 2024. ${userData.name} all rights reserved.`}</FooterText>
    </FooterContainer>
  );
};

const FooterContainer = styled.footer`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.bgLayout};
`;

const FooterText = styled.p`
  margin-bottom: 5px;
  padding-left: 5px;
  color: ${({ theme }) => theme.bgText};
  font-size: 0.75rem;
  font-weight: bolder;
`;

export default Footer;