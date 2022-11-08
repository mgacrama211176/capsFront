import React, { useEffect, useState } from "react";

//Components
import Contract from "./Contract";
import Signin from "../pages/Signin";

//MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

//MUI ICONS
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LogoutIcon from "@mui/icons-material/Logout";

//Router Dom
import { useNavigate } from "react-router-dom";

//Functionmalities
import { deleteObject } from "firebase/storage";
import axios from "axios";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { subscription } from "../redux/userSlice";
import { logout } from "../redux/userSlice";

//TOAST
import { Congratulations, loginRequired } from "../components/Toasts";

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

const SignInStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const StyleLogOut = {
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const button = {
  margin: "10px 40px",
  backgroundColor: "#132550",
};

const Substyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid transparent",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
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
    handleClose();
    nav("/");
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        sx={{
          fontWeight: "bold",
          fontSize: "10px",
          color: "black",
          margin: 0,
          padding: 0,
          display: "flex",
          gap: 11,
        }}
      >
        <LogoutIcon />
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
            Are you sure you want to Logout??
          </Typography>

          <Box sx={StyleLogOut}>
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
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export const TermsModal = () => {
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
          color: "white",
          margin: 0,
          padding: 0,
        }}
      >
        I have read and Agreed on the Terms and Conditions
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Contract />
        </Container>
      </Modal>
    </div>
  );
};

export const SubsCriptionModal = ({ currentUser, merger }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    if (currentUser === null) {
      loginRequired();
      SigninRedirectModal();
    } else {
      const follower = async () => {
        const perform = await axios.put(
          `https://capstoneback2.herokuapp.com/api/users/sub/${currentUser._id}/${merger._id}`
        );
        dispatch(subscription(merger._id));
        console.log(perform);
        Congratulations();
      };
      follower();
    }
  };

  return (
    <>
      <Button onClick={handleOpen} sx={{ fontWeight: "bold", color: "white" }}>
        Follow
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={Substyle}>
          <Container
            sx={{
              margin: "10px 0px",
              padding: "25px",
              display: "flex",
              backgroundColor: "#132550",
              borderRadius: "10px",
            }}
          >
            <Avatar src={merger.image} sx={{ width: 80, height: 80 }} />
            <Container sx={{ color: "white" }}>
              <Typography variant="h6" gutterBottom>
                {merger.username}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {merger.email}
              </Typography>
              <Typography variant="subtitle2" gutterBottom>
                {merger.userCategory}
              </Typography>
            </Container>
          </Container>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            FOLLOW AND GET THESE BENEFITS
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ✅ FULL ACCESS TO THIS USERS VIDEOS
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ✅ CANCEL SUBSCRIPTIONS ANYTIME
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ✅ VIEW THIS CHANNELS EXCLUSIVE VIDEOS
          </Typography>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            {currentUser ? (
              <>
                <Button
                  variant="contained"
                  sx={{ margin: "15px", backgroundColor: "#132550" }}
                  onClick={onClickHandler}
                >
                  ACCEPT
                </Button>
              </>
            ) : (
              <>
                <SigninRedirectModal />
              </>
            )}
          </Container>
        </Box>
      </Modal>
    </>
  );
};

export const SigninRedirectModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => {
    setOpenModal(true);
    loginRequired();
  };
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ margin: "15px", backgroundColor: "#132550" }}
      >
        ACCEPT
      </Button>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Signin />
        </Box>
      </Modal>
    </div>
  );
};
