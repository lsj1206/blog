// Pagination Component
import React, { useEffect } from "react";
import { styled } from "../../styles/Theme";
// Assets
import { PrevIcon, PrevShiftIcon, NextIcon, NextShiftIcon } from "../../assets/assets";
// Components
import IconButton from "../buttons/IconButton";
import TextButton from "../buttons/TextButton";

const Pagination = ({ totalPageSize, nowPage, onPageChange }) => {
  const maxLange = 5; // Pagination 숫자 버튼 개수

  const getPageNumbers = () => {
    const numberArray = [];
    const start = Math.max(1, nowPage - Math.floor(maxLange / 2));
    const end = Math.min(totalPageSize, start + maxLange - 1);
    const newStart = Math.max(1, end - maxLange + 1);

    for (let i = newStart; i <= end; i++) {
      numberArray.push(i);
    }
    return numberArray;
  };

  // 현재 페이지가 totalPageSize를 초과하지 않도록 보정
  useEffect(() => {
    if (nowPage > totalPageSize) {
      onPageChange(totalPageSize || 1);
    }
  }, [totalPageSize, nowPage, onPageChange]);

  const pageNumbers = getPageNumbers();

  return (
    <Wrapper aria-label="Pagination">
      <MoveButton
        size={[20, 20]}
        icon={PrevShiftIcon}
        onClick={() => onPageChange(1)}
        ariaLabel="Go to first page"
        disabled={nowPage === 1}
      />
      <MoveButton
        size={[20, 20]}
        icon={PrevIcon}
        onClick={() => onPageChange(Math.max(1, nowPage - 1))}
        ariaLabel="Go to previous page"
        disabled={nowPage === 1}
      />
      <NumberButtons>
        {pageNumbers.map((page) => (
          <NumberButton
            key={page}
            size={[30, 30]}
            text={page}
            $onPage={page === nowPage}
            ariaLabel={`Go to page ${page}`}
            aria-current={page === nowPage ? "page" : undefined}
            onClick={() => onPageChange(page)}
          />
        ))}
      </NumberButtons>
      <MoveButton
        size={[20, 20]}
        icon={NextIcon}
        onClick={() => onPageChange(Math.min(totalPageSize, nowPage + 1))}
        ariaLabel="Go to next page"
        disabled={nowPage === totalPageSize}
      />
      <MoveButton
        size={[20, 20]}
        icon={NextShiftIcon}
        onClick={() => onPageChange(totalPageSize)}
        ariaLabel="Go to last page"
        disabled={nowPage === totalPageSize}
      />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const MoveButton = styled(IconButton)`
  margin: 0 0.1rem;
  border-radius: 50%;

  &:hover {
    background-color: ${({ theme }) => theme.bgSub};
  }
  &:active {
    background-color: ${({ theme }) => theme.btnActive};
  }
`;

const NumberButtons = styled.div`
  display: flex;
`;

const NumberButton = styled(TextButton)`
  margin: 0;
  background-color: ${({ $onPage }) => ($onPage ? "" : "transparent")};
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
`;

export default Pagination;
