// Post Content Page Template
import React, { useContext, useEffect } from "react";
import { graphql, navigate } from "gatsby";
import Giscus from "@giscus/react";
import { ThemeContext } from "../context/ThemeProvider";
import { styled } from "../styles/Theme";
import { giscusData } from "../../user-data";
// Components
import PostHeader from "../components/post/PostHeader";
import TableOfContents from "../components/post/TableofContents";
import SEO, { buildUrl, siteMetadata, toAbsoluteUrl } from "../components/seo/SEO";

const PostTemplate = ({ data }) => {
  const post = data?.markdownRemark;
  const { theme } = useContext(ThemeContext);
  const giscusTheme = theme === "light" ? "noborder_light" : "noborder_gray";
  const hasPost = Boolean(post);

  useEffect(() => {
    if (!hasPost) {
      navigate(`/404`, { replace: true });
    }
  }, [hasPost]);

  if (!post) {
    return null;
  }

  const postData = post.frontmatter;

  return (
    <PageWrapper>
      <PostContainer>
        <PostHeader postData={postData} />
        <Content dangerouslySetInnerHTML={{ __html: post.html }} />
        <BorderLine />
        <Comment className="giscus">
          <Giscus
            id="comments"
            repo={giscusData.repo}
            repoId={giscusData.repo_id}
            category={giscusData.category}
            categoryId={giscusData.category_id}
            mapping={giscusData.mapping}
            reactionsEnabled={giscusData.reactions_enabled}
            emitMetadata={giscusData.emit_metadata}
            inputPosition={giscusData.input_position}
            lang={giscusData.lang}
            theme={giscusTheme}
            loading="lazy"
          />
        </Comment>
      </PostContainer>
      <TableOfContents toc={post.tableOfContents} />
    </PageWrapper>
  );
};

const PageWrapper = styled.article`
  display: flex;
  flex-direction: row;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 30px;
  width: 768px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 66vw;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    width: 75vw;
  }
`;

const BorderLine = styled.div`
  margin: 5px 0 15px 0;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.brLine};
`;

const Content = styled.div`
  margin: 2rem 0;

  img {
    border: 1px solid ${({ theme }) => theme.bgMainSub};
    border-radius: 0.3rem;
  }
`;

const Comment = styled.div``;

export const query = graphql`
  query ($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
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
        lastDate
      }
      html
      fields {
        slug
      }
      excerpt(pruneLength: 160)
      tableOfContents(maxDepth: 3)
    }
  }
`;

export const Head = ({ data }) => {
  const post = data?.markdownRemark;

  if (!post) {
    return (
      <SEO
        title="Not found"
        description="The requested post could not be found."
        pathname="/404/"
        robots="noindex, nofollow"
      />
    );
  }

  const frontmatter = post?.frontmatter || {};
  const title = frontmatter.title || "Empty title..";
  const description = post?.excerpt || title;
  const pathname = `/post/${post?.fields?.slug}/`;
  const image = frontmatter.coverImage?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;
  const imageUrl = toAbsoluteUrl(image) || toAbsoluteUrl(siteMetadata.defaultImage);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: imageUrl ? [imageUrl] : undefined,
    datePublished: frontmatter.createDate,
    dateModified: frontmatter.lastDate || frontmatter.createDate,
    author: {
      "@type": "Person",
      name: siteMetadata.author,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildUrl(pathname),
    },
    keywords: frontmatter.tag?.join(", "),
    articleSection: frontmatter.category,
  };

  return (
    <SEO title={title} description={description} pathname={pathname} image={image} type="article">
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </SEO>
  );
};

export default PostTemplate;
