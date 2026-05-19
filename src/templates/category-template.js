// Category List Page Template
import React from "react";
import { graphql, navigate } from "gatsby";
import { styled } from "../styles/Theme";
// Hooks
import usePostList from "../hooks/usePostList";
// Components
import PostList from "../components/post/PostList";
import SEO from "../components/seo/SEO";

const CategoryTemplate = ({ data, pageContext }) => {
  if (!data) {
    navigate(`/404`);
  }
  const postList = usePostList(data);

  return (
    <PageWrapper>
      <PostList postlist={postList} listName={pageContext.category} />
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
  query ($category: String!) {
    allMarkdownRemark(filter: { frontmatter: { category: { eq: $category } } }) {
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

export const Head = ({ pageContext }) => (
  <SEO
    title={`${pageContext.category} Posts`}
    description={`Posts in ${pageContext.category}.`}
    pathname={`/category/${encodeURIComponent(pageContext.category)}/`}
  />
);

export default CategoryTemplate;
