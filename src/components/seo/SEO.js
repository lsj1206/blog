import React from "react";
import userData from "../../../user-data";

const pathPrefix = "/blog";

const normalizePathPrefix = (value) => {
  if (!value || value === "/") {
    return "";
  }

  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};

export const siteMetadata = {
  title: userData.title,
  description: userData.blog_description,
  author: userData.name,
  siteUrl: userData.url,
  pathPrefix,
  defaultImage: "/image/homepage.jpg",
};

export const withPathPrefix = (pathname = "/") => {
  if (!pathname) {
    return siteMetadata.pathPrefix || "/";
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  const normalizedPrefix = normalizePathPrefix(siteMetadata.pathPrefix);
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!normalizedPrefix) {
    return normalizedPath;
  }

  if (normalizedPath === normalizedPrefix || normalizedPath.startsWith(`${normalizedPrefix}/`)) {
    return normalizedPath;
  }

  return normalizedPath === "/" ? `${normalizedPrefix}/` : `${normalizedPrefix}${normalizedPath}`;
};

export const buildUrl = (pathname = "/") => {
  if (!pathname) {
    return `${siteMetadata.siteUrl}${withPathPrefix("/")}`;
  }

  if (/^https?:\/\//i.test(pathname)) {
    return pathname;
  }

  return `${siteMetadata.siteUrl}${withPathPrefix(pathname)}`;
};

export const toAbsoluteUrl = (value) => {
  if (!value) {
    return undefined;
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const normalizedValue = value.replace(/^\.\//, "").replace(/^static\//, "");
  return buildUrl(normalizedValue.startsWith("/") ? normalizedValue : `/${normalizedValue}`);
};

const formatTitle = (title) => {
  if (!title || title === siteMetadata.title) {
    return siteMetadata.title;
  }

  return `${title} | ${siteMetadata.title}`;
};

const SEO = ({
  title,
  description,
  pathname = "/",
  image,
  robots = "index, follow",
  type = "website",
  children,
}) => {
  const metaTitle = formatTitle(title);
  const metaDescription = description || siteMetadata.description;
  const canonicalUrl = buildUrl(pathname);
  const imageUrl = toAbsoluteUrl(image || siteMetadata.defaultImage);

  return (
    <>
      <title>{metaTitle}</title>
      <link rel="canonical" href={canonicalUrl} />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robots} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteMetadata.title} />
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {children}
    </>
  );
};

export default SEO;