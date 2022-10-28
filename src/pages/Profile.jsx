import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import styled from "styled-components";
import Follow from "../components/Follow";
import Card from "../components/Card";
import axios from "axios";

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
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

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

//loader
import { LoadingAProfile } from "../components/LoadingAnimation";

const MainWrapper = styled.div`
  position: relative;
  font-family: Roboto, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

/* PROFILE Section*/
const ProfWrapper = styled.div`
  color: white;
  width: 85%;
  position: relative;
  display: flex;
  margin-bottom: 2%;
  justify-content: center;
  align-items: center;
`;

const Followrap = styled.div``;

const Infowrapper = styled.div`
  margin-top: 2%;
  padding: 4em 4em 8em 4em;
  width: 85%;
  /* margin-left: 30px; */
  background-color: #132550;
  border-radius: 100px;
  /* max-height: 180px; */

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const Infoleft = styled.div`
  width: 100%;
  display: flex;
  gap: 2em;
  z-index: 5;
`;

const Detailswrap = styled.div`
  width: 100%;
  display: flex;
  padding: 1em;
  gap: 2em;
  justify-content: center;
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
  width: 98%;
  gap: 10px;
  margin: 0px 100px;

  /* Tablet */
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;
const Aboutwrapper = styled.div`
  color: white;
  background: #383535;
  flex: 50%;
  padding: 10px;

  /* margin-right: 100px; */
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
  margin-left: 0px;
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
  color: white;
  margin-left: 20px;
`;
const VidWrapper = styled.div`
  width: 98%;
  position: relative;
  background-color: #383535;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  margin: 2% 100px;
  /* margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 2%; */
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
  background: #383535;
  width: 98%;
  position: relative;
  overflow: hidden;
  display: flex;
  margin: 0px 100px;

  align-content: center;
  justify-content: center;
  border-radius: 20px;
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
const Scrolltopbt = styled.button`
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
const Scrolltopwrap = styled.div`
  justify-content: center;
  color: black;
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
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getProfile = async () => {
      const profile = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/${id}`
      );
      setRetrievedUser(profile.data);
      setLoader(false);
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
  function scrollTop() {
    let e = document.getElementById("Top");
    e.scrollIntoView({
      block: "start",
      behavior: "smooth",
      inline: "start",
    });
  }

  return (
    <MainWrapper>
      {loader ? (
        <>
          <LoadingAProfile />
        </>
      ) : (
        <>
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
                  <Follow currentUser={currentUser} merger={retrivedUser} />
                </Subbtn>
              </Infoleft>
              <Detailswrap>
                {retrivedUser.subscribers} Subscribers
                <Vl />
                {retrivedUser?.subscribedUsers?.length} Subscribed Users
              </Detailswrap>
              <Anchorwrap>
                <Anchorbt onClick={scrollAbout}>About</Anchorbt>
                <AnchorVl />
                <Anchorbt onClick={scrollVideos}>Videos</Anchorbt>
                <AnchorVl />
                <Anchorbt onClick={scrollContact}>Contact</Anchorbt>
              </Anchorwrap>
            </Infowrapper>
          </ProfWrapper>
          {/* About Section */}
          <Row>
            <Aboutwrapper id="About">
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
                Joined {retrivedUser?.createdAt}
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
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400 }}>
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
                      <ChildModal />
                    </Box>
                  </Modal>
                </Report>
                <hr />
                You can check more about the user's info for business and
                employment purposes by clicking "Download CV"
                <DownldCV>Download CV</DownldCV>
              </ContentWrap>
            </Aboutwrapper>
          </Row>
          <VidWrapper>
            <Vidtitle id="Video">Videos</Vidtitle>
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
            <ContactInnerWrap id="Contact">
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
        </>
      )}
      {/* Profile Section */}
    </MainWrapper>
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
