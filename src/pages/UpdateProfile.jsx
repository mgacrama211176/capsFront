import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";
import Footer from "../components/Footer";
import Tooltip from "@mui/material/Tooltip";

//MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BrushIcon from "@mui/icons-material/Brush";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const Container = styled.div``;

const ariaLabel = { "aria-label": "description" };

const Wrapper = styled.div`
  margin: 0 100px;
  display: flex;
  justify-content: space-evenly;
  background-color: #132550;
  border-radius: 15px;
  padding: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: 2.2%;
  margin-bottom: 1%;

  /* Tablet */
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }
`;

const CardContainer = styled.div`
  position: relative;
  top: 150px;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  flex-flow: wrap column;
`;

const CardImage = styled.img`
  width: 250%;
  border-radius: 50%;
  background-color: transparent;
`;

const UserInfo = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  text-decoration: uppercase;
  font-size: 2rem;
  align-items: center;
  padding: 10px;
  gap: 10px;
  border-radius: 20px;
  color: white;
`;

const UpdateContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
  gap: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: #f3f4f5c3;
  padding: 30px;
  width: 40%;
`;

const InputContainers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const UpdateImageContainer = styled.div`
  position: absolute;
  display: block;
  right: -100px;
  top: 30px;
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

const Options = styled.option``;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonStyle = {
  width: "100%",
};

// const textfieldStyle = {
//   display: "flex",
//   m: 2,
//   width: "600px",
//   backgroundColor: "Transparent",
// };

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.username);
  const profileRef = useRef(null);
  const backgroudRef = useRef(null);
  const cvRef = useRef(null);
  const UserAccesses = [
    { value: "Animator", label: "Animator" },
    { value: "Employer", label: "Employer" },
  ];

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
        `https://capstoneback2.herokuapp.com/api/users/${currentUser?._id}`,
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
            <p>{currentUser?.username}</p>
            <p>
              {currentUser?.userCategory}
              <PersonOutlineIcon />
            </p>
          </UserInfo>
        </CardContainer>
        <UpdateContainer>
          <Typography variant="h6" gutterBottom>
            Update Profile Information
          </Typography>

          <InputContainers>
            {/* DO NOT TOUCH THIS IS FOR EMAIL */}
            <TextField
              disabled
              id="Email"
              label={currentUser?.email}
              variant="outlined"
              placeholder="Email"
              sx={ButtonStyle}
            />

            <TextField
              id="username"
              label={currentUser?.username}
              variant="outlined"
              placeholder="Channel Name"
              onChange={(e) => onChangeHandle(e)}
              sx={ButtonStyle}
            />

            {currentUser.fullName ? (
              <TextField
                id="fullName"
                label={currentUser?.fullName}
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={ButtonStyle}
              />
            ) : (
              <TextField
                id="fullName"
                label="Full Name"
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={ButtonStyle}
              />
            )}

            {currentUser.address ? (
              <TextField
                id="address"
                label={currentUser.address}
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={ButtonStyle}
              />
            ) : (
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={ButtonStyle}
              />
            )}

            <TextField
              id="birthdate"
              variant="outlined"
              type="date"
              onChange={(e) => onChangeHandle(e)}
              helperText="Birthdate"
              sx={ButtonStyle}
            />
            <TextField
              id="about"
              label={`About the ${currentUser?.userCategory}`}
              variant="outlined"
              helperText="Write a short description about your channel"
              multiline
              maxRows={5}
              onChange={(e) => onChangeHandle(e)}
              sx={ButtonStyle}
            />
          </InputContainers>
          <ButtonContainer>
            <Button variant="contained">
              Upload CV
              <Tooltip
                title="Upload your CV for business and employment purposes"
                arrow
              >
                <HelpOutlineIcon />
              </Tooltip>
            </Button>
            <Button variant="contained">Update Profile</Button>
          </ButtonContainer>
        </UpdateContainer>
        {/* <ButtonContainer>
          <Upcv>
            Upload CV
            <Tooltip
              title="Upload your CV for business and employment purposes"
              arrow
            >
              <HelpOutlineIcon />
            </Tooltip>
          </Upcv>

          <Savebtn onClick={onClickUpdateSubmit}>Save changes</Savebtn>
        </ButtonContainer> */}
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UpdateProfile;
