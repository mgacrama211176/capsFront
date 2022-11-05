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

import FormLabel from "@mui/material/FormLabel";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import Tooltip from "@mui/material/Tooltip";
import ScrollToTop from "react-scroll-to-top";
//REDUX
import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

//ROUTER DOM
import { useParams, Link } from "react-router-dom";

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

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 34%;
    right: 250px;
  }
`;

const Followrap = styled.div``;

const Infowrapper = styled.div`
  margin-top: 2%;
  padding: 4em 4em 8em 4em;
  width: 85%;
  background-color: #132550;
  border-radius: 100px;
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

  /* Mobile Large */
  @media (max-width: 425px) {
    margin-left: 22%;
  }
`;

const Imginner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 90%;
    height: 90%;
  }
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
  /* Mobile Large */
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;

const Detailswrap = styled.div`
  width: 100%;
  display: flex;
  padding: 1em;

  justify-content: center;
`;

const Subsinfo = styled.p`
  display: flex;
  gap: 2em;
  position: relative;
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 0.8em;
  }
`;
const UsernameWrapper = styled.span`
  margin: 2.5rem 1rem;
  text-decoration: uppercase;
  font-size: 2rem;
  /* Mobile Large */
  @media (max-width: 425px) {
    margin: 2.5rem 5rem;
    font-size: 1.1em;
  }
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

  right: 60px;
  top: 120px;

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
  /* Mobile Laptop */
  @media (max-width: 1024px) {
    right: 30px;
    top: 130px;
  }
  /* Mobile Tablet */
  @media (max-width: 768px) {
  }
  /* Mobile Large */
  @media (max-width: 425px) {
    right: 60px;
    top: 220px;
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
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 42%;
  }
`;

const Aboutme = styled.h1`
  padding-left: 5rem;
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding-left: 5em;
  }
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

const Aboutdt = styled.p`
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 0.8em;
  }
`;

const Report = styled.p`
  margin-bottom: 10%;
`;

const Repbtn = styled.button`
  /* AIC || JCC*/
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
  /* Mobile Large */
  @media (max-width: 425px) {
    padding: 10px 15px;
    font-size: 0.8em;
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
  /* Mobile Large */
  @media (max-width: 425px) {
    padding: 10px 15px;
    font-size: 0.8em;
  }
`;

//Video Sectiton

const Vidtitle = styled.h1`
  color: white;
  margin-left: 20px;

  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding: 5px;
  }
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

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 42%;
    right: 250px;
  }
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
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 42%;
    margin-right: 600px;
  }
`;

const ContactInnerWrap = styled.div`
  background-color: #f2f2f2b3;
  padding: 10% 15%;
  margin-top: 3%;
  margin-bottom: 3%;
  border-radius: 5em;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 50%;
  }
`;
const ContactDetails = styled.div``;

const ContactHeader = styled.h1`
  padding: 0;
  color: black;
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding: 5px;
  }
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
  /* Mobile Large */
  @media (max-width: 425px) {
    padding: 10px 15px;
    bottom: 4px;
    font-size: 0.8em;
    font-weight: 700;
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
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: smaller;
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
  bgcolor: "#f3eded",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// SX Media
const InputMedia = {
  width: {
    xs: "200px",
    sm: "300px",
    md: "350px",
    lg: "400px",
    xl: "500px",
  },
  fontSize: {
    xs: "20px",
    sm: "30px",
    md: "40px",
    lg: "50px",
    xl: "60px",
  },
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

  // const onClickDownload = () => {
  //   try {
  //     // using Java Script method to get PDF file
  //     fetch(retrivedUser.uploadCV).then((response) => {
  //       response.blob().then((blob) => {
  //         // Creating new object of PDF file
  //         const fileURL = window.URL.createObjectURL(blob);
  //         // Setting various property values
  //         let alink = document.createElement("a");
  //         alink.href = fileURL;
  //         alink.download = "SamplePDF.pdf";
  //         alink.click();
  //       });
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  return (
    <MainWrapper>
      <ScrollToTop smooth top="300" color="#132550" />
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
                <Subsinfo>
                  {retrivedUser.subscribers} Subscribers
                  <Vl />
                  {retrivedUser?.subscribedUsers?.length} Subscribed Users
                </Subsinfo>
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
                <Aboutdt>
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
                </Aboutdt>
              </ContentWrap>
            </Aboutwrapper>
            <Aboutwrapper>
              <ContentWrap>
                <Abtdthd>Stats</Abtdthd>
                <Aboutdt>
                  <hr />
                  Joined {retrivedUser?.createdAt}
                  <hr />
                  Total views: 100
                  <hr />
                </Aboutdt>
                <Report>
                  <Repbtn onClick={handleOpen}>
                    Report user
                    {/* <FlagIcon /> */}
                  </Repbtn>

                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                  >
                    <Box sx={{ ...style, width: 400, height: 300 }}>
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
                          value="Privacy"
                          control={<Radio />}
                          label="Privacy"
                        />
                        <FormControlLabel
                          value="Spams and scams"
                          control={<Radio />}
                          label="Spams and scams"
                        />
                        <FormControlLabel
                          value="Violent threats"
                          control={<Radio />}
                          label="Violent threats"
                        />
                        <FormControlLabel
                          value="Cyberbullying and harassment"
                          control={<Radio />}
                          label="Cyberbullying and harassment"
                        />
                        <FormControlLabel
                          value="Other issues"
                          control={<Radio />}
                          label="Other issues"
                        />
                      </RadioGroup>
                      <ChildModal />
                    </Box>
                  </Modal>
                </Report>
                <hr />
                <Aboutdt>
                  You can check more about the user's info for business and
                  employment purposes by clicking "Download CV"
                </Aboutdt>
                <a href={retrivedUser.uploadCV} download target="_blank">
                  <DownldCV>Download CV</DownldCV>
                </a>
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
                    defaultValue={retrivedUser.email}
                    sx={InputMedia}
                  />
                  <TextField
                    sx={{
                      InputMedia,
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
        </>
      )}
      <Footer />
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
      <Submitbtn onClick={handleOpen}>Next</Submitbtn>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400, height: 300 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Report User
          </Typography>
          <TextField
            sx={{
              width: 400,
            }}
            label="Additional context"
            multiline
            rows={6}
            helperText="Provide additional description"
          />{" "}
          <Submitbtn onClick={handleOpen}>Next</Submitbtn>
          <SubmitRpt />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export function SubmitRpt() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Submitbtn onClick={handleOpen}>Next</Submitbtn>
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
