# Blog Repository Migration Notes

이 문서는 기존 `lsj1206.github.io` 루트 블로그 구조를 `blog` project site 구조로 분리한 내용을 기록합니다.

## 현재 구조

```text
lsj1206.github.io repo  -> 포트폴리오 루트
https://lsj1206.github.io/

blog repo               -> Gatsby 블로그
https://lsj1206.github.io/blog/
```

`D:\BLOG`의 Git remote는 `https://github.com/lsj1206/blog.git`를 사용합니다.

## 배포 방식 변경

기존 로컬 `gh-pages` 패키지 배포는 사용하지 않습니다.

현재 배포는 GitHub Pages 공식 Actions artifact 방식입니다.

```text
main push
-> GitHub Actions
-> npm ci
-> npm run build:pages
-> upload Pages artifact
-> deploy Pages
```

배포용 빌드는 `gatsby build --prefix-paths`를 실행해야 하므로 `npm run build:pages`를 사용합니다.

## URL 변경

기존 루트 블로그 URL은 `/blog` 하위로 이동했습니다.

```text
/post/01/      -> /blog/post/01/
/post/02/      -> /blog/post/02/
/post/03/      -> /blog/post/03/
/post/04/      -> /blog/post/04/
/post/05/      -> /blog/post/05/
/category/*    -> /blog/category/*
/search/       -> /blog/search/
```

GitHub Pages는 서버 레벨 redirect 설정이 제한적이므로, 필요한 기존 게시글/카테고리/search URL 호환성은 루트 포트폴리오 repo에서 정적 redirect HTML 또는 404 client redirect 방식으로 처리합니다.

## Sitemap / robots

블로그 sitemap은 다음 URL을 사용합니다.

```text
https://lsj1206.github.io/blog/sitemap-index.xml
```

루트 포트폴리오 repo의 `robots.txt`에는 포트폴리오 sitemap과 블로그 sitemap을 함께 명시합니다.

```text
Sitemap: https://lsj1206.github.io/sitemap-index.xml
Sitemap: https://lsj1206.github.io/blog/sitemap-index.xml
```

Search Console에는 블로그 sitemap으로 `https://lsj1206.github.io/blog/sitemap-index.xml`을 제출합니다.

## Giscus 주의사항

Giscus는 현재 `mapping: "pathname"`을 사용합니다.

게시글 URL이 `/post/*`에서 `/blog/post/*`로 바뀌면 Giscus가 다른 pathname으로 인식할 수 있습니다. 기존 댓글 thread를 그대로 연결해야 한다면 Giscus discussion mapping을 별도로 확인하거나 수동 이전을 검토해야 합니다.

## 구현 원칙

- Gatsby 내부 `Link` 경로에는 `/blog`를 직접 붙이지 않습니다.
- 코드의 내부 route는 `/post/*`, `/category/*`, `/search/` 형태를 유지합니다.
- production Pages build에서 `pathPrefix: "/blog"`와 `--prefix-paths`가 `/blog` 하위 배포를 처리합니다.
- canonical, Open Graph, Twitter image, JSON-LD URL은 `/blog` 기준 절대 URL로 생성합니다.
