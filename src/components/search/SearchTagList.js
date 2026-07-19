import React, { useEffect, useId, useRef, useState } from "react";
import { Link } from "gatsby";
import { styled } from "../../styles/Theme";
// Assets
import { TagsIcon, TagOpenIcon, TagCloseIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const SearchTagList = ({ tags, activeTag }) => {
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const listId = useId();
  const listRef = useRef(null);
  const hasOverflow = visibleCount < tags.length;

  useEffect(() => {
    const list = listRef.current;

    if (!list) {
      return undefined;
    }

    const measureRows = () => {
      const items = Array.from(list.querySelectorAll("[data-search-tag]"));

      if (items.length === 0) {
        setVisibleCount(0);
        return;
      }

      const rowTops = [];
      let nextVisibleCount = items.length;

      for (let index = 0; index < items.length; index += 1) {
        const itemTop = items[index].offsetTop;
        const existingRow = rowTops.findIndex((rowTop) => Math.abs(rowTop - itemTop) <= 1);

        if (existingRow === -1) {
          rowTops.push(itemTop);
        }

        if (rowTops.length > 2) {
          nextVisibleCount = index;
          break;
        }
      }

      setVisibleCount((current) => (current === nextVisibleCount ? current : nextVisibleCount));

      if (nextVisibleCount === items.length) {
        setExpanded(false);
      }
    };

    measureRows();

    if (typeof ResizeObserver !== "undefined") {
      const resizeObserver = new ResizeObserver(measureRows);
      resizeObserver.observe(list);
      return () => resizeObserver.disconnect();
    }

    window.addEventListener("resize", measureRows);
    return () => window.removeEventListener("resize", measureRows);
  }, [tags]);

  useEffect(() => {
    if (!activeTag) {
      setExpanded(false);
      return;
    }

    const activeIndex = tags.findIndex(([tag]) => tag === activeTag);

    if (hasOverflow && activeIndex >= visibleCount) {
      setExpanded(true);
    }
  }, [activeTag, hasOverflow, tags, visibleCount]);

  if (tags.length === 0) {
    return null;
  }

  return (
    <TagViewport ref={listRef} id={listId} aria-label="Search by tag" $expanded={expanded}>
      <TagsIcon aria-hidden="true" focusable="false" />
      {tags.map(([tag, count], index) => {
        const active = tag === activeTag;
        const hidden = hasOverflow && !expanded && index >= visibleCount;

        return (
          <TagItem
            key={tag}
            data-search-tag=""
            to={`/search?tag=${encodeURIComponent(tag)}`}
            aria-current={active ? "page" : undefined}
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
      {hasOverflow && (
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
  );
};

const TagViewport = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-sizing: border-box;
  margin: 0 0 10px;
  position: relative;
  padding-right: 30px;
  width: 100%;
  max-height: ${({ $expanded }) => ($expanded ? "none" : "4.1875rem")};
  overflow: hidden;

  > svg {
    flex-shrink: 0;
    margin: 0.65rem 0.25rem 0 0;
    width: 1.5rem;
    height: 1.5rem;
    fill: ${({ theme }) => theme.bgText};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
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
