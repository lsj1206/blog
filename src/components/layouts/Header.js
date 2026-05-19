// Main Layout Header
import React, { useContext } from "react";
import { Link } from "gatsby";
import { ThemeContext } from "../../context/ThemeProvider";
import { styled } from "../../styles/Theme";
import userData from "../../../user-data";
// Assets
import { LightIcon, DarkIcon, SearchIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";

const Header = ({ className }) => {
  const { theme, onChangeTheme } = useContext(ThemeContext);

  return (
    <HeaderContainer className={className}>
      <TitleContainer aria-label="Site identity">
        <HeaderTitle to="/">{userData.title}</HeaderTitle>
        <NameText to="/about">{`/ ${userData.name}`}</NameText>
      </TitleContainer>
      <ButtonContainer aria-label="Site tools">
        <IconButton size={[32, 32]} icon={SearchIcon} to="/search" ariaLabel="Search posts" />
        <IconButton
          size={[35, 35]}
          icon={theme === "light" ? DarkIcon : LightIcon}
          onClick={onChangeTheme}
          ariaLabel={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        />
      </ButtonContainer>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.bgLayout};
`;

const TitleContainer = styled.nav`
  display: flex;
  align-items: flex-end;
`;

const HeaderTitle = styled(Link)`
  margin: 0;
  position: relative;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  font-weight: bolder;
  text-decoration: none;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.text};
  }
`;

const NameText = styled(Link)`
  margin: 0 0 0 5px;
  position: relative;
  color: ${({ theme }) => theme.btnText};
  font-size: 0.75rem;
  font-weight: bolder;
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.btnText};
  }
`;

const ButtonContainer = styled.nav`
  display: flex;
  align-items: center;
  position: relative;
`;

export default Header;
