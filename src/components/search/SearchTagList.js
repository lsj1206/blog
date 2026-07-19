import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from "gatsby";
import { styled } from "../../styles/Theme";
// Assets
import { TagsIcon, TagOpenIcon, TagCloseIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const SearchTagList = ({ tags, activeTag }) => {
  const [expanded, setExpanded] = useState(false);
  const [layout, setLayout] = useState({
    collapsedHeight: null,
    hasOverflow: false,
    visibleCount: tags.length,
  });
  const listId = useId();
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    let animationFrame = null;

    const measureRows = () => {
      animationFrame = null;

      const items = Array.from(list.querySelectorAll("[data-search-tag]"));

      if (items.length === 0) {
        setLayout({ collapsedHeight: null, hasOverflow: false, visibleCount: 0 });
        return;
      }

      const listIcon = list.querySelector("[data-tag-list-icon]");
      const itemRects = items.map((item) => item.getBoundingClientRect());
      const rowTops = [];
      const rowIndexes = itemRects.map((rect) => {
        const existingRow = rowTops.findIndex((rowTop) => Math.abs(rowTop - rect.top) <= 1);

        if (existingRow !== -1) {
          return existingRow;
        }

        rowTops.push(rect.top);
        return rowTops.length - 1;
      });
      const visibleCount = rowIndexes.filter((rowIndex) => rowIndex < 2).length;
      const hasOverflow = visibleCount < items.length;

      const listTop = list.getBoundingClientRect().top;
      const visibleElements = [listIcon, ...items.slice(0, visibleCount)].filter(Boolean);
      const visibleBottom = Math.max(
        ...visibleElements.map((element) => element.getBoundingClientRect().bottom - listTop),
      );
      const collapsedHeight = hasOverflow ? Math.ceil(visibleBottom) : null;

      setLayout((current) => {
        if (
          current.collapsedHeight === collapsedHeight &&
          current.hasOverflow === hasOverflow &&
          current.visibleCount === visibleCount
        ) {
          return current;
        }

        return { collapsedHeight, hasOverflow, visibleCount };
      });

      if (!hasOverflow) {
        setExpanded(false);
      }
    };

    const scheduleMeasurement = () => {
      if (animationFrame !== null) {
        return;
      }

      animationFrame = window.requestAnimationFrame(measureRows);
    };

    scheduleMeasurement();

    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleMeasurement);

    resizeObserver?.observe(list);
    window.addEventListener("resize", scheduleMeasurement);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", scheduleMeasurement);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, [layout.hasOverflow, tags]);

  useEffect(() => {
    if (!activeTag) {
      setExpanded(false);
    }
  }, [activeTag]);

  useEffect(() => {
    if (!activeTag) {
      return;
    }

    const activeIndex = tags.findIndex(([tag]) => tag === activeTag);

    if (layout.hasOverflow && activeIndex >= layout.visibleCount) {
      setExpanded(true);
    }
  }, [activeTag, layout.hasOverflow, layout.visibleCount, tags]);

  if (tags.length === 0) {
    return null;
  }

  return (
    <TagSection>
      <TagViewport
        ref={listRef}
        id={listId}
        aria-label="Search by tag"
        $collapsedHeight={layout.collapsedHeight}
        $expanded={expanded}
      >
        <TagsIcon data-tag-list-icon="" aria-hidden="true" focusable="false" />
        {tags.map(([tag, count], index) => {
          const active = tag === activeTag;
          const hidden = layout.hasOverflow && !expanded && index >= layout.visibleCount;

          return (
            <TagItem
              key={tag}
              data-search-tag=""
              to={`/search?tag=${encodeURIComponent(tag)}`}
              getProps={() => (active ? { "aria-current": "page" } : {})}
              aria-hidden={hidden ? "true" : undefined}
              tabIndex={hidden ? -1 : undefined}
              $active={active}
              $hidden={hidden}
            >
              {tag}
              <TagCount>({count})</TagCount>
            </TagItem>
          );
        })}
        {layout.hasOverflow && (
          <TagToggleButton
            data-tag-toggle=""
            size={[30, 30]}
            icon={expanded ? TagCloseIcon : TagOpenIcon}
            aria-expanded={expanded}
            aria-controls={listId}
            ariaLabel={expanded ? "Collapse tags" : `Show all tags (${tags.length})`}
            onClick={() => setExpanded((current) => !current)}
          />
        )}
      </TagViewport>
    </TagSection>
  );
};

const TagSection = styled.div`
  margin: 0 0 10px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
  }
`;

const TagViewport = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  position: relative;
  padding-right: 30px;
  width: 100%;
  max-height: ${({ $collapsedHeight, $expanded }) => {
    if ($expanded) {
      return "none";
    }

    return $collapsedHeight ? `${$collapsedHeight}px` : "4.25rem";
  }};
  overflow: hidden;

  > [data-tag-list-icon] {
    flex-shrink: 0;
    margin: 0.65rem 0.25rem 0 0;
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.bgText};
  }
`;

const TagItem = styled(Link)`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  visibility: ${({ $hidden }) => ($hidden ? "hidden" : "visible")};
  margin: 0.5rem 0.5rem 0 0;
  padding: 0 0.5rem;
  min-height: 1.5rem;
  max-width: 100%;
  background-color: ${({ $active, theme }) => ($active ? theme.btnActive : theme.btnActiveText)};
  color: ${({ $active, theme }) => ($active ? theme.btnActiveText : theme.btnActive)};
  font-size: 0.9rem;
  font-weight: bolder;
  text-decoration: none;
  white-space: nowrap;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  pointer-events: ${({ $hidden }) => ($hidden ? "none" : "auto")};
  cursor: pointer;

  &:visited {
    color: ${({ $active, theme }) => ($active ? theme.btnActiveText : theme.btnActive)};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    transform: scale(1.025);

    span {
      color: ${({ theme }) => theme.warningText};
    }
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.highlightText};
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.975);
  }
`;

const TagCount = styled.span`
  flex-shrink: 0;
  margin-left: 0.25rem;
`;

const TagToggleButton = styled(IconButton)`
  position: absolute;
  right: 12px;
  bottom: -4px;
  margin: 0;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.highlightText};
    outline-offset: -2px;
  }
`;

export default SearchTagList;
