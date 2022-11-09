import React, { useState, useEffect } from "react";
import styled from "styled-components";
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

const Report = () => {
  const [userData, setUserData] = useState(0);
  const [videoData, setVideoData] = useState(0);
  const [reportData, setReportData] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/All`
      );
      const userContainer = users.data;
      setUserData(userContainer);
    };
    const fetchVideos = async () => {
      const videos = await axios.get(
        `https://capstoneback2.herokuapp.com/api/videos/trend`
      );

      const videoContainer = videos.data;
      setVideoData(videoContainer);
    };
    const fetchReports = async () => {
      const reports = await axios.get(
        `https://capstoneback2.herokuapp.com/api/reports/All`
      );

      const reportsContainer = reports.data;
      setReportData(reportsContainer);
    };

    fetchUsers();
    fetchVideos();
    fetchReports();
  }, []);

  return (
    <MainWrapper>
      <Container>
        <DatasWrapper>
          <Card sx={{ width: 275, margin: 5, bgcolor: "#0dbbf0d5" }}>
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
          <Card sx={{ width: 275, margin: 5, bgcolor: "#0dbbf0d5" }}>
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
          <Card sx={{ width: 275, margin: 5, bgcolor: "#0dbbf0d5" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Total Users Reported
              </Typography>
              <Typography variant="h5" component="div">
                <VideoLibraryIcon />
                {reportData.length}
              </Typography>
            </CardContent>
          </Card>
        </DatasWrapper>
      </Container>

      {/* //USER REPORTS TABLE */}
      <Container>
        <Header>USER REPORTS</Header>
        <TableContainer
          component={Paper}
          sx={{ width: "100%", margin: "10px 0px" }}
        >
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "#13040421",
                }}
              >
                <TableCell align="center">Complainant</TableCell>
                <TableCell align="center">Reported User</TableCell>
                <TableCell align="center">Issue</TableCell>
                <TableCell align="center">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(reportData)
                ? reportData.map((report) => (
                    <TableRow
                      key={report._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        bgcolor: "#f0030347",
                      }}
                    >
                      <TableCell align="center">
                        {report.userReporting}
                      </TableCell>
                      <TableCell align="center">
                        {report.channelReported}
                      </TableCell>
                      <TableCell align="center">{report.issues}</TableCell>
                      <TableCell align="center" sx={{ maxWidth: 200 }}>
                        {report.desc}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </MainWrapper>
  );
};

export default Report;
