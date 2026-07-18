// Floating Table Of Contents Component
import React, { useEffect, useId, useRef, useState } from "react";
import { layoutMetrics, styled } from "../../styles/Theme";
// Assets
import { TocOpenIcon, TocCloseIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const TableOfContents = ({ className, toc }) => {
  const [open, setOpen] = useState(false);
  const tocId = useId();
  const tocRef = useRef(null);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1440px)");
    const syncOpenState = (event) => setOpen(event.matches);

    setOpen(desktopMedia.matches);
    desktopMedia.addEventListener("change", syncOpenState);
    return () => desktopMedia.removeEventListener("change", syncOpenState);
  }, []);

  useEffect(() => {
    let animationFrame = null;

    const updatePosition = () => {
      animationFrame = null;

      const siteHeader = document.querySelector("[data-site-header]");
      const headerBottom = siteHeader?.getBoundingClientRect().bottom ?? 0;
      const nextTop = Math.max(layoutMetrics.floatingPanelGap, headerBottom + layoutMetrics.floatingPanelGap);

      tocRef.current?.style.setProperty("--toc-top", `${nextTop}px`);
    };

    const schedulePositionUpdate = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    window.addEventListener("scroll", schedulePositionUpdate, { passive: true });
    window.addEventListener("resize", schedulePositionUpdate);

    return () => {
      window.removeEventListener("scroll", schedulePositionUpdate);
      window.removeEventListener("resize", schedulePositionUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <TocWrapper ref={tocRef} className={className} $open={open} aria-label="Table of contents">
      <Header $open={open}>
        <Title $open={open}>Contents</Title>
        <IconButton
          size={[32, 32]}
          icon={open ? TocCloseIcon : TocOpenIcon}
          onClick={toggleOpen}
          ariaLabel={open ? "Collapse table of contents" : "Expand table of contents"}
          aria-expanded={open}
          aria-controls={tocId}
        />
      </Header>
      <TocContainer id={tocId} $open={open} dangerouslySetInnerHTML={{ __html: toc }} />
    </TocWrapper>
  );
};

const TocWrapper = styled.nav`
  z-index: 500;
  padding: 0.25rem;
  position: fixed;
  top: var(--toc-top, 50px);
  right: 12px;
  width: ${(props) => (props.$open ? `min(300px, calc(100vw - 24px))` : `auto`)};
  max-height: min(75vh, calc(100vh - var(--toc-top, 50px) - 12px));
  opacity: 0.95;
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 0.75rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

const Header = styled.div`
  z-index: 501;
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  min-height: 2rem;
  background-color: ${({ theme }) => theme.bgLayout};

  svg {
    flex-shrink: 0;
    margin: 0;
    width: 1.5rem;
    height: 1.5rem;
    fill: ${(props) => (props.$open ? props.theme.btnText : props.theme.highlightText)};
  }
`;

const Title = styled.h3`
  flex: 1;
  margin: 0 calc(${layoutMetrics.floatingPanelPadding} - 0.25rem);
  padding-left: 8px;
  display: ${(props) => (props.$open ? `flex` : `none`)};
  color: ${({ theme }) => theme.btnText};
  line-height: 1.2;
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
`;

const TocContainer = styled.div`
  display: ${(props) => (props.$open ? `block` : `none`)};
  padding: ${layoutMetrics.floatingPanelPadding};
  max-height: calc(min(75vh, calc(100vh - var(--toc-top, 50px) - 12px)) - 2.5rem);
  color: ${({ theme }) => theme.btnText};
  text-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-track {
    margin-block: 0.75rem;
  }

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
