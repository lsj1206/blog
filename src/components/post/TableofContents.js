// Floating Table Of Contents Component
import React, { useId, useState } from "react";
import { styled } from "../../styles/Theme";
// Assets
import { TableIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const TableOfContents = ({ className, toc }) => {
  const [open, setOpen] = useState(false);
  const tocId = useId();

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <TocWrapper className={className} $open={open} aria-label="Table of contents">
      <Header $open={open}>
        <IconButton
          size={[32, 32]}
          icon={TableIcon}
          onClick={toggleOpen}
          ariaLabel={open ? "Collapse table of contents" : "Expand table of contents"}
          aria-expanded={open}
          aria-controls={tocId}
        />
        <Title $open={open}>Contents</Title>
      </Header>
      <TocContainer id={tocId} dangerouslySetInnerHTML={{ __html: toc }} $open={open} />
    </TocWrapper>
  );
};

const TocWrapper = styled.nav`
  z-index: 500;
  padding: 0 1rem 1rem 1rem;
  position: fixed;
  top: 15vh;
  right: 8vw;
  width: 275px;
  max-height: 70vh;
  opacity: 0.95;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 0.75rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    top: 50px;
    right: 5px;
    width: ${(props) => (props.$open ? `275px` : `auto`)};
    height: auto;
    padding: 0.25rem;
    padding-top: ${(props) => (props.$open ? `0` : `0.25rem`)};
  }

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
    margin: 0.25rem 0.5rem 0 0;
    width: 1.25rem;
    height: 1.25rem;
    fill: ${({ theme }) => theme.btnText};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    svg {
      margin: 0;
      fill: ${({ theme }) => theme.highlightText};
    }
  }
`;

const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.btnText};
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${(props) => (props.$open ? `flex` : `none`)};
  }
`;

const TocContainer = styled.div`
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

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    display: ${(props) => (props.$open ? `flex` : `none`)};
  }
`;

export default TableOfContents;
