import React from "react";
import styled from "styled-components";
import { device } from "../media";

//Components
import Card from "../components/Card";

//framer motion
import { motion } from "framer-motion";

// libraries
import { useState, useEffect } from "react";
import axios from "axios";

//redux
import { useDispatch, useSelector } from "react-redux";
import videoSlice from "../redux/videoSlice";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 10px;
  margin-left: 55px;

  /* Mobile S */
  @media ${device.mobileS} {
    justify-content: center;
  }

  /* Tablet */
  @media ${device.tablet} {
    gap: 10px;
  }
`;

const Home = ({ type, category }) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.username);

  useEffect(() => {
    if (type === "sub") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `http://localhost:4000/api/videos/${type}/${currentUser?._id}`
        );
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    } else if (type === "library") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `http://localhost:4000/api/videos/${type}/${currentUser?._id}`
        );
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    } else if (type === "category") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `http://localhost:4000/api/videos/${type}/${category}`
        );
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    } else {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `http://localhost:4000/api/videos/${type}`
        );
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    }
  }, [type]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opcaity: 0 }}
    >
      <Container>
        {videos.map((video) => (
          <Card key={video._id} video={video} />
        ))}
      </Container>
    </motion.div>
  );
};

export default Home;
