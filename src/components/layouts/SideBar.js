// Main Sidebar
import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { styled } from "../../styles/Theme";
// Assets
import { CategoryListIcon } from "../../assets/assets";

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

  const closeOnBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setOpen(false);
    }
  };

  return (
    <SidebarContainer
      className={className}
      $open={open}
      aria-label="Post categories"
      onFocus={() => setOpen(true)}
      onBlur={closeOnBlur}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <ContentContainer $open={open} aria-label="Category navigation">
        <Title>
          <CategoryListIcon aria-hidden="true" focusable="false" />
          {"Category List"}
        </Title>
        <BorderLine />
        <CategoryList>
          <CategoryListItem key="ALL Posts">
            <CategoryLink to="/">
              <Text>{"ALL Posts"}</Text>
              <Count>{data?.categoryList.AllCount}</Count>
            </CategoryLink>
          </CategoryListItem>
          {categoryList?.map((category) => (
            <CategoryListItem key={category?.name}>
              <CategoryLink to={categoryPath(category?.name)}>
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
  z-index: ${(props) => (props.$open ? `600` : `400`)};
  position: fixed;
  top: 100px;
  right: 0;
  width: ${(props) => (props.$open ? `250px` : `35px`)};
  height: 70vh;
  background-color: ${({ theme }) => theme.bgLayout};
  border-top-left-radius: 0.75rem;
  border-bottom-left-radius: 0.75rem;
  overflow: hidden;
  transition: width 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: ${(props) => (props.$open ? `flex` : `none`)};
  }
`;

const ContentContainer = styled.nav`
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  visibility: ${(props) => (props.$open ? `visible` : `hidden`)};
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  margin: 0;
  color: ${({ theme }) => theme.btnText};
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);

  svg {
    flex-shrink: 0;
    margin: 0 0.25rem 0 0;
    width: 1.25rem;
    height: 1.25rem;
    fill: ${({ theme }) => theme.btnText};
  }
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
