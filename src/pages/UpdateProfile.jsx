import React, { useState, useRef, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Components
import Footer from "../components/Footer";

//MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BrushIcon from "@mui/icons-material/Brush";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

//firebase
import app from "../firebase";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";
import { loginSuccess } from "../redux/userSlice";

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

  @media (max-width: 425px) {
    width: 75%;
    margin: 10px 20px;
  }
`;

const CardContainer = styled.div`
  position: relative;
  top: 70px;
  flex-direction: column;
  align-items: center;
  display: flex;

  /* Tablet */
  @media (max-width: 768px) {
    margin-bottom: 50px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex-flow: wrap column;
  max-width: 200px;

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 55%;
  }
`;

const ImgContainer = styled.div``;

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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

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

const Input = styled.input`
  display: none;
`;

const UpdateProfile = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.username);
  const profileRef = useRef(null);
  const cvRef = useRef(null);
  const [cv, setCv] = useState(undefined);
  const [cvUploadPercentage, setCvUploadPercentage] = useState(0);
  const [imageUploadPercentage, setImageUploadPercentage] = useState(0);
  const [newProfile, setNewProfile] = useState(0);

  const [newData, setNewData] = useState({
    username: currentUser?.username,
    category: currentUser?.userCategory,
    fullName: currentUser?.fullName,
    address: currentUser?.address,
    birthdate: currentUser?.birthdate,
    about: currentUser?.about,
    employment: currentUser?.employmentStatus,
  });

  const onChangeHandle = (e) => {
    const newUser = { ...newData };
    newUser[e.target.name] = e.target.value;
    console.log(newUser);
    setNewData(newUser);
  };

  const onClickUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const update = await axios.put(
        `https://capstoneback2.herokuapp.com/api/users/${currentUser._id}`,
        {
          username: newData.username,
          userCategory: newData.category,
          fullName: newData.fullName,
          address: newData.address,
          birthdate: newData.birthdate,
          about: newData.about,
          uploadCV: newData.uploadCv,
          image: newData.image,
          employmentStatus: newData.employment,
        }
      );

      dispatch(loginSuccess(update.data));
      nav(`/profile/About/${currentUser._id}`);
    } catch (err) {
      console.log(err);
    }
  };

  //Uploading firebase Segment

  const handleCVUpload = () => {
    cvRef.current.click();
  };
  const handleNewImageUpload = () => {
    profileRef.current.click();
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    try {
      if (urlType === "uploadCv" && currentUser.uploadCV !== "") {
        const deletingCv = async () => {
          const cvDelete = ref(storage, currentUser.uploadCV);
          deleteObject(cvDelete);
          console.log(`cvDeleted`);
        };
        deletingCv();
      } else {
        const deletingImage = async () => {
          const imageDelete = ref(storage, currentUser.image);
          deleteObject(imageDelete);
          console.log(`Old Image Deleted`);
        };
        deletingImage();
      }
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

  const categories = [
    {
      value: "Animator",
      label: "Animator",
    },
    {
      value: "Employer",
      label: "Employer",
    },
  ];

  const availablity = [
    {
      value: "Available",
      label: "Available",
    },
    {
      value: "Not-Available",
      label: "Not-Available",
    },
  ];

  return (
    <Container>
      {/* <AccountSet>Account Update</AccountSet> */}
      <Wrapper>
        <CardContainer>
          <ImageContainer>
            <ImgContainer>
              <CardImage src={currentUser?.image} />
            </ImgContainer>

            {imageUploadPercentage}
            <UpdateImageContainer onClick={handleNewImageUpload}>
              <BrushIcon />
              <Input
                type="file"
                id="image"
                name="image"
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
              name="Email"
              label={currentUser?.email}
              variant="outlined"
              placeholder="Email"
              sx={InputMedia}
            />
            <TextField
              id="username"
              name="username"
              label={currentUser?.username}
              variant="outlined"
              placeholder="Channel Name"
              onChange={(e) => onChangeHandle(e)}
              sx={InputMedia}
            />
            {currentUser?.fullName ? (
              <TextField
                id="fullName"
                name="fullName"
                label={currentUser?.fullName}
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            ) : (
              <TextField
                id="fullName"
                name="fullName"
                label="Full Name"
                variant="outlined"
                placeholder="Full Name"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            )}

            {/* CATEGORY HERE */}
            <TextField
              id="category"
              name="category"
              select
              label="Category"
              value={newData?.category}
              onChange={(e) => {
                onChangeHandle(e);
              }}
              helperText="Please select your Category"
              sx={InputMedia}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {newData?.category === "Animator" ? (
              <>
                {/* Employment Availablity HERE */}
                <TextField
                  id="employment"
                  name="employment"
                  select
                  label="Employment Availability"
                  // value={newData?.employment}
                  onChange={(e) => {
                    onChangeHandle(e);
                  }}
                  helperText="Are you looking for a Job?"
                  sx={InputMedia}
                >
                  {availablity.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </>
            ) : (
              ""
            )}

            {currentUser?.address ? (
              <TextField
                id="address"
                name="address"
                label={currentUser.address}
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            ) : (
              <TextField
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                placeholder="Address"
                onChange={(e) => onChangeHandle(e)}
                sx={InputMedia}
              />
            )}
            <TextField
              id="birthdate"
              name="birthdate"
              variant="outlined"
              type="date"
              value={currentUser?.birthdate}
              onChange={(e) => onChangeHandle(e)}
              helperText="Birthdate"
              sx={InputMedia}
            />
            <TextField
              id="about"
              name="about"
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
