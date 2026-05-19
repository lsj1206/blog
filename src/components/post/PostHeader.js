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
`;

const BorderLine = styled.div`
  margin-bottom: 10px;
  height: 1px;
  background-color: ${({ theme }) => theme.brLine};
`;

const Title = styled.h1`
  margin: 0;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const infoTextStyle = `
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
  color: inherit;
  font-weight: bolder;
  text-decoration: none;
  text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

const InfoText = styled.p`
  ${infoTextStyle}
  color: ${({ theme }) => theme.bgText};

  svg {
    flex-shrink: 0;
    margin: 0 0.5rem 0 0;
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.bgText};
  }
`;

const Category = styled(Link)`
  ${infoTextStyle}
  flex: 1;
  color: ${({ theme }) => theme.bgText};
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.bgText};
  }

  svg {
    flex-shrink: 0;
    margin: 0 0.5rem 0 0;
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.bgText};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    transform: scale(1.025);
  }

  &:active {
    transform: scale(0.975);
  }
`;

const TagContainer = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  min-height: 1.75rem;

  svg {
    flex-shrink: 0;
    margin: 0.25rem 0.5rem 0.5rem 0;
    width: 1rem;
    height: 1rem;
    fill: ${({ theme }) => theme.bgText};
  }
`;

const TagItem = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 0.5rem 0.5rem 0;
  padding: 0 0.5rem;
  min-height: 1.5rem;
  background-color: ${({ theme }) => theme.btnActiveText};
  color: ${({ theme }) => theme.btnActive};
  font-size: 0.9rem;
  font-weight: bolder;
  text-decoration: none;
  border-radius: 0.25rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;

  &:visited {
    color: ${({ theme }) => theme.btnActive};
  }

  &:hover,
  &:focus-visible {
    color: ${({ theme }) => theme.highlightText};
    transform: scale(1.025);
  }

  &:active {
    transform: scale(0.975);
  }
`;

const ImgContainer = styled.div`
  flex-shrink: 0;
  margin: 0.75rem 0 0.25rem 0;
  width: 100%;
  height: 15rem;
  border-radius: 0.75rem;
  overflow: hidden;
`;

const Img = styled(GatsbyImage)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default PostHeader;
