import React, { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useSelector } from "react-redux";
import axios from "axios";

//Components
import Footer from "../components/Footer";

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
import { createTheme, useMediaQuery } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

//firebase
import app from "../firebase";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";

const Container = styled.div`
  /* Mobile Large */
  @media (max-width: 425px) {
    width: 100%;
  }
`;

const ariaLabel = { "aria-label": "description" };

const Wrapper = styled.div`
  margin: 0 100px;
  display: flex;
  justify-content: space-evenly;
  background-color: #132550;
  border-radius: 15px;
  padding: 30px;
  margin-top: 2.2%;
  margin-bottom: 1%;
  gap: 30px;

  /* Tablet */
  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
  }

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 75%;
    margin: 10px 20px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;
  display: flex;
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: wrap column;
  max-width: 300px;

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 55%;
  }
`;

const CardImage = styled.img`
  width: 100%;
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
  width: 60%;
  margin: 0px 5px;

  /* Tablet */
  @media (max-width: 768px) {
    width: 85%;
  }
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
  right: 30px;
  top: 35px;
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
// const textfieldStyle = {
//   display: "flex",
//   m: 2,
//   width: "600px",
//   backgroundColor: "Transparent",
// };

const Input = styled.input`
  display: none;
`;

const UpdateProfile = () => {
  const { currentUser } = useSelector((state) => state.username);
  const profileRef = useRef(null);
  const cvRef = useRef(null);
  const [cv, setCv] = useState(undefined);
  const [cvUploadPercentage, setCvUploadPercentage] = useState(0);
  const [imageUploadPercentage, setImageUploadPercentage] = useState(0);
  const [newProfile, setNewProfile] = useState(0);

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
        `https://capstoneback2.herokuapp.com/api/users/${currentUser._id}`,
        {
          username: newData.username,
          userCategory: newData.userCategory,
          fullName: newData.fullName,
          address: newData.address,
          birthdate: newData.birthdate,
          about: newData.about,
          uploadCV: newData.uploadCv,
          image: newData.image,
        }
      );
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(newData);

  //Uploading firebase Segment

  const handleCVUpload = () => {
    cvRef.current.click();
  };
  const handleNewImageUpload = () => {
    profileRef.current.click();
  };

  console.log(currentUser);

  const uploadFile = (file, urlType) => {
    try {
      if (urlType === "uploadCv" && currentUser.uploadCV !== "") {
        const deletingCv = async () => {
          const storage = getStorage();
          const cvDelete = ref(storage, currentUser.uploadCV);
          await deleteObject(cvDelete);
        };
        console.log(deletingCv);
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      console.log(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          urlType === "uploadCv"
            ? setCvUploadPercentage(Math.round(progress))
            : setImageUploadPercentage(Math.round(progress));
          switch (snapshot.state) {
            case "paused":
              console.log(`Upload is paused`);
              break;
            case "running":
              console.log(`Upload is running`);
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setNewData((prev) => {
              return { ...prev, [urlType]: downloadURL };
            });
          });
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    cv && uploadFile(cv, "uploadCv");
  }, [cv]);

  useEffect(() => {
    newProfile && uploadFile(newProfile, "image");
  }, [newProfile]);

  return (
    <Container>
      {/* <AccountSet>Account Update</AccountSet> */}
      <Wrapper>
        <CardContainer>
          <ImageContainer>
            {imageUploadPercentage}
            <CardImage src={currentUser?.image} />
            <UpdateImageContainer onClick={handleNewImageUpload}>
              <BrushIcon />
              <Input
                type="file"
                id="image"
                accept="image/*"
                ref={profileRef}
                onChange={(e) => setNewProfile(e.target.files[0])}
              />
            </UpdateImageContainer>
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
              sx={InputMedia}
            />
            <TextField
              id="username"
              label={currentUser?.username}
              variant="outlined"
              placeholder="Channel Name"
              onChange={(e) => onChangeHandle(e)}
              sx={InputMedia}
            />
            {currentUser?.fullName ? (
              <TextField
                id="fullName"
                label={currentUser?.fullName}
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            ) : (
              <TextField
                id="fullName"
                label="Full Name"
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            )}
            {currentUser.address ? (
              <TextField
                id="address"
                label={currentUser.address}
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            ) : (
              <TextField
                id="address"
                label="Address"
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            )}
            <TextField
              id="birthdate"
              variant="outlined"
              type="date"
              onChange={(e) => onChangeHandle(e)}
              helperText="Birthdate"
              sx={InputMedia}
            />
            <TextField
              id="about"
              label={`About the ${currentUser?.userCategory}`}
              variant="outlined"
              helperText="Write a short description about your channel"
              multiline
              maxRows={5}
              onChange={(e) => onChangeHandle(e)}
              sx={InputMedia}
            />
          </InputContainers>
          {cvUploadPercentage < 100 && cvUploadPercentage > 0 ? (
            <p>{`${cv?.name} has uploaded ${cvUploadPercentage} %`}</p>
          ) : cvUploadPercentage === 100 ? (
            `${cv?.name} Uploaded!`
          ) : (
            ""
          )}

          <ButtonContainer>
            <Button variant="contained" onClick={handleCVUpload}>
              Upload CV
              <Tooltip title="File must be PDF format" arrow>
                <HelpOutlineIcon />
              </Tooltip>
            </Button>
            <Input
              type="file"
              name="uploadCV"
              id="uploadCV"
              accept="application/pdf, application/vnd.ms-excel"
              ref={cvRef}
              onChange={(e) => setCv(e.target.files[0])}
            />
            <Button variant="contained" onClick={onClickUpdateSubmit}>
              Update Profile
            </Button>
          </ButtonContainer>
        </UpdateContainer>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default UpdateProfile;
