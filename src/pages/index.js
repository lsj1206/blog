// Main Page
import React from "react";
import { graphql, navigate } from "gatsby";
import { styled } from "../styles/Theme";
// Hooks
import usePostList from "../hooks/usePostList";
// Components
import PostList from "../components/post/PostList";
import SEO from "../components/seo/SEO";

const IndexPage = ({ data }) => {
  if (!data) {
    navigate(`/404`);
  }
  const postList = usePostList(data);

  return (
    <PageWrapper>
      <PostList postlist={postList} listName={"All Posts"} />
    </PageWrapper>
  );
};

const PageWrapper = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 30px;
  width: 768px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 90%;
  }
`;

export const query = graphql`
  query MainPageQuery {
    allMarkdownRemark(sort: { frontmatter: { createDate: DESC } }) {
      edges {
        node {
          frontmatter {
            title
            coverImage {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
              }
            }
            tag
            category
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

export const Head = () => <SEO pathname="/" />;

export default IndexPage;
