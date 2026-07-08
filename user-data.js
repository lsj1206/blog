// User Data
const userData = {
  url: `https://lsj1206.github.io`,
  title: `TECH.log`,
  blog_description: `lsj1206의 개인 기술 블로그 입니다.`,
  name: `lsj1206`,
  self_introduction: `안녕하세요. 프론트 엔드 개발자 이서준입니다.`,
  email: `1007ckddjs12@gmail.com`,
  github_link: `https://github.com/lsj1206`,
};

// Giscus (Comment) Config Data
const giscusData = {
  repo: "lsj1206/blog",
  repo_id: "R_kgDONRGoyQ",
  category: "Q&A",
  category_id: "DIC_kwDONRGoyc4ClfH_",
  mapping: "pathname",
  reactions_enabled: "1",
  emit_metadata: "1",
  input_position: "bottom",
  lang: "ko",
};

// Blog Development Information
const blogData = {
  repository: `https://github.com/lsj1206/blog`,
  title: `Blog Development Information`,
  description: `React 기반의 정적 사이트 생성기(Static Site Generator)인 Gatsby를 사용하고 개발된 블로그 입니다.`,
  start_date: `2024.11.25`,
  end_date: `2024.12.17`,
  framework: `Gatsby 5.14(React18)`,
  framework_link: `https://www.gatsbyjs.com`,
  css: `styled-components 6.1`,
  css_link: `https://styled-components.com`,
  attribution: `©Font Awesome(CC BY 4.0)`,
  attr_link: `https://fontawesome.com`,
};

// Posts List Sorting Table
const SortTable = ["Latest", "Oldest"];

export { giscusData, blogData, SortTable };
export default userData;
