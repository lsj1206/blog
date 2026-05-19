// gatsby node
const path = require("path");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  // GraphQL 쿼리로 _posts 내부의 모든 마크다운 데이터 가져오기
  const result = await graphql(`
    query {
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
              lastDate
            }
            html
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // 데이터가 없으면 오류 처리
  if (result.errors) {
    throw new Error("Failed to fetch markdown data");
  }

  const posts = result.data.allMarkdownRemark.edges;

  // 카테고리 추출
  const categoryList = new Set();
  posts.forEach(({ node }) => {
    if (node.frontmatter.category) {
      categoryList.add(node.frontmatter.category);
    }
  });

  // 카테고리를 기반으로 동적 페이지 생성
  categoryList.forEach((category) => {
    createPage({
      path: `/category/${encodeURIComponent(category)}`, // URL
      component: path.resolve("./src/templates/category-template.js"),
      context: {
        category,
      },
    });
  });

  // 노드를 기반으로 포스트 생성
  posts.forEach(({ node }) => {
    createPage({
      path: `/post/${node.fields.slug}`, // URL
      component: path.resolve("./src/templates/post-template.js"),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};

// onCreateNode API를 사용하여 각 마크다운 파일에 slug 추가
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // MarkdownRemark 노드인지 확인
  if (node.internal.type === "MarkdownRemark") {
    const parent = getNode(node.parent); // 폴더 이름 가져오기
    const slug = parent.relativeDirectory.split(path.sep).pop(); // 폴더 이름을 slug로 사용
    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};
