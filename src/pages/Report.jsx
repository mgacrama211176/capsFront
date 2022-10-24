import React, { useEffect } from "react";
import styled from "styled-components";
import UploadPercent from "../components/UploadPercent";

const Container = styled.div`
  margin: 50px 0px 0px 100px;
`;

const Wrapper = styled.div``;

const Report = () => {
  return (
    <Container>
      <Wrapper>REPORT</Wrapper>
      <UploadPercent />
    </Container>
  );
};

export default Report;
