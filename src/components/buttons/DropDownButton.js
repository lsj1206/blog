// DropDown Icon Button Component
import React, { useState, useRef, useEffect, useId } from "react";
import { styled } from "../../styles/Theme";
// Components
import IconButton from "./IconButton";

const DDIconButton = ({ className, onClick, size = [30, 30], list, icon, ariaLabel = "Open dropdown" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuId = useId();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeOnEscape = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <DropDownContainer className={className} ref={menuRef} onKeyDown={closeOnEscape}>
      <IconButton
        size={size}
        onClick={toggleMenu}
        icon={icon}
        ariaLabel={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? menuId : undefined}
      />
      {isOpen && (
        <DropdownList id={menuId} role="menu" $buttonHeight={size[1]}>
          {list.map((item, index) => (
            <DropdownListItem key={index} role="none">
              <DropdownItem
                type="button"
                role="menuitem"
                onClick={() => {
                  onClick(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </DropdownItem>
            </DropdownListItem>
          ))}
        </DropdownList>
      )}
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  position: relative;
`;

const DropdownList = styled.ul`
  z-index: 100;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 8px 0;
  position: absolute;
  top: ${({ $buttonHeight }) => $buttonHeight - 5}px;
  right: 10px;
  list-style: none;
  background-color: ${({ theme }) => theme.btn};
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DropdownListItem = styled.li`
  margin: 0;
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: transparent;
  color: ${({ theme }) => theme.btnText};
  font-size: 0.75rem;
  font-weight: bolder;
  text-align: left;
  white-space: nowrap;
  border: none;
  cursor: pointer;

  &:hover,
  &:focus-visible {
    background-color: ${({ theme }) => theme.btnActive};
    color: ${({ theme }) => theme.btnActiveText};
  }
`;

export default DDIconButton;
