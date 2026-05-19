// Post List Component
import React, { useState, useMemo } from "react";
import { styled } from "../../styles/Theme";
import { SortTable } from "../../../user-data";
// Assets
import { SortIcon } from "../../assets/assets";
// Components
import DDIconButton from "../../components/buttons/DropDownButton";
import PostListItem from "./PostListItem";
import Pagination from "./Pagination";

const PostList = ({ className, postlist, listName }) => {
  const [sorting, setSorting] = useState(SortTable[0]); // 정렬 기준
  const [nowPage, setNowPage] = useState(1); // 현재 페이지 (default 1)
  const pageSize = 10; // 페이지당 포스트 개수

  // 정렬된 게시물 계산
  const sortedPosts = useMemo(() => {
    const sorted = [...postlist];
    if (sorting === "Latest") {
      return sorted.sort((a, b) => new Date(b.createDate) - new Date(a.createDate)); // 최신순
    } else if (sorting === "Oldest") {
      return sorted.sort((a, b) => new Date(a.createDate) - new Date(b.createDate)); // 오래된순
    }
    return sorted;
  }, [postlist, sorting]);

  // 현재 페이지에 표시될 게시물 계산
  const nowPosts = useMemo(() => {
    const startIdx = (nowPage - 1) * pageSize;
    return sortedPosts.slice(startIdx, startIdx + pageSize);
  }, [sortedPosts, nowPage, pageSize]);

  return (
    <ListContainer className={className}>
      {listName && (
        <ListHeader>
          <ListName>
            {listName}
            <PostsNum>{` (${sortedPosts?.length})` || `-`}</PostsNum>
          </ListName>
          <SortButton
            size={[30, 30]}
            icon={SortIcon}
            ariaLabel="Sort posts"
            list={SortTable}
            onClick={(option) => {
              setSorting(option);
              setNowPage(1); // 정렬 변경 시 첫 페이지로 이동
            }}
          />
        </ListHeader>
      )}
      <BorderLine />
      <PostListContainer>
        {nowPosts?.length > 0 ? (
          nowPosts?.map((post) => <PostListItem key={post?.slug} post={post} />)
        ) : (
          <NoResultsText>No results found</NoResultsText>
        )}
      </PostListContainer>
      {nowPosts?.length > 0 ? (
        <>
          <BorderLine />
          <Pagination
            totalPageSize={Math.ceil(sortedPosts.length / pageSize)}
            nowPage={nowPage}
            onPageChange={setNowPage}
          />
        </>
      ) : (
        <></>
      )}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    width: 95%;
  }
`;

const BorderLine = styled.div`
  margin-bottom: 10px;
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.brLine};
`;

const ListHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.3);
`;

const ListName = styled.h2`
  margin: 0;
`;

const PostsNum = styled.span`
  color: ${({ theme }) => theme.bgText};
  font-size: 1.5rem;
`;

const SortButton = styled(DDIconButton)`
  z-index: 10;
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  overflow: hidden;
`;

const NoResultsText = styled.p`
  margin: 0 0 2rem;
  width: 100%;
  color: ${({ theme }) => theme.highlightText};
  font-size: 1.2rem;
`;

export default PostList;
