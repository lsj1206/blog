// Rendered Markdown Content
import React from "react";
import { styled } from "../../styles/Theme";

const PostContent = ({ html }) => {
  return <Content data-post-content="" dangerouslySetInnerHTML={{ __html: html }} />;
};

const Content = styled.div`
  margin: 1.5rem 0 2.5rem;
  width: 100%;
  color: ${({ theme }) => theme.md.text};
  font-family: "D2Coding", sans-serif;
  font-size: 1rem;
  line-height: 1.65;
  word-break: keep-all;
  overflow-wrap: anywhere;

  > :first-child {
    margin-top: 0;
  }

  > :last-child {
    margin-bottom: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    position: relative;
    color: ${({ theme }) => theme.md.text};
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    scroll-margin-top: 1rem;
  }

  h1 {
    margin: 2.25rem 0 0.5rem;
    font-size: 1.875rem;
  }

  h2 {
    margin: 1.75rem 0 0.5rem;
    font-size: 1.5rem;
  }

  h3 {
    margin: 1.5rem 0 0.5rem;
    font-size: 1.25rem;
  }

  h4 {
    margin: 1.25rem 0 0.5rem;
    font-size: 1.125rem;
  }

  h5 {
    margin: 1.25rem 0 0.5rem;
    font-size: 1rem;
  }

  h6 {
    margin: 1.25rem 0 0.5rem;
    color: ${({ theme }) => theme.md.mutedText};
    font-size: 0.875rem;
  }

  h1 > .anchor.before,
  h2 > .anchor.before,
  h3 > .anchor.before,
  h4 > .anchor.before,
  h5 > .anchor.before,
  h6 > .anchor.before {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    right: 100%;
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.md.mutedText};
    font-size: inherit;
    text-decoration: none;
    opacity: 0;
    transform: translateY(-50%);
  }

  h1:hover > .anchor.before,
  h2:hover > .anchor.before,
  h3:hover > .anchor.before,
  h4:hover > .anchor.before,
  h5:hover > .anchor.before,
  h6:hover > .anchor.before,
  .anchor.before:focus-visible {
    opacity: 1;
  }

  .anchor.before svg {
    width: 1rem;
    height: 1rem;
    fill: currentColor;
  }

  p {
    margin: 0 0 0.5rem;
    font-size: inherit;
    line-height: inherit;
  }

  a {
    color: ${({ theme }) => theme.highlightText};
    font-size: inherit;
    text-decoration-line: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.15em;
  }

  a:visited {
    color: ${({ theme }) => theme.highlightText};
  }

  a:hover,
  a:focus-visible {
    color: ${({ theme }) => theme.warningText};
  }

  strong {
    font-weight: 700;
  }

  em {
    font-style: italic;
  }

  del {
    color: ${({ theme }) => theme.md.mutedText};
    text-decoration-thickness: 1px;
  }

  mark {
    padding: 0.05em 0.2em;
    background-color: ${({ theme }) => theme.md.mark};
    color: ${({ theme }) => theme.md.markText};
    border-radius: 3px;
  }

  ul,
  ol {
    margin: 0.35rem 0 0.75rem;
    padding-left: 1.5rem;
  }

  ul ul,
  ul ol,
  ol ul,
  ol ol {
    margin: 0.15rem 0;
  }

  li {
    margin: 0 0 0.2rem;
  }

  li > p {
    margin-bottom: 0.25rem;
  }

  li:last-child,
  li > :last-child {
    margin-bottom: 0;
  }

  .contains-task-list,
  .task-list-item {
    list-style: none;
  }

  .task-list-item input[type="checkbox"] {
    margin: 0 0.5rem 0 -1.25rem;
    accent-color: ${({ theme }) => theme.highlightText};
    vertical-align: middle;
  }

  blockquote {
    display: block;
    margin: 1rem 0;
    padding: 0.75rem 1rem;
    background-color: ${({ theme }) => theme.md.callout};
    color: ${({ theme }) => theme.md.text};
    border: 0;
    border-left: 3px solid ${({ theme }) => theme.md.calloutBorder};
    border-radius: 4px;
  }

  blockquote > :last-child {
    margin-bottom: 0;
  }

  :not(pre) > code {
    padding: 0.15em 0.3em;
    background-color: ${({ theme }) => theme.md.inlineCodeBg};
    color: ${({ theme }) => theme.md.inlineCodeText};
    font-family: "D2Coding", Consolas, Monaco, monospace;
    font-size: 0.9em;
    line-height: normal;
    white-space: break-spaces;
    word-break: break-word;
    border-radius: 3px;
    box-decoration-break: clone;
  }

  .gatsby-highlight {
    margin: 1rem 0;
    max-width: 100%;
    background-color: ${({ theme }) => theme.md.codeSurface};
    border-radius: 4px;
    overflow: hidden;
  }

  pre,
  code[class*="language-"] {
    font-family: "D2Coding", Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
    text-align: left;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    tab-size: 4;
    hyphens: none;
  }

  pre {
    margin: 1rem 0;
    padding: 1rem;
    max-width: 100%;
    background-color: ${({ theme }) => theme.md.codeSurface};
    color: #f8f8f2;
    font-size: 0.875rem;
    line-height: 1.6;
    white-space: pre;
    border-radius: 4px;
    overflow: auto;
  }

  .gatsby-highlight pre {
    margin: 0;
    border-radius: 0;
  }

  pre > code {
    display: block;
    min-width: max-content;
    color: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  table {
    display: block;
    margin: 1rem 0;
    width: max-content;
    min-width: 100%;
    max-width: 100%;
    font-size: 0.9375rem;
    line-height: 1.5;
    border-collapse: collapse;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  th,
  td {
    padding: 0.5rem 0.75rem;
    min-width: 7rem;
    text-align: left;
    vertical-align: top;
    border: 1px solid ${({ theme }) => theme.md.border};
  }

  th {
    background-color: ${({ theme }) => theme.md.tableHeader};
    font-weight: 700;
  }

  img,
  video,
  iframe {
    max-width: 100%;
    border-radius: 4px;
  }

  img {
    display: block;
    height: auto;
    border: 1px solid ${({ theme }) => theme.md.imageBorder};
  }

  video,
  iframe,
  figure,
  .gatsby-resp-iframe-wrapper {
    margin: 1.25rem 0;
  }

  .gatsby-resp-iframe-wrapper {
    max-width: 100%;
    border-radius: 4px;
    overflow: hidden;
  }

  .gatsby-resp-image-wrapper {
    margin-top: 1.25rem !important;
    margin-bottom: 1.25rem !important;
    border: 1px solid ${({ theme }) => theme.md.imageBorder};
    border-radius: 4px;
    overflow: hidden;
  }

  .gatsby-resp-image-link {
    display: block;
    text-decoration: none;
  }

  .gatsby-resp-image-wrapper img {
    border: 0;
    border-radius: 0;
  }

  figcaption {
    margin-top: 0.5rem;
    color: ${({ theme }) => theme.md.mutedText};
    font-size: 0.875rem;
    text-align: center;
  }

  hr {
    margin: 2rem 0;
    height: 1px;
    background-color: ${({ theme }) => theme.md.border};
    border: 0;
  }

  details {
    margin: 0.5rem 0;
  }

  summary {
    padding: 0.25rem 0;
    font-weight: 700;
    cursor: pointer;
  }

  details[open] > summary {
    margin-bottom: 0.35rem;
  }
`;

export default PostContent;
