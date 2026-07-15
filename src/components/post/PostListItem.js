// Post List Item Component
import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { styled } from "../../styles/Theme";
// Assets
import { CategoryIcon, DateIcon, TagsIcon } from "../../assets/assets";

const PostListItem = ({ className, post }) => {
  return (
    <Wrapper className={className} to={`/post/${post?.slug}`}>
      <Img image={getImage(post?.coverImage)} alt={post?.title || "Post thumbnail"} />
      <TextContainer>
        <TitleText>{post?.title}</TitleText>
        <Text>
          <CategoryIcon aria-hidden="true" focusable="false" />
          {post?.category}
          <DateIcon aria-hidden="true" focusable="false" />
          {post?.createDate}
        </Text>
        <TagContainer>
          <TagsIcon aria-hidden="true" focusable="false" />
          {post?.tag.map((tag) => (
            <TagItem key={tag}>{tag}</TagItem>
          ))}
        </TagContainer>
      </TextContainer>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 0 2rem;
  width: 100%;
  color: inherit;
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: inherit;
  }

  &:hover h4,
  &:focus-visible h4 {
    color: ${({ theme }) => theme.highlightText};
    transition: color 0.3s ease-in-out;
  }

  &:hover img,
  &:focus-visible img {
    transform: scale(1.125);
    transition: transform 0.3s ease-in-out;
  }

  &:active {
    transform: scale(0.975);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.narrow}) {
    flex-direction: column;
  }
`;

const Img = styled(GatsbyImage)`
  flex-shrink: 0;
  margin: 0 1.75rem 0 0;
  width: 10rem;
  min-height: 7.5rem;
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.5);

  @media (max-width: ${({ theme }) => theme.breakpoints.narrow}) {
    margin-left: 10%;
    width: 90%;
    height: 9rem;
  }

  img {
    object-fit: cover !important;
    object-position: center !important;
    width: 100%;
    height: 100%;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0.5rem 0;
  padding: 0 0.75rem 0 0;
  width: 100%;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.narrow}) {
    width: 90%;
  }
`;

const TitleText = styled.h4`
  margin: 0;
  width: 100%;
  color: ${({ theme }) => theme.text};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  height: 2rem;
  color: ${({ theme }) => theme.bgText};
  font-weight: bolder;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);

  svg {
    flex-shrink: 0;
    margin: 0 0.5rem 0 1rem;
    width: 1.125rem;
    height: 1.125rem;
    fill: ${({ theme }) => theme.bgText};
  }

  svg:first-of-type {
    margin: 0 0.5rem 0 0;
  }
`;

const TagContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  width: 100%;
  min-height: 1.75rem;

  svg {
    flex-shrink: 0;
    margin: 0.3rem 0.3rem 0 0;
    width: 1.125rem;
    height: 1.125rem;
    fill: ${({ theme }) => theme.bgText};
  }
`;

const TagItem = styled.span`
  display: flex;
  align-items: center;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0 0.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.btnActiveText};
  color: ${({ theme }) => theme.btnActive};
  font-size: 0.9rem;
  font-weight: bolder;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
`;

export default PostListItem;
