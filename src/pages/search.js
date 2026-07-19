// Searching Page
import React, { useEffect, useMemo, useState } from "react";
import { graphql, navigate } from "gatsby";
import { useLocation } from "@reach/router";
import { styled } from "../styles/Theme";
// Assets
import { SearchIcon, CancelIcon } from "../assets/assets";
// Hooks
import usePostList from "../hooks/usePostList";
// Components
import IconButton from "../components/buttons/IconButton";
import PostList from "../components/post/PostList";
import VisuallyHidden from "../components/common/VisuallyHidden";
import Seo from "../components/seo/SEO";
import SearchTagList from "../components/search/SearchTagList";

const SearchingPage = ({ data }) => {
  const [query, setQuery] = useState("");
  const location = useLocation();
  const activeTag = new URLSearchParams(location.search).get("tag");

  const posts = usePostList(data);

  // 중복 태그 계산
  const sortedTags = useMemo(() => {
    const tagCounts = posts.reduce((acc, post) => {
      post.tag?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    return Object.entries(tagCounts).sort(([, a], [, b]) => b - a);
  }, [posts]);

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
    setQuery(activeTag || "");
  }, [activeTag]);

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
      <SearchTagList tags={sortedTags} activeTag={activeTag} />
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
  padding: 2px;
  position: absolute;
  right: 12px;
`;

const PostListContainer = styled.div`
  width: 100%;
`;

export const Head = () => (
  <Seo title="Search" description="Search posts by title, category, or tag." pathname="/search/" robots="noindex, follow" />
);

export default SearchingPage;
