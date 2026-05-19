// Searching Page
import React, { useState, useEffect } from "react";
import { graphql, Link, navigate } from "gatsby";
import { useLocation } from "@reach/router"; // 쿼리스트링 읽기 위해 추가
import queryString from "query-string"; // 쿼리스트링 파싱을 위해 추가 설치
import { styled } from "../styles/Theme";
// Assets
import { SearchIcon, CancelIcon, TagsIcon } from "../assets/assets";
// Hooks
import usePostList from "../hooks/usePostList";
// Components
import IconButton from "../components/buttons/IconButton";
import PostList from "../components/post/PostList";
import VisuallyHidden from "../components/common/VisuallyHidden";
import SEO from "../components/seo/SEO";

const SearchingPage = ({ data }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();

  const posts = usePostList(data);

  // 중복 태그 계산
  const tagCounts = posts.reduce((acc, post) => {
    post.tag?.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  const sortedTags = Object.entries(tagCounts).sort(([, a], [, b]) => b - a);

  const searchPosts = posts.filter((post) => {
    const searchText = query.toLowerCase();
    return (
      post.title?.toLowerCase().includes(searchText) ||
      post.category?.toLowerCase().includes(searchText) ||
      post.tag?.some((t) => t.toLowerCase().includes(searchText))
    );
  });

  const clearSearch = () => {
    setQuery("");
    navigate(`/search`);
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setQuery(typeof params.tag === "string" ? params.tag : "");
  }, [location.search]);

  return (
    <PageWrapper>
      <SearchContainer>
        <VisuallyHidden as="label" htmlFor="post-search-input">
          Search posts
        </VisuallyHidden>
        <SearchBar
          id="post-search-input"
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton
          size={[31, 31]}
          icon={query ? CancelIcon : SearchIcon}
          onClick={clearSearch}
          ariaLabel={query ? "Clear search" : "Search posts"}
        />
      </SearchContainer>
      <TagContainer>
        <TagsIcon aria-hidden="true" focusable="false" />
        {sortedTags?.map(([tag, count]) => (
          <TagItem key={tag} to={`/search?tag=${encodeURIComponent(tag)}`}>
            {tag}
            <TagCount>({count})</TagCount>
          </TagItem>
        ))}
      </TagContainer>
      <PostListContainer>
        <PostList postlist={searchPosts} />
      </PostListContainer>
    </PageWrapper>
  );
};

export const query = graphql`
  query SearchPageQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            coverImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
              }
            }
            category
            tag
            createDate
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;

const PageWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
  width: 768px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 0 5px;
  position: relative;
  width: 480px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    max-width: 80%;
  }
`;

const SearchBar = styled.input`
  z-index: 9;
  flex: 1;
  padding-left: 15px;
  width: 100%;
  height: 2.25rem;
  background-color: ${({ theme }) => theme.bgSub};
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  outline: none;
  border: none;
  border-radius: 1rem;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.5);

  &::placeholder {
    color: ${({ theme }) => theme.bgText};
  }

  &:hover {
    cursor: text;
  }
`;

const SearchButton = styled(IconButton)`
  z-index: 10;
  align-items: center;
  position: absolute;
  right: 12px;
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0 0 10px 0;
  width: 100%;

  svg {
    flex-shrink: 0;
    margin: 0.65rem 0.25rem 0 0;
    width: 1.25rem;
    height: 1.25rem;
    fill: ${({ theme }) => theme.bgText};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
  }
`;

const TagItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0.5rem 0.5rem 0 0;
  padding: 0 0.5rem;
  min-height: 1.5rem;
  background-color: ${({ theme }) => theme.btnActiveText};
  color: ${({ theme }) => theme.btnActive};
  font-size: 0.9rem;
  font-weight: bolder;
  text-decoration: none;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.btnActive};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    transform: scale(1.025);
    span {
      color: ${({ theme }) => theme.warningText};
    }
  }

  &:active {
    transform: scale(0.975);
  }
`;

const TagCount = styled.span`
  flex-shrink: 0;
  margin-left: 0.25rem;
`;

const PostListContainer = styled.div`
  width: 100%;
`;

export const Head = () => (
  <SEO title="Search" description="Search posts by title, category, or tag." pathname="/search/" robots="noindex, follow" />
);

export default SearchingPage;
