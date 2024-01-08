import styled, { css } from "styled-components";

export const PostContainer = styled.div`
  width: 1000px;
  flex-direction: column;
  padding: 0px 21.6px 0px 36px;
  flex: 1;
  word-wrap: break-word;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, Dotum, 돋움, sans-serif;
  border: 0;
  background: transparent;
  font-style: normal;
  @media (max-width: 1024px) {
    width: 100%;
  }
`;
export const PostHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;
`;
export const TitleContainer = styled.div`
  display: flex;
`;
export const WriterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const PostAuthor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 1em;
  font-size: 1em;
  color: #666;
`;
export const CommentText = styled.p`
  color: #354b45;
  font-family: Noto Sans KR;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  margin: 0;
  padding: 0;
`;
export const PostNickName = styled.p`
  display: flex;
  margin: 0;
  padding: 0;
`;
export const PostDate = styled.p`
  font-size: 0.8em;
  color: #999;
  margin: 0;
`;

export const PostViews = styled.div`
  display: flex;
  padding: 1em;
  align-items: center;
  justify-content: flex-end;
  font-size: 1em;
  color: #999;
`;
export const PostBody = styled.div`
  width: 100%;
  padding: 20px;
  margin: 20px;
`;
export const PostTitle = styled.h3`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #333;
  padding: 1em;
`;

export const PostContent = styled.div`
  font-size: 1em;
  color: #666;
  word-wrap: break-word;
  overflow: auto;
  line-height: 1.5;
  padding: 1em 0;
  img {
    max-width: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  p,
  span,
  div {
    max-width: 100%;
    white-space: pre-wrap;
  }
`;

export const PostVotes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
`;

export const HeadText = styled.span`
  cursor: pointer;
`;

export const CommentContainer = styled.div`
  width: 100%;
  margin-top: 2em;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, Dotum, 돋움, sans-serif;
`;

export const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;

  &:not(:first-child) {
    margin-top: 2em;
  }
`;

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-size: 1em;
  color: #666;
  padding: 1em;

  &:first-child {
    margin-top: 15px;
  }

  &:not(:first-child) {
    margin-left: 20px;
  }
`;
export const CommentNickname = styled.p`
  color: #000000;
  font-weight: bold;
  cursor: pointer;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1em 0;
  overflow: hidden;
  width: 100%;
  height: 38px;
  margin-top: 15px;
  font-size: 13px;
  color: #333;
`;

export const InformationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, Dotum, 돋움, sans-serif;
  font-style: normal;
`;
export const InputCommonStyle = css`
  display: block;
  margin: 0;
  padding: 0;
  background: transparent;
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, Dotum, 돋움, sans-serif;
  font-style: normal;
`;

export const SmallInput = styled.input`
  ${InputCommonStyle}
  width: 100%;
  height: 30px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

export const LargeInput = styled.textarea`
  ${InputCommonStyle}
  padding: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.9);

  @media (max-width: 1024px) {
    height: 200px;
  }
`;

export const CommentButton = styled.button`
  ${InputCommonStyle}
  width: 300px;
  border: 1px solid #0d47a1;
  border-radius: 5px;
  background-color: #e3f2fd;
  &:after {
    clear: both;
    display: block;
    visibility: hidden;
    content: "";
  }
  @media (max-width: 1024px) {
    width: 100%;
    height: 50px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  padding: 0;
  background-color: rgba(238, 238, 238, 0.1);
  color: #1e90ff;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 0.6em;
  background-color: rgba(238, 238, 238, 0.1);
  color: #1e90ff;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
export const CommentForm = styled.form`
  display: block;
  padding: 12px;
  background: #fafafa;
  border-top: 2px solid #90caf9; // 색상 변경
  border-bottom: 2px solid #90caf9; // 색상 변경
  font-size: 12px;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, Dotum, 돋움, sans-serif;
`;

export const Dropdown = styled.select`
  width: 10em;
  height: 2em;
  margin: 10px;
  padding: 5px;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #90caf9;
  }
`;

export const ReplyFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
  font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo",
    "Malgun Gothic", "맑은 고딕", arial, 굴림, Gulim, sans-serif;
  font-size: 13px;
  color: #333;
  list-style: none;
  margin: 0;
  border: 0;
  vertical-align: baseline;
  background: transparent;
  font-style: normal;
  padding: 9px 12px 7px;
  border-top: 1px solid #ddd;
  margin-top: 0px;
`;

export const ReplyContent = styled.div`
  ${CommentContent}
  margin-left: 30px;
`;

export const PaginationButton = styled.button`
  margin-top: 15px;
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 14px;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

export const CommentFormFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const CommentFormWrapper = styled.div`
  ${CommentForm}
  margin-top: 15px;
`;
export const PostUpvote = styled.button`
  background: none;
  border: none;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &::before {
    border: 2px solid #37474f;
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1);
  }

  &::after {
    background: #fff;
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    &::after {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 1);
    }
  }

  ${(props) =>
    props.inverted &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #7986cb;
      }

      &::after {
        background: #7986cb;
      }

      &:hover {
        color: #7986cb;
      }
    `}

  ${(props) =>
    props.invertedAlt &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #3f51b5;
      }

      &::after {
        background: #3f51b5;
      }

      &:hover {
        color: #3f51b5;
      }
    `}
`;
export const PostDownvote = styled.button`
  background: none;
  border: none;
  height: 60px;
  position: relative;

  &::before,
  &::after {
    content: "";
    z-index: -1;
    border-radius: inherit;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
    transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);
  }

  &::before {
    border: 2px solid #37474f;
    opacity: 0;
    transform: scale3d(1.2, 1.2, 1);
  }

  &::after {
    background: #fff;
  }

  &:hover {
    &::before {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }

    &::after {
      opacity: 0;
      transform: scale3d(0.8, 0.8, 1);
    }
  }

  ${(props) =>
    props.inverted &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #7986cb;
      }

      &::after {
        background: #7986cb;
      }

      &:hover {
        color: #7986cb;
      }
    `}

  ${(props) =>
    props.invertedAlt &&
    css`
      transition: color 0.3s;
      transition-timing-function: cubic-bezier(0.75, 0, 0.125, 1);

      &::before {
        border-color: #3f51b5;
      }

      &::after {
        background: #3f51b5;
      }

      &:hover {
        color: #3f51b5;
      }
    `}
`;

export const ButtonText = styled.span`
  padding-left: 0.35em;
`;
export const CommentPageButton = styled.button`
  --flip-button-height: 40px;
  width: 50%;
  height: var(--flip-button-height);
  color: transparent;
  background: #018cff;
  border-radius: 0;
  perspective: 500px;
  transition: 0.3s;
  position: relative; // 추가

  &:hover {
    color: white;
    background: #018cff;
    .front {
      transform: rotateX(-90deg);
    }

    .back {
      transform: rotateX(0deg);
    }
  }

  .front,
  .back {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: white; // 추가
    background: var(--btn-bg); // 추가
    transition: 0.3s;
    transform-origin: center center calc(var(--flip-button-height) / -2);
  }

  .back {
    transform: rotateX(88deg);
  }
`;
