import React from "react";
import styled from "styled-components";
import { device } from "../media";

//Components
import Card from "../components/Card";

//framer motion
import { motion } from "framer-motion";

// libraries
import { useState, useEffect, CSSProperties } from "react";
import axios from "axios";

//redux
import { useDispatch, useSelector } from "react-redux";
import videoSlice from "../redux/videoSlice";

//loader
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

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

const Loader = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 42px;
  color: #132550;
`;

const OverRide = styled.div`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Home = ({ type, category }) => {
  const [videos, setVideos] = useState([]);
  const { currentUser } = useSelector((state) => state.username);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (type === "sub") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `https://capstoneback2.herokuapp.com/api/videos/${type}/${currentUser?._id}`
        );
        setVideos(randomReturn.data);
        setLoading(false);
      };
      fetchingVideos();
    } else if (type === "library") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `https://capstoneback2.herokuapp.com/api/videos/${type}/${currentUser?._id}`
        );
        setLoading(false);
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    } else if (type === "category") {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `https://capstoneback2.herokuapp.com/api/videos/${type}/${category}`
        );
        setLoading(false);
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    } else {
      const fetchingVideos = async () => {
        const randomReturn = await axios.get(
          `https://capstoneback2.herokuapp.com/api/videos/${type}`
        );
        setLoading(false);
        setVideos(randomReturn.data);
      };
      fetchingVideos();
    }
  }, [type]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opcaity: 0 }}
      >
        <Container>
          {loading ? (
            <>
              <Loader>
                <ClimbingBoxLoader
                  color="#132550"
                  loading
                  size={40}
                  speedMultiplier={1}
                />
                Loading Videos...
              </Loader>
            </>
          ) : (
            <>
              {videos.map((video) => (
                <Card key={video._id} video={video} />
              ))}
            </>
          )}
        </Container>
      </motion.div>
    </>
  );
};

export default Home;
