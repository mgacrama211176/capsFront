import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import styled from "styled-components";
import Follow from "../components/Follow";
import Card from "../components/Card";
import axios from "axios";
import ReportComponent from "../components/ReportComponent";
import { ToastContainer } from "react-toastify";
import Avatar from "@mui/material/Avatar";

//MUI COMPONENTS

import ScrollToTop from "react-scroll-to-top";
//REDUX

import { useSelector } from "react-redux";

//ROUTER DOM
import { useParams } from "react-router-dom";

//MUI ICONS

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
  justify-content: center;
  align-items: center;
  margin: 20px;

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 65%;
    right: 40px;
  }

  /* MOBILE S */
  @media (max-width: 320px) {
    width: 42%;
    right: 73px;
  }
`;

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

  /* Mobile Tablet */
  @media (max-width: 768px) {
    margin-left: 28%;
  }

  /* Mobile Large */
  @media (max-width: 425px) {
    margin-left: 25%;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    margin-left: 15%;
  }
`;

const Imginner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 90%;
    height: 90%;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    width: 70%;
    height: 70%;
  }
`;

const Pimg = styled.img`
  display: block;
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
  /* Mobile Tablet */
  @media (max-width: 768px) {
    padding: 2em;
  }

  /* Mobile Large */
  @media (max-width: 425px) {
    margin: 2em;
  }

  /* MOBILE S */
  @media (max-width: 320px) {
  }
`;

const Subsinfo = styled.div`
  display: flex;
  gap: 2em;
  position: relative;

  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 0.8em;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    font-size: 0.6em;
  }
`;
const UsernameWrapper = styled.div`
  margin: 3.5rem 1rem;
  width: 100%;
  text-decoration: uppercase;
  font-size: 2rem;

  /* Mobile Tablet */
  @media (max-width: 768px) {
    margin: 1rem 0.4rem;
  }
  /* Mobile Large */
  @media (max-width: 425px) {
    margin: -1rem 4rem;
    font-size: 1rem;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    font-size: 0.9em;
    margin: -1.3rem 1.9rem;
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
  margin: 55px 160px;
  right: 0px;

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
    right: 94px;
    top: 160px;
  }
  /* Mobile Tablet */
  @media (max-width: 768px) {
    margin: 50px 85px;
  }
  /* Mobile Large */
  @media (max-width: 425px) {
    margin: 95px 19px;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    margin: 160px 0px;
    right: 50px;
  }
`;

const Vl = styled.div`
  border-left: 3px solid white;
  height: 25px;
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
  /* MOBILE S */
  @media (max-width: 320px) {
    font-size: 0.6em;
    padding: 8px;
    margin: 6px 50px;
  }
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

  display: inline-block;
  border-radius: 40px;
  margin-bottom: 2%;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 79%;
  }

  /* MOBILE S */
  @media (max-width: 320px) {
    width: 61%;
  }
`;

const Aboutme = styled.h1`
  padding-left: 5rem;
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding-left: 5em;
  }
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding-left: 3.3em;
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

const Aboutdt = styled.div`
  /* Mobile Large */
  @media (max-width: 425px) {
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
    font-size: 0.6em;
    /* MOBILE S */
    @media (max-width: 320px) {
      padding: 10px 15px;
    }
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
  margin: 20px;
  border-radius: 40px;

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 82%;
    right: 40px;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    width: 65%;
    right: 74px;
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
  margin: 20px;
  align-content: center;
  justify-content: center;
  border-radius: 20px;
  margin-bottom: 2%;
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 82%;
    right: 40px;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    width: 65%;
    right: 74px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0;
  color: black;
  /* Mobile Large */
  @media (max-width: 425px) {
    font-size: 1.5em;
    padding: 5px;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    font-size: 1.2em;
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
  /* MOBILE S */
  @media (max-width: 320px) {
    font-size: x-small;
  }
`;
const Anchorwrap = styled.div`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
  position: relative;

  /* Mobile Large */
  @media (max-width: 425px) {
    flex-direction: column;
  }
`;
const AnchorVl = styled.div`
  margin-top: 2%;
  border-left: 4px solid white;
  height: 50px;
  /* Mobile Large */
  @media (max-width: 425px) {
    display: none;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    height: 30px;
    border-left: 2px solid white;
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
  bgcolor: "#f3eded",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// SX Media
const InputMedia = {
  width: {
    xs: "150px",
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

const AvaMedia = {
  width: {
    xs: "130px",
    sm: "140px",
    md: "150px",
    lg: "170px",
    xl: "170px",
  },
  height: {
    xs: "130px",
    sm: "140px",
    md: "150px",
    lg: "170px",
    xl: "170px",
  },
};

const Profile = ({ nav }) => {
  let { id } = useParams();

  const [retrivedUser, setRetrievedUser] = useState({});
  const [retrievedVideos, setRetrivedVideos] = useState([]);
  const [loader, setLoader] = useState(true);
  const [message, setMessage] = useState({ email: "", message: "" });

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

  const onChangeHandle = (e) => {
    const contact = { ...message };
    contact[e.target.name] = e.target.value;
    console.log(contact);
    setMessage(contact);
  };

  return (
    <MainWrapper>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
                  <Avatar
                    alt="Remy Sharp"
                    src={retrivedUser.image}
                    sx={AvaMedia}
                  />
                </ImgCon>

                <UsernameWrapper>
                  {retrivedUser.fullName !== undefined
                    ? retrivedUser.fullName
                    : retrivedUser.username}
                  <br />
                  {retrivedUser.userCategory}
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
                  Joined: {retrivedUser?.createdAt}
                  <hr />
                  Employment Status: {retrivedUser.employmentStatus}
                  <ReportComponent retrivedUser={retrivedUser} />
                </Aboutdt>

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
                    name="email"
                    label="Email"
                    helperText="Please enter your email"
                    sx={InputMedia}
                    onChange={(e) => {
                      onChangeHandle(e);
                    }}
                  />
                  <TextField
                    name="message"
                    sx={{
                      InputMedia,
                    }}
                    label="Message"
                    multiline
                    rows={4}
                    helperText="Input some message"
                    defaultValue="Hi! I am interested with your videos and artworks."
                    onChange={(e) => {
                      onChangeHandle(e);
                    }}
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
