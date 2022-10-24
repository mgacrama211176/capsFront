import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

import { useSelector } from "react-redux";

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: wrap column;
  justify-content: center;
  align-content: center;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const textfieldStyle = {
  display: "flex",
  m: 2,
  width: "400px",
};

const Select = styled.select`
  margin-left: 15px;
  padding: 15px;
  border: 1px solid #c5c5c5;
  border-radius: 5px;
  width: 25rem;
  font-size: 16px;
  color: #797979;

  &:hover {
    border: 1px solid black;
  }
`;

const Options = styled.option`
  margin: 2px;
`;

const UpdateVideoModal = ({ video }) => {
  const { currentUser } = useSelector((state) => state.username);
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState(video.tags[0]);
  const [videoInfo, setVideoInfo] = useState({
    title: "",
    category: "",
    description: "",
  });

  const onChangeHandle = (e) => {
    const newVideoInfo = { ...videoInfo };
    newVideoInfo[e.target.id] = e.target.value;
    setVideoInfo(newVideoInfo);
    console.log(newVideoInfo);
  };

  const handleOpen = () => setOpen(true);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const OnclickSubmit = () => {
    const updateData = async () => {
      try {
        console.log(video._id);
        console.log(currentUser._id);
        await axios.put(
          `https://capstoneback2.herokuapp.com/api/videos/${video._id}/${currentUser._id}`,
          {
            title: videoInfo.title,
            tags: videoInfo.category,
            desc: videoInfo.description,
          }
        );
        console.log(`success update`);
      } catch (err) {
        console.log(err);
      }
    };
    updateData();
  };

  //ARRAY OF OBJECTS FOR THE OPTIONS
  const categories = [
    { value: "Traditional Animation", label: "Traditional Animation" },
    { value: "2D Animation", label: "2D Animation" },
    { value: "3D Animation", label: "3D Animation" },
    { value: "Motion Graphics", label: "Motion Graphics" },
    { value: "Stop Motion", label: "Stop Motion" },
  ];

  return (
    <Container>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: "#132550",
        }}
      >
        UPDATE
      </Button>

      <Modal
        onBackdropClick={() => setOpen(false)}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={style} component="form" noValidate autoComplete="on">
          <FormControl
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Update Video Information
            </Typography>
            <Container>
              <TextField
                id="title"
                sx={textfieldStyle}
                variant="outlined"
                label="Title"
                placeholder={video.title}
                onChange={(e) => onChangeHandle(e)}
              ></TextField>
              <Select
                id="category"
                value={category}
                onChange={(e) => onChangeHandle(e)}
                sx={textfieldStyle}
                variant="outlined"
                label="Category"
                helperText="Please select the correct CATEGORY"
              >
                {categories.map((category) => (
                  <Options key={category.value} value={category.value}>
                    {category.label}
                  </Options>
                ))}
              </Select>

              <TextField
                id="description"
                sx={textfieldStyle}
                variant="outlined"
                label="Description"
                multiline
                maxRows={5}
                placeholder={video.desc}
                onChange={(e) => onChangeHandle(e)}
              ></TextField>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#132550",
                }}
                onClick={OnclickSubmit}
              >
                SUBMIT
              </Button>
            </Container>
          </FormControl>
        </Box>
      </Modal>
    </Container>
  );
};

export default UpdateVideoModal;
