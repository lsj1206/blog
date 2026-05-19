// Main Layout Footer
import React from "react";
import { styled } from "../../styles/Theme";
import userData from "../../../user-data";
// Assets
import { AboutIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const Footer = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <AboutButton size={[30, 30]} icon={AboutIcon} to="/about" ariaLabel="About this blog" />
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

const AboutButton = styled(IconButton)`
  margin: 5px;
  padding: 3px;
`;

const FooterText = styled.p`
  margin-bottom: 5px;
  padding-left: 5px;
  color: ${({ theme }) => theme.bgText};
  font-size: 0.75rem;
  font-weight: bolder;
`;

export default Footer;
