import React, { useState, useEffect } from "react";
import styled from "styled-components";
import UploadPercent from "../components/UploadPercent";
import axios from "axios";

//MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//MUI TABLE

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";

const Header = styled.h2`
  font-family: Roboto, Arial, sans-serif;
`;
const MainWrapper = styled.div`
  width: 100%;
`;
const DatasWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData(
    "Hitoru",
    "Sir Gian",
    "Way gamit",
    "Way gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamitay gamit"
  ),
  createData(
    "Marlon",
    "Sir Gian",
    "Way gamit",
    "Way gamitay gamitay gamitay gamitay gamitay Way gamitay gamitay gamitay gamitay gamitay Way gamitay gamitay gamitay gamitay gamitay"
  ),
];

const Report = () => {
  const [userData, setUserData] = useState(0);
  const [videoData, setVideoData] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get(`http://localhost:4000/api/users/find/All`);
      const userContainer = users.data;
      setUserData(userContainer);
    };
    const fetchVideos = async () => {
      const videos = await axios.get(`http://localhost:4000/api/videos/trend`);

      const videoContainer = videos.data;
      setVideoData(videoContainer);
    };

    fetchUsers();
    fetchVideos();
  }, []);

  return (
    <MainWrapper>
      <Container>
        <DatasWrapper>
          <Card sx={{ width: 275, margin: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total Number of users Registered
              </Typography>
              <Typography variant="h5" component="div">
                <PersonOutlineIcon />
                {userData.length}
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ width: 275, margin: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total Number of Videos Uploaded
              </Typography>
              <Typography variant="h5" component="div">
                <VideoLibraryIcon />
                {videoData.length}
              </Typography>
            </CardContent>
          </Card>
        </DatasWrapper>
      </Container>

      {/* //USER REPORTS TABLE */}
      <Container>
        <Header>USER REPORTS</Header>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Complainant</TableCell>
                <TableCell align="center">Reported User</TableCell>
                <TableCell align="center">Issue</TableCell>
                <TableCell align="center">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center" sx={{ maxWidth: 200 }}>
                    {row.carbs}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainWrapper>
  );
};

export default Report;
