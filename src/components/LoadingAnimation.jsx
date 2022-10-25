import React from "react";
import styled from "styled-components";

const PostSk = styled.div`
  width: 274px;
  margin: 0 12px 30px 0;
`;

const PostImgSk = styled.div`
  background-color: #313131;
  width: 274px;
  height: 153px;
`;

const PostInfoSk = styled.div`
  display: flex;
  margin-top: 15px;
`;

const PostAvatarSk = styled.div`
  background-color: #313131;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const PostDetailSk = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PostTextSk = styled.div`
  background-color: #313131;
  width: 90%;
  height: 20px;
  margin-bottom: 5px;
`;

export const LoadingAnimation = ({ type }) => {
  const FeedSkeleton = () => (
    <>
      <PostSk>
        <PostImgSk></PostImgSk>
        <PostInfoSk>
          <PostAvatarSk></PostAvatarSk>
          <PostDetailSk>
            <PostTextSk></PostTextSk>
            <PostTextSk></PostTextSk>
          </PostDetailSk>
        </PostInfoSk>
      </PostSk>
    </>
  );
  return FeedSkeleton;
};
