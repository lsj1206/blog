// Main Layout Floating Box
import React from "react";
import { styled } from "../../styles/Theme";
// Assets
import { HambergerIcon, PageUpIcon, PageDownIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const FloatingBox = ({ className, toggleSideOpen }) => {
  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttomScroll = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <FloatingContainer className={className} aria-label="Page controls">
      <FloatingButton size={[36, 36]} icon={PageUpIcon} onClick={topScroll} ariaLabel="Scroll to top" />
      <FloatingButton size={[36, 36]} icon={PageDownIcon} onClick={buttomScroll} ariaLabel="Scroll to bottom" />
      <FloatingMenuButton size={[36, 36]} icon={HambergerIcon} onClick={toggleSideOpen} ariaLabel="Toggle category menu" />
    </FloatingContainer>
  );
};

const FloatingContainer = styled.nav`
  z-index: 700;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0;
  right: 0;
`;

const FloatingButton = styled(IconButton)`
  margin: 3px;
  padding: 3px;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 50%;
`;

const FloatingMenuButton = styled(IconButton)`
  display: none;
  margin: 3px;
  padding: 7px;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: flex;
  }
`;

export default FloatingBox;
