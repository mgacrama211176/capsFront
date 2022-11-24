import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//MUI COMPONENTS
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

import { Reported } from "../components/Toasts";

const Container = styled.div``;
const Report = styled.div`
  margin-bottom: 10%;
`;

const Repbtn = styled.button`
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
    bottom: 4px;
    font-size: 0.8em;
  }
`;

const Detailswrap = styled.div`
  width: 100%;
  display: flex;
  padding: 1em;

  justify-content: center;
`;

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

const ReportComponent = ({ retrivedUser }) => {
  const { currentUser } = useSelector((state) => state.username);

  const [reportIssue, setReportIssue] = useState("");
  const [reportReason, setReportReason] = useState("");

  const onChangeHandle = (e) => {
    setReportIssue(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Container>
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
            <Typography id="modal-modal-title" variant="h6" component="h2">
              What is the issue?
            </Typography>

            <RadioGroup name="issues" id="issues" onChange={onChangeHandle}>
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
            <ChildModal
              reportReason={reportReason}
              setReportReason={setReportReason}
              reportIssue={reportIssue}
              retrivedUser={retrivedUser}
              currentUser={currentUser}
            />
          </Box>
        </Modal>
      </Report>
    </Container>
  );
};

export default ReportComponent;

export function ChildModal({
  reportReason,
  setReportReason,
  reportIssue,
  retrivedUser,
  currentUser,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onChangeHandle = (e) => {
    setReportReason(e.target.value);
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
            label="Reason"
            id="desc"
            multiline
            rows={6}
            helperText="Provide additional description"
            onChange={(e) => {
              onChangeHandle(e);
            }}
          />
          <Submitbtn onClick={handleOpen}>Next</Submitbtn>
          <SubmitRpt
            reportReason={reportReason}
            reportIssue={reportIssue}
            retrivedUser={retrivedUser}
            currentUser={currentUser}
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export function SubmitRpt({
  retrivedUser,
  currentUser,
  reportIssue,
  reportReason,
}) {
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onClickReport = async (e) => {
    e.preventDefault();
    const reportUser = await axios.post(
      `https://filanimeback.onrender.com/api/reports/addReport/${currentUser._id}/${retrivedUser._id}`,
      // `http://localhost:4000/api/reports/addReport/${currentUser._id}/${retrivedUser._id}`,
      {
        userReporting: currentUser.username,
        channelReported: retrivedUser.username,
        issues: reportIssue,
        desc: reportReason,
      }
    );
    Reported();
    nav("/");
    console.log(reportUser);
  };

  return (
    <React.Fragment>
      <Submitbtn onClick={handleOpen}>Submit</Submitbtn>
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
            <Repbtn onClick={onClickReport}>Yes</Repbtn>
            <Repbtn onClick={handleClose}>No</Repbtn>
          </Detailswrap>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
