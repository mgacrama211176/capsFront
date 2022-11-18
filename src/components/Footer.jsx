import React from "react";
import styled, { css } from "styled-components";

//MUI ICONS
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import CopyrightIcon from "@mui/icons-material/Copyright";
import Logo from "../assets/Logo.png";

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Imgcon = styled.img`
  width: 100px;
  height: 100px;
`;

const SharedStyle = css`
  display: flex;
  flex-flow: wrap row;
  color: white;
`;

const Wrapper = styled.div`
  background-color: #132550;
  ${SharedStyle}
  flex-flow: wrap column;
  align-items: center;
  justify-content: center;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 85%;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    width: 70%;
  }
`;
const H2 = styled.h2`
  color: white;
`;
const P = styled.p`
  color: white;
  margin-bottom: 10px;
`;

const IconWrapper = styled.div`
  ${SharedStyle}
  gap: 1rem;
  margin-bottom: 10px;
`;

function Footer() {
  return (
    <Container>
      <Wrapper>
        <Imgcon src={Logo} alt="" />

        <p>
          {" "}
          <CopyrightIcon />
          2022 CopyRight: Filanime.com
        </p>
        <br></br>

        <IconWrapper>
          <FacebookIcon style={{ cursor: "pointer" }} />
          <InstagramIcon style={{ cursor: "pointer" }} />
          <TwitterIcon style={{ cursor: "pointer" }} />
        </IconWrapper>
      </Wrapper>
    </Container>
  );
}

export default Footer;
