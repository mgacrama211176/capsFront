import React, { useState, useRef } from "react";
import styled from "styled-components";
import background from "../assets/Overcome-bro.png";
const ariaLabel = { "aria-label": "description" };
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";

import BGimage from "../assets/tiger.jpg";

//MUI
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ButtonGroup from "@mui/material/ButtonGroup";
import BrushIcon from "@mui/icons-material/Brush";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Container = styled.div`
  margin: 0px;
`;

const Wrapper = styled.div`
  margin: 0 100px;
  display: flex;
  justify-content: center;
  background-color: black;
  border: 1px solid black;
  border-radius: 15px;
  padding: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 2.2%;
  margin-bottom: 1%;
  max-width: 100%;
  height: 700px;
`;

const H1 = styled.h1``;

const AccountSet = styled.div`
  margin-top: 50px;
  font-size: 36px;
  margin-left: 100px;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  position: relative;
  width: 25em;
  height: 100%;
  margin-right: 10%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
  margin-right: 5em;
  padding: 2em;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 50%;
  background-color: transparent;
  margin-left: 18%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  text-decoration: uppercase;
  font-size: 2rem;
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: #00060ac0;
  border-radius: 20px;
  color: white;
`;

const UpdateContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
  gap: 30px;
  justify-content: center;
  max-height: fit-content;
  align-items: center;
  border-radius: 20px;
  background-color: #f3f4f5c3;
`;

const InputContainers = styled.div`
  padding: 0 3em;
  display: flex;
  margin-top: -20%;
  flex-direction: column;
  gap: 20px;
  width: 30em;
  max-width: 30em;
`;

const FileUploadContainers = styled.div``;

const Submit = styled.button``;

const UpdateImageContainer = styled.div`
  position: absolute;
  display: block;
  right: 120px;
  top: 50px;
  color: #ffffff;
  background-color: #00000053;
  border-radius: 50%;
  border: 1px solid #00000053;
  padding: 5px;

  cursor: pointer;

  &:hover {
    color: #1976d2;
    border: 1px solid #1976d2;
    background-color: #1976d25c;
  }
`;

const Upcv = styled.button`
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
  margin-top: 30%;
  margin-right: 5%;
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

const Savebtn = styled.button`
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
  margin-top: 30%;
  margin-left: 18%;
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
const CVhelpContainer = styled.div`
  display: block;
  position: absolute;
  margin-top: 29.8%;
  margin-left: 4%;
`;

const Select = styled.select`
  background-color: #fdfdfd36;
  border-radius: 2px;
  height: 55px;
  position: relative;
`;

const Options = styled.option``;

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.username);
  const profileRef = useRef(null);
  const backgroudRef = useRef(null);
  const cvRef = useRef(null);

  const [newData, setNewData] = useState({
    username: "",
    userCategory: "",
    fullName: "",
    address: "",
    birthdate: "",
    about: "",
  });

  const onChangeHandle = (e) => {
    const newUser = { ...newData };
    newUser[e.target.id] = e.target.value;
    setNewData(newUser);
  };

  const onClickUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const update = await axios.put(
        `http://localhost:4000/api/users/${currentUser?._id}`,
        {
          username: newData.username,
          userCategory: newData.userCategory,
          fullName: newData.fullName,
          address: newData.address,
          birthdate: newData.birthdate,
          about: newData.about,
        }
      );
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(newData);

  return (
    <Container>
      {/* <AccountSet>Account Update</AccountSet> */}
      <Wrapper>
        <CardContainer>
          <UpdateImageContainer>
            <BrushIcon />
          </UpdateImageContainer>
          <ImageContainer>
            <CardImage src={currentUser?.image} />
          </ImageContainer>
          <UserInfo>
            <p>{currentUser.username}</p>
            <p>
              {currentUser.userCategory}
              <PersonOutlineIcon />
            </p>
          </UserInfo>
        </CardContainer>

        <UpdateContainer>
          <InputContainers>
            {/* DO NOT TOUCH THIS IS FOR EMAIL */}
            <TextField
              disabled
              id="Email"
              label={currentUser?.email}
              variant="outlined"
              placeholder="Email"
            />

            <TextField
              id="username"
              label={currentUser?.username}
              variant="outlined"
              placeholder="Channel Name"
              onChange={(e) => onChangeHandle(e)}
            />

            <Select
              name="userCategory"
              id="userCategory"
              onChange={(e) => onChangeHandle(e)}
            >
              <Options value="Animator">Animator</Options>
              <Options value="Employer">Employer</Options>
            </Select>

            {currentUser.fullName ? (
              <TextField
                id="fullName"
                label={currentUser?.fullName}
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
              />
            ) : (
              <TextField
                id="fullName"
                label="Full Name"
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
              />
            )}

            {currentUser.address ? (
              <TextField
                id="address"
                label={currentUser.address}
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
              />
            ) : (
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
              />
            )}

            <TextField
              id=""
              variant="outlined"
              type="date"
              onChange={(e) => onChangeHandle(e)}
              helperText="Birthdate"
            />
            <TextField
              id="about"
              label={`About the ${currentUser?.userCategory}`}
              variant="outlined"
              helperText="Write a short description about your channel"
              multiline
              maxRows={5}
              onChange={(e) => onChangeHandle(e)}
            />
          </InputContainers>

          <Upcv>Upload CV</Upcv>
          <CVhelpContainer>
            <HelpOutlineIcon />
          </CVhelpContainer>
          <Savebtn onClick={onClickUpdateSubmit}>Save changes</Savebtn>
        </UpdateContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UpdateProfile;
