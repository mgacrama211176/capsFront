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

//Loading Animation
import { LoadingAProfile } from "../components/LoadingAnimation";

/* PROFILE Section*/
const ProfWrapper = styled.div`
  color: white;

  max-width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  margin: 0 5rem;
  margin-bottom: 2%;
  justify-content: center;
  align-items: center;
`;

//Image Styling

const ImgCon = styled.figure`
  width: 10em;
  height: 10em;
  margin-left: 35%;
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
  margin-top: 2%;
  padding: 4em 4em 8em 4em;
  width: 100%;
  margin-left: 30px;
  background-color: #132550;
  border-radius: 100px;
  max-height: 180px;
`;

const Infoleft = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;
  z-index: 5;
`;

const Detailswrap = styled.div`
  width: 100%;
  display: flex;
  padding: 0.5em;
  gap: 2em;
  margin-left: 45%;
`;
const UsernameWrapper = styled.span`
  margin: 2.5rem 1rem;
  text-decoration: uppercase;
  font-size: 2rem;
`;

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

const Vl = styled.div`
  border-left: 3px solid white;
  height: 25px;
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
  color: black;
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

//ANCHOR BUTTONS
const Anchorbt = styled.button`
  margin: 10px;
  padding: 20px 30px;
  text-align: center;
  font-size: 1.7em;
  max-height: 50px;
  transition: 0.5s;
  color: white;
  display: block;
  border: 0px;
  font-weight: 1000;
  background-color: transparent;
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
const Anchorwrap = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  position: relative;
`;
const AnchorVl = styled.div`
  margin-top: 2%;
  border-left: 4px solid white;
  height: 50px;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/${id}`
      );
      setLoading(false);
      setRetrievedUser(profile.data);
    };

    const fetchingVideos = async () => {
      const Uploaded = await axios.get(
        `https://capstoneback2.herokuapp.com/api/videos/find/userVideos/${id}`
      );
      setLoading(false);
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

  //ANCHOR FUNCTIONS
  function scrollAbout() {
    let e = document.getElementById("About");
    e.scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "start",
    });
  }
  function scrollVideos() {
    let e = document.getElementById("Video");
    e.scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "start",
    });
  }
  function scrollContact() {
    let e = document.getElementById("Contact");
    e.scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "start",
    });
  }

  ////

  const MainWrapper = styled.div`
    background-color: #f7f1f1;
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
    <>
      {loading ? (
        <LoadingAProfile />
      ) : (
        <>
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
                    Report User
                    <FlagIcon />
                  </Report>
                  <hr />
                  You can check more about the user's info for business and
                  employment purposes by clicking "Download CV"
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
                  <Stack
                    component="form"
                    spacing={2}
                    noValidate
                    autoComplete="off"
                  >
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
        </>
      )}
    </>
  );
};

export default Profile;

export function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Submitbtn onClick={handleOpen}>Submit report</Submitbtn>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 100 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure to report this user?
          </Typography>
          <Detailswrap>
            <Repbtn onClick={handleClose}>Yes</Repbtn>
            <Repbtn onClick={handleClose}>No</Repbtn>
          </Detailswrap>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
