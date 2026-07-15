// SVG Icon Button Component (ReactComponent)
import React from "react";
import { Link } from "gatsby";
import { css, styled } from "../../styles/Theme";

const IconButton = ({ className, size = [30, 30], icon: Icon, onClick, href, to, ariaLabel, ...buttonProps }) => {
  const content = Icon ? <Icon aria-hidden="true" focusable="false" /> : null;
  const commonProps = {
    className,
    "aria-label": ariaLabel || "Icon button",
    $width: size[0],
    $height: size[1],
    ...buttonProps,
  };

  if (to) {
    return (
      <LinkContainer {...commonProps} to={to}>
        {content}
      </LinkContainer>
    );
  }

  if (href) {
    return (
      <AnchorContainer {...commonProps} href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </AnchorContainer>
    );
  }

  return (
    <ButtonContainer {...commonProps} type="button" onClick={onClick}>
      {content}
    </ButtonContainer>
  );
};

const iconButtonStyle = css`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  text-decoration: none;

  svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.btn};
  }

  &:hover svg,
  &:focus-visible svg {
    fill: ${({ theme }) => theme.btnActive};
  }

  &:active svg {
    transform: scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

const ButtonContainer = styled.button`
  ${iconButtonStyle}
`;

const AnchorContainer = styled.a`
  ${iconButtonStyle}
`;

const LinkContainer = styled(Link)`
  ${iconButtonStyle}
`;

export default IconButton;
