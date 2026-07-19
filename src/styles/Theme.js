// Color Palette for Theme
import * as styledComponents from "styled-components";

const lightMarkdown = {
  text: "#37352F",
  mutedText: "#787774",
  border: "#E9E9E7",
  surface: "#F7F6F3",
  callout: "#F7F6F3",
  calloutBorder: "#D3D1CB",
  tableHeader: "#F7F6F3",
  inlineCodeBg: "rgba(135, 131, 120, 0.15)",
  inlineCodeText: "#EB5757",
  imageBorder: "#E9E9E7",
  mark: "#FDECC8",
  markText: "#37352F",
  codeSurface: "#404859",
  visitedLink: "#9370DB",
};

const darkMarkdown = {
  text: "#EBEBEA",
  mutedText: "#9B9A97",
  border: "#454545",
  surface: "#333333",
  callout: "#323232",
  calloutBorder: "#5A5A5A",
  tableHeader: "#333333",
  inlineCodeBg: "rgba(135, 131, 120, 0.3)",
  inlineCodeText: "#FF7369",
  imageBorder: "#454545",
  mark: "#5C4B20",
  markText: "#F4E8C1",
  codeSurface: "#404859",
  visitedLink: "#9370DB",
};

const breakpoints = {
  narrow: "480px",
  mobile: "768px",
  tablet: "1279px",
  desktop: "1440px",
};

const layoutMetrics = {
  floatingPanelGap: 10,
  floatingPanelPadding: "0.75rem",
};

export const light = {
  brLine: "#585858",
  bgMain: "#FFFFFF",
  bgMainSub: "#FCFCFC",
  bgLayout: "#E8E8E8",
  bgSub: "#C3C3C3",
  btn: "#A9A9A9",
  btnActive: "#585858",
  text: "black",
  bgText: "#999999",
  btnText: "#696969",
  btnActiveText: "#C0C0C0",
  highlightText: "#4682B4",
  warningText: "#8B0000",
  md: { ...lightMarkdown },
  breakpoints: { ...breakpoints },
};

export const dark = {
  brLine: "#585858",
  bgMain: "#282828",
  bgMainSub: "#252525",
  bgLayout: "#383838",
  bgSub: "#606060",
  btn: "#505050",
  btnActive: "#909090",
  text: "white",
  bgText: "#808080",
  btnText: "#808080",
  btnActiveText: "#505050",
  highlightText: "#87CEEB",
  warningText: "#F08080",
  md: { ...darkMarkdown },
  breakpoints: { ...breakpoints },
};

// styled-components를 기본으로 내보냄
const { default: styled, createGlobalStyle, css } = styledComponents;
export { styled, createGlobalStyle, css, layoutMetrics };
