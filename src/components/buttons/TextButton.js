// Text Button Component
import React from "react";
import { styled } from "../../styles/Theme";

const TextButton = ({ className, size = [80, 30], text, onClick, ariaLabel, $onPage, ...buttonProps }) => {
  return (
    <ButtonContainer
      className={className}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || String(text)}
      $width={size[0]}
      $height={size[1]}
      {...buttonProps}
    >
      {text}
    </ButtonContainer>
  );
};

const ButtonContainer = styled.button`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 0;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-color: ${({ theme }) => theme.btn};
  color: ${({ theme }) => theme.btnText};
  font-size: 0.9rem;
  font-weight: bolder;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.btnActive};
    color: ${({ theme }) => theme.btnActiveText};
  }

  &:active {
    transform: scale(0.9);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export default TextButton;
