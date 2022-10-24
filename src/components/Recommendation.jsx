import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
  display: flex;
  flex-flow: wrap row;
`;
const Recommendation = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(
        `http://localhost:4000/api/videos/tags?tags=${tags}`
      );
      setVideos(response.data);
    };
    fetchVideos();
  }, [tags]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Recommendation;
