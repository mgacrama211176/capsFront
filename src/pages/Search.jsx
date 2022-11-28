import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  flex-flow: wrap row;
  gap: 10px;
  padding: 20px;
  justify-content: center;
`;

const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    if (query) {
      const fetchVideos = async () => {
        const response = await axios.get(
          `https://filanimeback.onrender.com/api/videos/search${query}`
        );
        setVideos(response.data);
      };
      fetchVideos();
    } else {
    }
  }, [query]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Search;
