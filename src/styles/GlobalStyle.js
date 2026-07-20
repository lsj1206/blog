// Global Style
import { createGlobalStyle } from "./Theme";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'D2Coding';
    src: url('/fonts/D2Coding-Ver1.3.2.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    height: 100%;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bgMain};
    font-family: 'D2Coding', sans-serif;
    line-height: 1.2;
    }

  img, video {
    max-width: 100%;
    height: auto;
  }

  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.btn};
    border-radius: 6px;
  }

  /* Markdown Config */
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.md.text};
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: -0.02em;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }
  h1 {
    margin: 2.25rem 0 0.5rem;
    font-size: 2rem;
  }
  h2 {
    margin: 1.75rem 0 0.5rem;
    font-size: 1.75rem;
  }
  h3 {
    margin: 1.5rem 0 0.5rem;
    font-size: 1.5rem;
  }
  h4 {
    margin: 1.25rem 0 0.5rem;
    font-size: 1.25rem;
  }
  h5 {
    margin: 1.25rem 0 0.5rem;
    font-size: 1rem;
  }
  h6 {
    margin: 1.25rem 0 0.5rem;
    color: ${({ theme }) => theme.md.mutedText};
    font-size: 0.75rem;
  }

  p {
    margin: 0 0 0.5rem;
    color: ${({ theme }) => theme.md.text};
    font-size: 1rem;
    line-height: 1.65;
    word-break: keep-all;
    overflow-wrap: anywhere;
  }

  a {
    font-size: 1.05rem;
    color:${({ theme }) => theme.highlightText};

    &:hover {
      color:${({ theme }) => theme.btnText};
    }

    &:active {
      color:${({ theme }) => theme.btnActiveText};
    }

    &:visited {
      color: ${({ theme }) => theme.md.visitedLink};
    }
  }

  ul, ol {
    margin: 0.3em 0;
    padding-left: 1.5em;
  }

  ol {
    margin-left: 0.5rem;
  }

  ol ol {
    margin-left: 0;
  }

  li {
    margin-bottom: 0.25em;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.highlightText};
    outline-offset: 2px;
  }

`;

export default GlobalStyle;
