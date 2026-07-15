// Main Layout
import React, { useState } from "react";
import { styled } from "../../styles/Theme";
import GlobalStyle from "../../styles/GlobalStyle";
// Layout Components
import Header from "./Header";
import Sidebar from "./SideBar";
import FloatingBox from "./Floatingbox";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const [sideOpen, setSideOpen] = useState(false);

  const toggleSideOpen = () => {
    setSideOpen((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />
      <Background>
        <Header sideOpen={sideOpen} toggleSideOpen={toggleSideOpen} />
        <Sidebar open={sideOpen} setOpen={setSideOpen} />
        <FloatingBox />
        <Content>{children}</Content>
        <Footer />
      </Background>
    </>
  );
};

const Background = styled.div`
  z-index: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bgMain};
  overflow-y: scroll;
  scrollbar-width: none;
`;

const Content = styled.main`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

export default Layout;
