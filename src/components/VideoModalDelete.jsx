import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

//Functionmalities
import { getStorage, ref, deleteObject } from "firebase/storage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;

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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const buttonContainer = {
  margin: "0 auto",
  color: "black",
};

const button = {
  margin: "10px 40px",
  backgroundColor: "#132550",
};

const VideoModalDelete = ({ video }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    console.log(video._id);
  };
  const handleClose = () => setOpen(false);

  const ConfirmDelete = async () => {
    try {
      //delete Videodata on Mongo
      const deleting = await axios.delete(
        `https://capstoneback2.herokuapp.com/api/videos/${video._id}`
      );
      const deletingAllComments = await axios.delete(
        `https://capstoneback2.herokuapp.com/api/comments/deleteAll/${video._id}`
      );
      console.log(deletingAllComments);
      console.log(deleting);

      //delete video on firebase
      deleteObject(videoDelete);
      deleteObject(imgDelete);

      console.log(`deleted from database`);
      DeleteVideoNotif();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          backgroundColor: "#132550",
        }}
      >
        DELETE
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this video?
          </Typography>
          <Button onClick={ConfirmDelete}>YES</Button>
          <Button onClick={handleClose}>NO</Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default VideoModalDelete;

export const LogoutModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.username.currentUser);

  const onClickLogout = () => {
    dispatch(logout(currentUser));
    nav("/");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          fontSize: "10px",
          color: "black",
          margin: 0,
          padding: 0,
        }}
      >
        Logout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Are you sure you want to delete this video?
          </Typography>
          <buttonContainer>
            <Button onClick={onClickLogout} variant="contained" sx={button}>
              YES
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="contained"
              sx={button}
            >
              NO
            </Button>
          </buttonContainer>
        </Box>
      </Modal>
    </div>
  );
};
