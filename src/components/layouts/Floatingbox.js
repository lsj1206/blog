// Main Layout Floating Box
import React from "react";
import { styled } from "../../styles/Theme";
// Assets
import { PageUpIcon, PageDownIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const FloatingBox = ({ className }) => {
  const topScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttomScroll = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <ScrollControls className={className} aria-label="Page scroll controls">
      <FloatingButton size={[36, 36]} icon={PageUpIcon} onClick={topScroll} ariaLabel="Scroll to top" />
      <FloatingButton size={[36, 36]} icon={PageDownIcon} onClick={buttomScroll} ariaLabel="Scroll to bottom" />
    </ScrollControls>
  );
};

const ScrollControls = styled.nav`
  z-index: 700;
  display: flex;
  flex-direction: column;
  position: fixed;
  right: 0;
  bottom: 0;
`;

const FloatingButton = styled(IconButton)`
  margin: 3px;
  padding: 3px;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 50%;
`;

export default FloatingBox;
