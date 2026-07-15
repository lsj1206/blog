// Floating Table Of Contents Component
import React, { useEffect, useId, useState } from "react";
import { styled } from "../../styles/Theme";
// Assets
import { TocOpenIcon, TocCloseIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const TableOfContents = ({ className, toc }) => {
  const [open, setOpen] = useState(false);
  const tocId = useId();

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1440px)");
    const syncOpenState = (event) => setOpen(event.matches);

    setOpen(desktopMedia.matches);
    desktopMedia.addEventListener("change", syncOpenState);
    return () => desktopMedia.removeEventListener("change", syncOpenState);
  }, []);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <TocWrapper className={className} $open={open} aria-label="Table of contents">
      <Header $open={open}>
        <IconButton
          size={[32, 32]}
          icon={open ? TocCloseIcon : TocOpenIcon}
          onClick={toggleOpen}
          ariaLabel={open ? "Collapse table of contents" : "Expand table of contents"}
          aria-expanded={open}
          aria-controls={tocId}
        />
        <Title $open={open}>Contents</Title>
      </Header>
      <TocContainer id={tocId} $open={open} dangerouslySetInnerHTML={{ __html: toc }} />
    </TocWrapper>
  );
};

const TocWrapper = styled.nav`
  z-index: 500;
  padding: ${(props) => (props.$open ? `0 1rem 1rem 1rem` : `0.25rem`)};
  position: fixed;
  top: 50px;
  right: 5px;
  width: ${(props) => (props.$open ? `min(275px, calc(100vw - 10px))` : `auto`)};
  max-height: min(70vh, calc(100vh - 60px));
  opacity: 0.95;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 0.75rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
    margin-block: 0.75rem;
  }
`;

const Header = styled.div`
  z-index: 501;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  flex-direction: row;
  padding-top: ${(props) => (props.$open ? `0.5rem` : `0`)};
  padding-bottom: ${(props) => (props.$open ? `0.5rem` : `0`)};
  background-color: ${({ theme }) => theme.bgLayout};

  svg {
    flex-shrink: 0;
    margin: ${(props) => (props.$open ? `0.25rem 0.5rem 0 0` : `0`)};
    width: 1.5rem;
    height: 1.5rem;
    fill: ${(props) => (props.$open ? props.theme.btnText : props.theme.highlightText)};
  }
`;

const Title = styled.h3`
  margin: 0;
  display: ${(props) => (props.$open ? `flex` : `none`)};
  color: ${({ theme }) => theme.btnText};
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
`;

const TocContainer = styled.div`
  display: ${(props) => (props.$open ? `block` : `none`)};
  color: ${({ theme }) => theme.btnText};
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);

  a {
    display: block;
    color: ${({ theme }) => theme.btnText};
    word-break: break-word;
    white-space: normal;
    line-height: 1.4;
    text-decoration: none;

    &:hover,
    &:focus-visible {
      color: ${({ theme }) => theme.btnActive};
      font-weight: bolder;
    }
    &:active {
      color: ${({ theme }) => theme.highlightText};
    }
  }

`;

export default TableOfContents;
