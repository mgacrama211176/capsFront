import React from "react";
import styled from "styled-components";

import TimeLine from "./TimeComp/TimeLine";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

//Media Queries
import { device } from "../media";

const Profile = styled.div`
  background-color: white;
  border-radius: 6px;
  max-width: 288px;
  width: 100%;
  display: inline-block;
  border: 1px solid black;
  margin: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 10px 20px 0 rgba(0, 0, 0, 0.19);
`;

const ProfileName = styled.div`
  padding: 20px;
`;

const ImgCon = styled.figure`
  margin-top: -10px;
  max-width: 288px;
  clip-path: polygon(0 9%, 100% 0, 100% 85%, 0% 100%);
  max-width: 288px;
`;

const Pimg = styled.img`
  width: 100%;
`;

const Pinfo = styled.div``;
const TypoName = styled.p`
  text-decoration: uppercase;
  font-size: 17px;
  font-weight: bold;
`;
const TypoTitle = styled.p`
  font-size: 13px;
  color: #777;
`;

const CVbt = styled.button`
  appearance: button;
  background-color: #132550;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #000 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #ffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roboto, Arial, sans-serif;
  font-size: 16px;
  font-weight: bolder;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;

  margin-left: 40px;
  margin-bottom: 8px;

  &:focus {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
    outline: 0;
  }
  &:not([disabled]):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

const Prof = ({ retrivedUser }) => {
  return (
    <Profile>
      <ProfileName>
        <TypoName>
          {retrivedUser.fullName !== undefined
            ? retrivedUser.fullName
            : retrivedUser.username}
        </TypoName>
        <TypoTitle>{retrivedUser.email}</TypoTitle>
      </ProfileName>
      <ImgCon>
        <Pimg src={retrivedUser.image}></Pimg>
      </ImgCon>
      <Pinfo>
        <TimeLine retrivedUser={retrivedUser} />
      </Pinfo>
      <CVbt variant="contained">
        Download CV
        <FileDownloadIcon />
      </CVbt>
    </Profile>
  );
};

export default Prof;
