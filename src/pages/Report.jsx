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

const Header = styled.h2`
  font-family: Roboto, Arial, sans-serif;
`;

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
    <Container>
      <Card sx={{ width: 275, margin: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Number of users Registered
          </Typography>
          <Typography variant="h5" component="div">
            {userData.length}
          </Typography>
        </CardContent>
      </Card>
      <Card sx={{ width: 275, margin: 5 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Total Number of Videos Uploaded
          </Typography>
          <Typography variant="h5" component="div">
            {videoData.length}
          </Typography>
        </CardContent>
      </Card>
      <Header>USER REPORTS</Header>
    </Container>
  );
};

export default Report;
