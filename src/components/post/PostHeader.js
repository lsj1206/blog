// Post Header Component
import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { styled } from "../../styles/Theme";
// Assets
import { CategoryIcon, DateIcon, TagsIcon, LastDateIcon } from "../../assets/assets";

const categoryPath = (category) => `/category/${encodeURIComponent(category)}`;
const tagPath = (tag) => `/search?tag=${encodeURIComponent(tag)}`;

const PostHeader = ({ className, postData }) => {
  return (
    <Wrapper className={className}>
      <Title>{postData?.title}</Title>
      <BorderLine />
      <InfoContainer>
        {postData?.category && (
          <Category to={categoryPath(postData.category)}>
            <CategoryIcon aria-hidden="true" focusable="false" />
            {postData.category}
          </Category>
        )}
        <InfoText>
          <DateIcon aria-hidden="true" focusable="false" />
          {postData?.createDate}
        </InfoText>
        <InfoText>
          <LastDateIcon aria-hidden="true" focusable="false" />
          {postData?.lastDate}
        </InfoText>
      </InfoContainer>
      <TagContainer aria-label="Post tags">
        <TagsIcon aria-hidden="true" focusable="false" />
        {postData?.tag &&
          postData?.tag.map((tag) => (
            <TagItem key={tag} to={tagPath(tag)}>
              {tag}
            </TagItem>
          ))}
      </TagContainer>
      <ImgContainer>
        <Img image={getImage(postData?.coverImage)} alt={postData?.title || "Post cover image"} />
      </ImgContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  color: ${({ theme }) => theme.md.text};
`;

const BorderLine = styled.div`
  margin-bottom: 0.75rem;
  height: 1px;
  background-color: ${({ theme }) => theme.md.border};
`;

const Title = styled.h1`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.md.text};
  font-size: clamp(2rem, 3.2vw, 2.5rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const infoTextStyle = `
  display: flex;
  align-items: center;
  margin: 0;
  color: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.5;
  text-decoration: none;
`;

const InfoText = styled.p`
  ${infoTextStyle}
  color: ${({ theme }) => theme.md.mutedText};

  svg {
    flex-shrink: 0;
    margin: 0 0.5rem 0 0;
    width: 1.125rem;
    height: 1.125rem;
    fill: currentColor;
  }
`;

const Category = styled(Link)`
  ${infoTextStyle}
  flex: 1;
  color: ${({ theme }) => theme.md.mutedText};
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.md.mutedText};
  }

  svg {
    flex-shrink: 0;
    margin: 0 0.5rem 0 0;
    width: 1.125rem;
    height: 1.125rem;
    fill: currentColor;
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
  }
`;

const TagContainer = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 0.25rem;
  width: 100%;
  min-height: 1.75rem;
  color: ${({ theme }) => theme.md.mutedText};

  svg {
    flex-shrink: 0;
    margin: 0.25rem 0.5rem 0.5rem 0;
    width: 1.125rem;
    height: 1.125rem;
    fill: currentColor;
  }
`;

const TagItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0.125rem 0.5rem;
  min-height: 1.5rem;
  background-color: ${({ theme }) => theme.md.surface};
  color: ${({ theme }) => theme.md.mutedText};
  font-size: 0.8125rem;
  font-weight: 600;
  line-height: 1.25;
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.md.border};
  border-radius: 0.25rem;
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.md.mutedText};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    border-color: ${({ theme }) => theme.highlightText};
  }

  &:active {
    opacity: 0.8;
  }
`;

const ImgContainer = styled.div`
  flex-shrink: 0;
  margin: 1.25rem 0 0.5rem;
  width: 100%;
  height: 15rem;
  border: 1px solid ${({ theme }) => theme.md.imageBorder};
  border-radius: 6px;
  overflow: hidden;
`;

const Img = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default PostHeader;
