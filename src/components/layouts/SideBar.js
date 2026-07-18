// Main Sidebar
import React, { useEffect } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { layoutMetrics, styled } from "../../styles/Theme";

const categoryPath = (category) => `/category/${encodeURIComponent(category)}`;

const Sidebar = ({ className, open, setOpen }) => {
  const data = useStaticQuery(graphql`
    query {
      categoryList: allMarkdownRemark {
        group(field: { frontmatter: { category: SELECT } }) {
          name: fieldValue
          count: totalCount
        }
        AllCount: totalCount
      }
    }
  `);
  const categoryList = data?.categoryList.group.sort((a, b) => b.count - a.count);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, setOpen]);

  if (!open) {
    return null;
  }

  return (
    <SidebarContainer id="category-sidebar" className={className} aria-label="Post categories">
      <ContentContainer aria-label="Category navigation">
        <Title>Category</Title>
        <BorderLine />
        <CategoryList>
          <CategoryListItem key="ALL Posts">
            <CategoryLink to="/" onClick={() => setOpen(false)}>
              <Text>{"ALL Posts"}</Text>
              <Count>{data?.categoryList.AllCount}</Count>
            </CategoryLink>
          </CategoryListItem>
          {categoryList?.map((category) => (
            <CategoryListItem key={category?.name}>
              <CategoryLink to={categoryPath(category?.name)} onClick={() => setOpen(false)}>
                <Text>{category?.name}</Text>
                <Count>{category?.count}</Count>
              </CategoryLink>
            </CategoryListItem>
          ))}
        </CategoryList>
      </ContentContainer>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.aside`
  z-index: 600;
  position: fixed;
  top: 45px;
  right: 45px;
  width: min(250px, calc(100vw - 58px));
  max-height: min(70vh, calc(100vh - 55px));
  background-color: ${({ theme }) => theme.bgLayout};
  border-radius: 0.75rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.25);
  overflow-x: hidden;
  overflow-y: auto;
`;

const ContentContainer = styled.nav`
  padding: 0.25rem ${layoutMetrics.floatingPanelPadding} ${layoutMetrics.floatingPanelPadding};
  width: 100%;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  min-height: 2rem;
  margin: 0;
  padding-left: 8px;
  color: ${({ theme }) => theme.btnText};
  line-height: 1.2;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

const BorderLine = styled.div`
  margin: 5px 0 10px 0;
  height: 1px;
  background-color: ${({ theme }) => theme.brLine};
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryListItem = styled.li`
  margin: 0.15rem 0;
`;

const CategoryLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.btnText};
  font-size: 1.25rem;
  text-decoration: none;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.btnText};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    font-weight: bolder;
    border-bottom: 1px solid ${({ theme }) => theme.highlightText};
    transform: scale(1.025);

    span {
      color: ${({ theme }) => theme.warningText};
    }
  }

  &:active {
    transform: scale(0.975);
  }
`;

const Text = styled.span`
  flex: 1;
  margin: 0 0.15rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Count = styled.span`
  flex-shrink: 0;
  margin: 0 0.15rem;
  padding: 0 0.35rem;
  background-color: ${({ theme }) => theme.btn};
  font-size: 0.75rem;
  font-weight: bolder;
  border-radius: 50%;
`;

export default Sidebar;
