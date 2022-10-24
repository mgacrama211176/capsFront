import React, { useState, useRef } from "react";
import styled from "styled-components";
import background from "../assets/Overcome-bro.png";
const ariaLabel = { "aria-label": "description" };
import { useSelector } from "react-redux";
import axios from "axios";

import BGimage from "../assets/neon.jpg";

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

const Container = styled.div`
  margin: 0px 100px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-image: url("${BGimage}");
  border: 1px solid black;
  border-radius: 15px;
  padding: 30px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  max-width: 100%;
  position: relative;
`;

const H1 = styled.h1``;

const AccountSet = styled.div`
  margin-top: 50px;
  font-size: 36px;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  position: relative;
  /* border: 1px solid black; */
  border-radius: 10px;
  width: 25em;
  height: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
`;

const CardImage = styled.img`
  box-shadow: 5px 5px ${({ theme }) => theme.hover};
  width: 100%;
  border-radius: 50%;
  background-color: transparent;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: bold;
  padding: 10px;
  gap: 10px;
  border: 1px solid black;
`;

const UpdateContainer = styled.div`
  display: flex;
  flex-flow: wrap column;
  gap: 30px;
  justify-content: center;
  align-items: center;
  background-color: #f3f4f593;
`;

const InputContainers = styled.div`
  /* margin-left: 30px;
  margin-right: 30px; */
  padding: 0.5em 3em;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 30em;
`;

const FileUploadContainers = styled.div``;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Submit = styled.button``;

const UpdateImageContainer = styled.div`
  position: absolute;
  display: block;
  right: 90px;
  top: 50px;
  color: white;
  border-radius: 50%;
  border: 1px solid white;
  padding: 5px;

  cursor: pointer;

  &:hover {
    color: #1976d2;
    border: 1px solid #1976d2;
  }
`;

const Select = styled.select``;

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
      <AccountSet>Account Update</AccountSet>
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
            <p>{currentUser?.userCategory}</p>
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
              sx={{ color: "white", fontWeight: "light" }}
              id="username"
              label={currentUser?.username}
              variant="outlined"
              placeholder="Channel Name"
              onChange={(e) => onChangeHandle(e)}
            />

            {/* <TextField
              id="userCategory"
              label={currentUser.userCategory}
              variant="outlined"
              placeholder="Category"
              onChange={(e) => onChangeHandle(e)}
            /> */}

            {/* <Select
              id="userCategory"
              onChange={(e) => onChangeHandle(e)}
              value={newData.userCategory}
            >
              <MenuItem value="Animator">Animator</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </Select> */}

            {/* <Select
              labelId="demo-select-small"
              id="userCategory"
              label="userCategory"
              onChange={(e) => onChangeHandle(e)}
            >
              <MenuItem value="Animator">Animator</MenuItem>
              <MenuItem value="Employer">Employer</MenuItem>
            </Select> */}

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
              id="birthdate"
              // label="Birthdate"
              variant="outlined"
              type="date"
              onChange={(e) => onChangeHandle(e)}
              label="Birthdate"
            />

            <TextField
              id="about"
              label={`About the ${currentUser?.userCategory}`}
              variant="outlined"
              multiline
              maxRows={5}
              onChange={(e) => onChangeHandle(e)}
            />

            {/* <FileUploadContainers>
              <TextField
                id="ProfileImage"
                label="Profile Image"
                variant="outlined"
              />
              <TextField
                id="ProfileBackground"
                label="Profile Background"
                variant="outlined"
              />
              <TextField id="uploadCV" label="uploadCV" variant="outlined" />
            </FileUploadContainers> */}
          </InputContainers>

          <input type="file" />

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            {/* <Button>Upload Profile</Button>
            <Button>Upload Background</Button> */}
            <Button>Upload CV</Button>
          </ButtonGroup>

          <SubmitContainer>
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={onClickUpdateSubmit}
            >
              Submit
            </Button>
          </SubmitContainer>
        </UpdateContainer>
      </Wrapper>
    </Container>
  );
};

export default UpdateProfile;
