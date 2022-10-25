import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import CommentsBox from "../components/CommentsBox";
import ViewComments from "../components/ViewComments";
import Recommendation from "../components/Recommendation";
import Share from "../components/Share";

//MUI
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import SaveAltIcon from "@mui/icons-material/SaveAlt";

//framer motion
import { motion } from "framer-motion";

//Media Queries
import { device } from "../media";

//redux
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import {
  FetchSuccess,
  LikeFunction,
  DislikeFunction,
} from "../redux/videoSlice";

import { subscription, reduxSaveVideo } from "../redux/userSlice";
import { format } from "timeago.js";
import { current } from "@reduxjs/toolkit";

//TOAST
import {
  loginRequired,
  Liked,
  Disliked,
  SubscribeErrorNotif,
  SaveNotif,
} from "../components/Toasts";
import { ToastContainer } from "react-toastify";
import Follow from "../components/Follow";

//Loader
import LoadingAnimation from "../components/LoadingAnimation";

const Container = styled.div`
  display: flex;
  gap: 24px;
  font-family: Roboto, Arial, sans-serif;
  max-width: 100%;
  padding: 0px 30px;
  margin-left: 20px;
`;

const Content = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

const VideoFrame = styled.video`
  padding: 10px;
  max-height: 500px;
  margin-top: 10px;
  border: none;
  width: 100%;
  object-fit: cover;
`;

const VideoInformationContainer = styled.div`
  padding: 5px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  font-family: Roboto, Arial, sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.titleColor};

  @media ${device.mobileS} {
    font-size: 14px;
    font-weight: 600;
  }
`;

const Details = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  font-family: Roboto, Arial, sans-serif;

  @media ${device.mobileS} {
    font-size: 11px;
    font-weight: 600;
  }
`;

const Info = styled.span`
  color: ${({ theme }) => theme.titleColor};

  @media ${device.mobileS} {
    font-size: 11px;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.titleColor};
`;

const Like = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s;
  &:hover {
    color: #0675e8;

    transform: scale(1.1);
  }
`;
const Dislike = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s;
  &:hover {
    color: red;
    transform: scale(1.1);
  }
`;

const Save = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: transform 0.2s;
  &:hover {
    color: #04a86c;

    transform: scale(1.1);
  }
`;

const Hr = styled.hr`
  border: 0.5px solid ${({ theme }) => theme.soft};
  margin: 15px 0px;
  width: 100%;
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.titleColor};
`;

const ChannelName = styled.span`
  font-weight: bold;
  font-family: Roboto, Arial, sans-serif;
`;

const ChannelCounter = styled.span`
  margin: 5px 0 20px 0;
  color: ${({ theme }) => theme.titleColor};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
  font-family: Roboto, Arial, sans-serif;
  color: ${({ theme }) => theme.titleColor};

  @media ${device.mobileS} {
    font-size: 12px;
    margin-bottom: 20px;
  }
`;

const Subscribe = styled.button`
  background-color: red;
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 10px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  &:hover {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
  }
  @keyframes shake {
    0% {
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      transform: translate(1px, -2px) rotate(-1deg);
    }
  }

  /* Mobile S */
  @media ${device.mobileS} {
    padding: 5px 10px;
    gap: 3px;
    font-size: 12px;
  }
`;

const Video = () => {
  const { currentUser } = useSelector((state) => state.username);
  const { currentVideo } = useSelector((state) => state.video);

  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const [channel, setChannel] = useState({});
  const [viewCounter, setViewCounter] = useState(false);
  const [loading, setLoading] = useState(true);

  const channelContainer = channel._id;

  const channelID = channel._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoResponse = await axios.get(
          `https://capstoneback2.herokuapp.com/api/videos/find/${path}`
        );
        const channelResponse = await axios.get(
          `https://capstoneback2.herokuapp.com/api/users/find/${videoResponse.data.userId}`
        );

        setChannel(channelResponse.data);
        dispatch(FetchSuccess(videoResponse.data));
        setLoading(false);
      } catch (err) {}
    };
    fetchData();
  }, [path, dispatch]);

  useEffect(() => {
    const views = async () => {
      if (viewCounter === true) {
        const increase = await axios.put(
          `https://capstoneback2.herokuapp.com/api/videos/views/view/${path}`
        );
        setLoading(false);
      } else {
        return setViewCounter(true);
      }
    };
    views();
  }, [viewCounter]);

  const likeHandler = async () => {
    if (currentUser === null) {
      loginRequired();
    } else {
      const like = await axios.put(
        `https://capstoneback2.herokuapp.com/api/users/like/${currentUser._id}/${currentVideo._id}`
      );
      setLoading(false);
      dispatch(LikeFunction(currentUser._id));
      Liked();
    }
  };

  const dislikeHandler = async () => {
    if (currentUser === null) {
      loginRequired();
    } else {
      await axios.put(
        `https://capstoneback2.herokuapp.com/api/users/dislike/${currentUser._id}/${currentVideo._id}`
      );
      setLoading(false);
      dispatch(DislikeFunction(currentUser._id));
      Disliked();
    }
  };

  const saveVideo = async () => {
    try {
      if (currentUser?.saveVideos.includes(currentVideo._id)) {
        const unsave = await axios.put(
          `https://capstoneback2.herokuapp.com/api/users/unsave/${currentUser._id}/${currentVideo._id}`
        );
        dispatch(reduxSaveVideo(currentVideo._id));
      } else {
        await axios.put(
          `https://capstoneback2.herokuapp.com/api/users/save/${currentUser._id}/${currentVideo._id}`
        );
        SaveNotif();
        dispatch(reduxSaveVideo(currentVideo._id));
      }
      setLoading(false);
    } catch (err) {
      loginRequired();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opcaity: 0 }}
    >
      <>
        <Container>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Content>
            {loading ? (
              <>
                <LoadingAnimation />
              </>
            ) : (
              <>
                <VideoWrapper>
                  <VideoFrame
                    src={currentVideo?.videoUrl}
                    controls
                    controlsList="nodownload"
                  ></VideoFrame>
                </VideoWrapper>

                <VideoInformationContainer>
                  <Title>{currentVideo?.title}</Title>
                  <Info>
                    {currentVideo?.views} views •{" "}
                    {format(currentVideo?.createdAt)}
                  </Info>
                  <Hr />
                  <Details>
                    <Buttons>
                      <Like onClick={likeHandler}>
                        {currentUser === null ? (
                          <ThumbUpIcon />
                        ) : currentVideo?.likes?.includes(currentUser._id) ? (
                          <ThumbUpIcon style={{ color: "#0675e8" }} />
                        ) : (
                          <ThumbUpIcon />
                        )}
                        {currentVideo?.likes?.length}
                      </Like>
                      <Dislike onClick={dislikeHandler}>
                        {currentVideo?.dislikes.includes(currentUser?._id) ? (
                          <ThumbDownIcon style={{ color: "#red" }} />
                        ) : (
                          <ThumbDownIcon />
                        )}
                        Dislike
                      </Dislike>

                      <Save onClick={saveVideo}>
                        {currentUser?.saveVideos?.includes(
                          currentVideo?._id
                        ) ? (
                          <SaveAltIcon style={{ color: "#04a86c" }} />
                        ) : (
                          <SaveAltIcon />
                        )}

                        {currentUser?.saveVideos?.includes(currentVideo?._id)
                          ? "SAVED"
                          : "SAVE"}
                      </Save>

                      <Share currentVideo={currentVideo?._id} />
                    </Buttons>
                  </Details>

                  <Hr />

                  <Channel>
                    <ChannelInfo>
                      <Link to={`/profile/About/${channelContainer}`}>
                        <Image src={channel.image} />
                      </Link>
                      <ChannelDetail>
                        <ChannelName>{channel.username}</ChannelName>
                        <ChannelCounter>
                          {channel.subscribers} subscribers
                        </ChannelCounter>
                      </ChannelDetail>
                    </ChannelInfo>

                    <Follow currentUser={currentUser} channelID={channelID} />
                  </Channel>

                  <Description>{currentVideo?.desc}</Description>
                  <Hr />
                  <Title>Recommended Videos</Title>
                  <Recommendation tags={currentVideo?.tags[0]} />
                  <Hr />
                  <ViewComments videoId={currentVideo?._id} />
                </VideoInformationContainer>
              </>
            )}
          </Content>
        </Container>
      </>
    </motion.div>
  );
};

export default Video;
