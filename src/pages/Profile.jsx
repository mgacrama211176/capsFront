import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import styled from "styled-components";
import Follow from "../components/Follow";
import Card from "../components/Card";
import axios from "axios";
import BGimage from "../assets/tiger.jpg";

//MUI COMPONENTS
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

//REDUX
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

//ROUTER DOM
import { useParams } from "react-router-dom";

//MUI ICONS
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FlagIcon from "@mui/icons-material/Flag";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

/* PROFILE Section*/
const ProfWrapper = styled.div`
  color: white;
  background: #000000ae;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  margin: 0 5rem;
  margin-bottom: 2%;
  justify-content: center;
  align-items: center;
  border-radius: 200px;
`;

//Image Styling

const ImgCon = styled.figure`
  width: 10em;
  height: 10em;
  position: relative;
`;

const Imginner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
`;

const Pimg = styled.img`
  min-width: 100%;
  max-width: 105%;
  min-height: 100%;
  position: absolute;
  object-fit: cover;
`;

// PROF INFO STYLING

const Infowrapper = styled.div`
  padding: 4em 4em 8em 4em;
  width: 100%;
  margin-left: 30px;
`;

const Infoleft = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;
  z-index: 5;
  border-radius: 10px;
`;

const Detailswrap = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5em;
  gap: 2em;
  z-index: 5;
  border-radius: 10px;
`;
const UsernameWrapper = styled.span`
  margin: 2.5rem 1rem;
  text-decoration: uppercase;
  font-size: 2rem;
`;
const Cattitle = styled.span`
  margin: 0;
`;
const TypoDetails = styled.div``;

const Subbtn = styled.button`
  margin-right: 40px;
  text-align: center;
  text-transform: uppercase;
  max-height: 50px;
  transition: 0.5s;
  background-size: 200% auto;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  position: absolute;

  right: 0;
  top: 95px;

  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-position: right center;

    text-decoration: none;
  }
  &:active {
    transform: scale(1.3);
  }
`;

const Bar = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem 0rem;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 2px 2px rgba(9, 9, 9, 0.23);
`;

//About Section

const Abtdthd = styled.h3``;

const Row = styled.div`
  display: flex;
`;
const Aboutwrapper = styled.div`
  color: white;
  background: #000000ae;
  flex: 50%;
  padding: 10px;
  margin-left: 20px;
  margin-right: 10px;
  display: inline-block;
  border-radius: 40px;
  margin-bottom: 2%;
`;

const Aboutme = styled.h1`
  padding-left: 5rem;
`;
const ContentWrap = styled.div`
  align-items: center;
  justify-content: center;
  align-content: center;
  align-self: center;
  margin-left: 45px;
  padding: 3em 2em;
`;

const Aboutdetails = styled.p`
  align-items: center;
  justify-content: center;
  align-content: center;
  align-self: center;
  margin-left: 45px;
  padding: 2em;
`;

const Report = styled.p`
  margin-bottom: 10%;
`;

const Repbtn = styled.button`
  margin: 10px;
  padding: 10px;
  text-align: center;
  text-transform: uppercase;
  max-height: 50px;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  position: absolute;

  background-color: #f51f1ff2;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-position: right center;

    text-decoration: none;
  }
  &:active {
    transform: scale(1.3);
  }
`;

const DownldCV = styled.button`
  margin: 10px;
  padding: 20px;
  text-align: center;
  text-transform: uppercase;
  max-height: 50px;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  position: absolute;

  background-color: #f51f1ff2;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-position: right center;

    text-decoration: none;
  }
  &:active {
    transform: scale(1.3);
  }
`;

//Video Sectiton

const Vidtitle = styled.h1`
  color: white;
  margin-left: 20px;
`;
const VidWrapper = styled.div`
  max-width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 2%;
  border-radius: 40px;
`;

const VidContainer = styled.div`
  display: flex;
  flex-flow: wrap row;
  padding: 20px;
  gap: 10px;
`;

//Contact Section

const ContactWrapper = styled.div`
  color: white;
  background: #000000ae;
  max-width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  margin-left: 20px;
  margin-right: 10px;
  align-content: center;
  justify-content: center;
  border-radius: 40px;
  margin-bottom: 2%;
`;

const ContactInnerWrap = styled.div`
  background-color: #f2f2f2b3;

  padding: 10% 15%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 5em;
`;
const ContactDetails = styled.div``;

const ContactHeader = styled.h1`
  padding: 0;
  color: black;
`;

const Submitbtn = styled.button`
  margin: 10px;
  padding: 20px 30px;
  text-align: center;
  text-transform: uppercase;
  max-height: 50px;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  border-radius: 10px;
  display: block;
  border: 0px;
  font-weight: 700;
  position: absolute;

  background-color: #f51f1ff2;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    background-position: right center;

    text-decoration: none;
  }
  &:active {
    transform: scale(1.3);
  }
`;
//MODAL

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 250,
  bgcolor: "#f3ededb9",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Profile = ({ nav }) => {
  let { id } = useParams();

  const [retrivedUser, setRetrievedUser] = useState({});
  const [retrievedVideos, setRetrivedVideos] = useState([]);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/${id}`
      );
      setRetrievedUser(profile.data);
    };

    const fetchingVideos = async () => {
      const Uploaded = await axios.get(
        `https://capstoneback2.herokuapp.com/api/videos/find/userVideos/${id}`
      );
      setRetrivedVideos(Uploaded.data);
    };

    getProfile();
    fetchingVideos();
  }, [id]);

  const currentUser = useSelector((state) => state.username.currentUser);

  const handleClose = () => {
    setOpen(false);
  };

  ///MODAL
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  ////

  const MainWrapper = styled.div`
    background-color: black;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    font-family: Roboto, Arial, sans-serif;
    width: 100%;

    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
  `;

  return (
    <MainWrapper>
      {/* Profile Section */}
      <ProfWrapper>
        <Infowrapper>
          <Infoleft>
            <ImgCon>
              <Imginner>
                <Pimg src={retrivedUser.image}></Pimg>
              </Imginner>
            </ImgCon>

            <UsernameWrapper>
              {retrivedUser.fullName !== undefined
                ? retrivedUser.fullName
                : retrivedUser.username}
              <br />
              {retrivedUser.userCategory}

              <PersonOutlineIcon />
            </UsernameWrapper>
            <Subbtn>
              <>
                <Follow currentUser={currentUser} channelID={id} />
              </>
            </Subbtn>
          </Infoleft>
          <Detailswrap>
            <Cattitle></Cattitle>

            <TypoDetails>
              {retrivedUser.subscribers} Subscribers
              <br />
              {retrivedUser?.subscribedUsers?.length} Subscribed Users
            </TypoDetails>
          </Detailswrap>
        </Infowrapper>
      </ProfWrapper>

      {/* About Section */}
      <Row>
        <Aboutwrapper>
          <Aboutme>About Me</Aboutme>
          <Aboutdetails>{retrivedUser.about}</Aboutdetails>
          <ContentWrap>
            <Abtdthd>Details</Abtdthd>
            <hr />
            Name:
            <>
              {retrivedUser.fullName !== undefined
                ? retrivedUser.fullName
                : retrivedUser.username}
            </>
            <hr />
            Birthdate: {retrivedUser.birthdate}
            <hr />
            User email: {retrivedUser.email}
            <hr />
            Address: {retrivedUser.address}
          </ContentWrap>
        </Aboutwrapper>
        <Aboutwrapper>
          <ContentWrap>
            <Abtdthd>Stats</Abtdthd>
            <hr />
            Joined {currentUser?.createdAt}
            <hr />
            Total views: 100
            <hr />
            <Report>
              <Repbtn onClick={handleOpen}>
                Report user
                <FlagIcon />
              </Repbtn>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    What is the issue?
                  </Typography>

                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="Report 1"
                      control={<Radio />}
                      label="Report 1"
                    />
                    <FormControlLabel
                      value="Report 2"
                      control={<Radio />}
                      label="Report 2"
                    />
                    <FormControlLabel
                      value="Report 3"
                      control={<Radio />}
                      label="Report 3"
                    />
                    <FormControlLabel
                      value="Report 4"
                      control={<Radio />}
                      label="Report 4"
                    />
                  </RadioGroup>
                  <Repbtn onClick={handleOpen}>Submit report</Repbtn>
                </Box>
              </Modal>
            </Report>
            <hr />
            You can check more about the user's info for business and employment
            purposes by clicking "Download CV"
            <DownldCV>Download CV</DownldCV>
          </ContentWrap>
        </Aboutwrapper>
      </Row>

      <VidWrapper>
        <Vidtitle>Videos</Vidtitle>
        <VidContainer>
          <>
            {retrievedVideos.map((video) => (
              <Card
                key={video._id}
                video={video}
                type="profile"
                currentUser={currentUser}
              />
            ))}
          </>
        </VidContainer>
      </VidWrapper>

      {/* Contact Me Section */}
      <ContactWrapper>
        <ContactInnerWrap>
          <ContactDetails>
            <ContactHeader>
              Contact Me
              <ContactMailIcon />
            </ContactHeader>
            <Stack component="form" spacing={2} noValidate autoComplete="off">
              <TextField
                label="Email"
                helperText="Please enter your email"
                defaultValue="hatsunemiku@gmail.com"
              />
              <TextField
                sx={{
                  width: "50ch",
                  height: "18ch",
                }}
                label="Message"
                multiline
                rows={4}
                helperText="Input some message"
                defaultValue="Hi! I am interested with your videos and artworks."
              />
            </Stack>
            <Submitbtn>Send</Submitbtn>
          </ContactDetails>
        </ContactInnerWrap>
      </ContactWrapper>
      <Footer />
    </MainWrapper>
  );
};

export default Profile;
