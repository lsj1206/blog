// SVG Icon Button Component (ReactComponent)
import React from "react";
import { Link } from "gatsby";
import { styled } from "../../styles/Theme";

const IconButton = ({ className, size = [30, 30], icon: Icon, onClick, href, to, ariaLabel, ...buttonProps }) => {
  let element = "button";
  let elementProps = { type: "button", onClick };

  if (to) {
    element = Link;
    elementProps = { to };
  } else if (href) {
    element = "a";
    elementProps = { href, target: "_blank", rel: "noopener noreferrer" };
  }

  return (
    <ButtonContainer
      as={element}
      className={className}
      aria-label={ariaLabel || "Icon button"}
      $width={size[0]}
      $height={size[1]}
      {...buttonProps}
      {...elementProps}
    >
      {Icon ? <Icon aria-hidden="true" focusable="false" /> : null}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
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

export default IconButton;
