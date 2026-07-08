> ## [TECH.log/lsj1206](https://lsj1206.github.io/blog/)

[![TECH.log homepage](./static/image/homepage.jpg)](https://lsj1206.github.io/blog/)

## 개요

이 저장소는 Gatsby로 만든 개인 기술 블로그입니다. 현재 블로그는 GitHub Pages project site로 배포되며, 실제 공개 주소는 `https://lsj1206.github.io/blog/`입니다.

> 2024년 11월 - 12월 동안 개발되었으며, 최초 배포일은 2024년 12월 26일 입니다.

## 특징

- **Static site**: Gatsby 기반 정적 사이트로 서버와 DB 없이 운영합니다.
- **Markdown posts**: `_posts` 폴더의 Markdown 파일과 frontmatter로 게시글을 작성합니다.
- **GitHub Pages Actions deploy**: `git push` 시 GitHub Actions에서 빌드하고 Pages artifact로 배포합니다.
- **Giscus comments**: GitHub Discussions 기반 댓글 시스템을 사용합니다.
- **Responsive layout**: 반응형 웹디자인으로 구현되어 있습니다.
- **Monospace font**: 네이버에서 개발한 프로그래밍 글꼴인 [D2Coding](https://github.com/naver/d2codingfont)을 사용합니다.
- **Local SVG icons**: Font Awesome SVG 파일을 로컬 asset으로 사용하며, 아이콘 라이선스 표기를 유지합니다.

## 기술 스택

- [Gatsby 5.14](https://www.gatsbyjs.com) + React 18
- [styled-components 6.1](https://styled-components.com)
- [GitHub Flavored Markdown](https://github.github.com/gfm)
- [Giscus](https://giscus.app/ko)
- `gatsby-plugin-sitemap`
- `gatsby-plugin-robots-txt`
- `gatsby-plugin-image` / `gatsby-plugin-sharp`
- `gatsby-plugin-react-svg`
- PrismJS

## 시작하기

### 1. 저장소 클론

```shell
git clone https://github.com/lsj1206/blog.git [FOLDER NAME]
cd [FOLDER NAME]
```

### 2. 본인 저장소로 연결

GitHub에서 본인 블로그용 저장소를 만든 뒤, 로컬 저장소의 `origin`을 본인 저장소로 변경합니다.

```shell
git remote set-url origin https://github.com/[USER NAME]/[REPOSITORY NAME].git
git remote -v
```

GitHub Pages project site로 배포할 경우 공개 주소는 보통 다음 형태가 됩니다.

```text
https://[USER NAME].github.io/[REPOSITORY NAME]/
```

이 저장소는 현재 `https://lsj1206.github.io/blog/` 기준으로 설정되어 있으므로, 저장소 이름이나 사용자명이 다르면 아래 설정도 함께 수정해야 합니다.

- `gatsby-config.js`: `siteUrl`, `pathPrefix`
- `src/components/seo/SEO.js`: `pathPrefix`
- `user-data.js`: 블로그 기본 정보와 Giscus 설정

예를 들어 저장소 이름이 `blog`이면 `pathPrefix`는 `/blog`입니다. 저장소 이름이 `my-blog`이면 `pathPrefix`는 `/my-blog`로 맞춰야 합니다.

### 3. 기본 정보 수정

블로그 기본 정보를 본인 기준으로 수정합니다.

```javascript
// user-data.js
const userData = {
  url: `https://[USER NAME].github.io/`,
  title: `TECH.log`,
  blog_description: `[BLOG DESCRIPTION]`,
  name: `[DISPLAY NAME]`,
};
```

### 4. Giscus 설정

[Giscus](https://giscus.app/ko) 주소에 접속해서 설정 순서대로 진행

```javascript
// user-data.js
const giscusData = {
  repo: "[ENTER REPO HERE]",
  repo_id: "[ENTER REPO ID HERE]",
  category: "[ENTER CATEGORY NAME HERE]",
  category_id: "[ENTER CATEGORY ID HERE]",
  mapping: "pathname",
  reactions_enabled: "1",
  emit_metadata: "1",
  input_position: "bottom",
  lang: "ko",
};
```

## 포스트 작성

게시글은 `_posts` 폴더 아래에 slug 단위 폴더를 만들고 `content.md`로 작성합니다.

```text
project-root/
├── _posts/
│   ├── [post-slug]/
│   │   ├── _assets/
│   │   │   └── image.jpg
│   │   └── content.md
└── README.md
```

작성 규칙은 다음과 같습니다.

1. 폴더명이 게시글 URL의 마지막 segment가 됩니다.
2. 폴더명은 중복되면 안 됩니다.
3. 게시글 메타데이터는 `content.md` 최상단 frontmatter에 작성합니다.
4. 이미지가 필요하면 같은 게시글 폴더의 `_assets` 아래에 둡니다.

Frontmatter 예시는 다음과 같습니다.

```markdown
---
title: "Temp Post"
coverImage: "./_assets/image1.jpg"
category: "C-sharp"
tag: ["C-sharp", "WPF", ".NET"]
createDate: "2026-04-28"
lastDate: "2026-07-08"
---
```

`category`는 `/category/[category]/` 페이지 생성에 사용되고, `tag`는 검색 페이지의 tag query와 tag 목록에 사용됩니다.

> URL에 들어갈 수 있는 category/tag 값은 일관된 표기를 사용하는 것이 좋습니다. <br />
> 예를 들어 C# 계열은 `C#` 대신 `C-sharp`처럼 URL에 안전한 표기를 사용합니다.

## 배포

배포는 `.github/workflows/deploy.yml`에서 처리합니다. 로컬에서 별도 배포 명령을 실행하지 않고, `main` branch에 push하면 GitHub Actions가 자동으로 빌드와 배포를 진행합니다.

### 1. GitHub Pages 설정

GitHub 저장소에서 다음 설정을 사용합니다.

1. `Settings -> Pages -> Source`: `GitHub Actions`
2. `Settings -> Actions -> General -> Workflow permissions`: `Read and write permissions`

> GitHub Pages가 추천하는 Gatsby workflow 템플릿의 `Configure` 버튼은 사용하지 않습니다.<br />
> 이 저장소에는 이미 Pages artifact 배포용 workflow가 있습니다.

### 2. 변경사항 push

포스트 작성과 설정 수정을 마쳤다면 변경사항을 커밋하고 push합니다.

```shell
git add .
git commit -m "[커밋 메세지]"
git push origin main
```

### 3. Actions 확인

push 후 GitHub 저장소의 `Actions` 탭에서 `Deploy Blog to GitHub Pages` workflow가 성공했는지 확인합니다.

Workflow 동작은 다음과 같습니다.

| 단계     | 내용                                    |
| -------- | --------------------------------------- |
| Trigger  | `main` branch push, `workflow_dispatch` |
| Node.js  | `24`                                    |
| Install  | `npm ci`                                |
| Build    | `npm run build:pages`                   |
| Artifact | `actions/upload-pages-artifact`         |
| Deploy   | `actions/deploy-pages`                  |

배포가 성공하면 GitHub Pages 주소에서 블로그를 확인합니다.

```text
https://[USER NAME].github.io/[REPOSITORY NAME]/
```

## 로컬 작업 및 빌드

바로 push해서 공개하지 않고, 로컬에서 글이나 디자인을 확인하면서 작업하고 싶을 때 사용하는 명령어입니다.

### 의존성 설치

```shell
npm ci
```

처음 클론한 뒤 로컬에서 개발 서버나 빌드를 실행하려면 먼저 의존성을 설치해야 합니다.

### 로컬 개발 서버 실행

```shell
npm run start
```

`gatsby develop`을 실행합니다. 글 작성, 디자인 수정, 컴포넌트 수정 내용을 브라우저에서 바로 확인할 때 사용합니다.

기본 확인 주소는 다음과 같습니다.

```text
http://localhost:8000
```

### 일반 Gatsby 빌드

```shell
npm run build
```

`gatsby build`를 실행합니다. Gatsby가 정적 HTML/CSS/JS를 정상 생성하는지 확인하는 일반 빌드입니다. 이 명령은 `/blog` 같은 GitHub Pages project site prefix를 붙이지 않습니다.

### GitHub Pages 조건 빌드

```shell
npm run build:pages
```

`gatsby build --prefix-paths`를 실행합니다. 실제 GitHub Pages project site 배포와 같은 조건으로 빌드하려면 이 명령을 사용합니다.

배포 전에 asset 경로, 내부 링크, canonical, sitemap이 project site 경로 기준으로 생성되는지 확인할 때 사용합니다.

### Gatsby 캐시 정리

```shell
npm run clean
```

Gatsby의 이전 캐시와 빌드 산출물을 정리합니다. Markdown frontmatter, GraphQL 데이터, 이미지 처리 결과가 예상과 다르게 보일 때 사용합니다.

캐시를 정리한 뒤 Pages 조건으로 다시 확인하려면 다음 순서로 실행합니다.

```shell
npm run clean
npm run build:pages
```
