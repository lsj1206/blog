// gatsby ssr
import React from "react";
import { ThemeProvider } from "./src/context/ThemeProvider";
import Layout from "./src/components/layouts/Layout";

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider>
      {element}
    </ThemeProvider>
  );
};

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "ko" });
  setHeadComponents([
    <meta
      key="google-site-verification"
      name="google-site-verification"
      content="5vTm1MVlmRNKBITz7_BNAkzI9YOP6FO5Qgun-tlMe8o"
    />,
  ]);
};
