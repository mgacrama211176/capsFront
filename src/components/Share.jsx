import React from "react";
import { FacebookShareButton } from "react-share";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import styled from "styled-components";

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const share = ({ currentVideo }) => {
  //SHARING SHOULD BE WORKING ONCE DEPLOYED
  const shareUrl = `https://www.youtube.com/channel/UCmewiMiq1dSV1vlX6CGs_aQ`;
  return (
    <Container>
      <FacebookShareButton url={shareUrl}>
        <Wrapper>
          <ScreenShareIcon /> SHARE
        </Wrapper>
      </FacebookShareButton>
    </Container>
  );
};

export default share;
