import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { device } from "../media";

//libraries
import { format } from "timeago.js";
import axios from "axios";

//Framer Motion
import { motion } from "framer-motion";

//button Container for Delete and Update
import VideoModalDelete from "./VideoModalDelete";
import UpdateVideoModal from "./UpdateVideoModal";

const Container = styled.div`
  max-width: ${(props) => props.type !== "sm" && "300px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  display: ${(props) => (props.type === "sm" ? "flex" : "")};
  cursor: pointer;
  position: relative;
  flex-wrap: wrap;

  &:hover {
    opacity: 0.5;
  }

  /* Mobile S [fixed]*/
  @media ${device.mobileS} {
    gap: 5px;
    margin: ${(props) => (props.type === "sm" ? "15px 0px" : "0px")};
    max-width: ${(props) => (props.type === "sm" ? "340px" : "300px")};
    gap: ${(props) => (props.type === "sm" ? "15px" : "0px")};
  }

  /* Mobile M */
  @media ${device.mobileM} {
    gap: 5px;
    margin: ${(props) => (props.type === "sm" ? "15px 0px" : "0px")};
    max-width: ${(props) => (props.type === "sm" ? "340px" : "300px")};
    gap: ${(props) => (props.type === "sm" ? "15px" : "0px")};
  }

  /* Mobile L */
  @media ${device.mobileL} {
    gap: 5px;
    margin: ${(props) => (props.type === "sm" ? "15px 0px" : "0px")};
    max-width: ${(props) => (props.type === "sm" ? "420px" : "300px")};
    gap: ${(props) => (props.type === "sm" ? "15px" : "0px")};
  }

  /* Tablet */
  @media ${device.tablet} {
  }

  /* Tablet */
  @media ${device.laptopL} {
  }
  /* Desktop */
  @media ${device.desktop} {
  }
`;

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Options = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  z-index: 10;
`;

const OptionsButton = styled.button`
  cursor: pointer;
  z-index: 99;
  padding: 10px;

  &:hover {
    opacity: 1;
    background-color: white;
  }
`;

const Image = styled.img`
  width: ${(props) => (props.type === "sm" ? "15em" : "18em")};
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  border-radius: 10px 10px 5px 5px;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type === "sm" ? "16px" : "0px")};
  gap: 12px;
  font-family: Inter;
  flex: 1;
  max-width: 100vw;

  /* Mobile S [fixed]*/
  @media ${device.mobileS} {
    gap: 5px;
    margin-top: ${(props) => (props.type === "sm" ? "0px" : "0px")};
  }

  /* Mobile M */
  @media ${device.mobileM} {
    gap: 5px;
    margin-top: ${(props) => (props.type === "sm" ? "0px" : "0px")};
  }

  /* Mobile L */
  @media ${device.mobileL} {
    gap: 5px;
    margin-top: ${(props) => (props.type === "sm" ? "0px" : "0px")};
  }
  /* Desktop */
  @media ${device.desktop} {
    gap: 5px;
    margin-top: ${(props) => (props.type === "sm" ? "0px" : "0px")};
  }
`;

const ChannelImage = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div`
  display: flex;
  flex-flow: column wrap;
  min-width: ${(props) => (props.type === "sm" ? "0px" : "250px")};
  color: black;

  /* Mobile S [fixed]*/
  @media ${device.mobileS} {
    max-width: ${(props) => (props.type === "sm" ? "200px" : "0px")};
  }
`;

const Title = styled.h1`
  font-size: ${(props) => props.type !== "sm" && "16px"};
  font-weight: 500;
  color: black;
  display: flex;
  width: 80%;

  //Line Clamp
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: wrap;
  overflow: hidden;
`;

const AnimatorName = styled.h2`
  font-size: 14px;
  color: black;
  margin: 5px 0;
`;

const Info = styled.div`
  font-size: 14px;
  color: black;
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100px;
`;

const Card = ({ type, video, currentUser }) => {
  // fetching user data information using useState hook
  const [channel, setChannel] = useState({});
  const [hoverState, setHoverState] = useState(false);

  const hoverOptions = () => {
    hoverState ? setHoverState(false) : setHoverState(true);
  };

  useEffect(() => {
    const fetchingChannel = async () => {
      const channel = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/${video?.userId}`
      );
      setChannel(channel?.data);
    };
    fetchingChannel();
  }, [video?.userId]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        border: "none",
        backgroundColor: "transparent",
        textAlign: "left",
        width: "300px",
      }}
      transition={{ ease: "easeOut", duration: 0.4 }}
    >
      <Container
        type={type}
        onMouseEnter={hoverOptions}
        onMouseLeave={hoverOptions}
      >
        <OptionContainer>
          {type === "profile" && channel?._id === currentUser?._id ? (
            hoverState ? (
              <>
                <Options>
                  <VideoModalDelete video={video} />
                  <UpdateVideoModal video={video} />
                </Options>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </OptionContainer>
        <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
          <ImgContainer>
            <Image type={type} src={video?.imgUrl} />
          </ImgContainer>
          <Details type={type}>
            <ChannelImage type={type} src={channel?.image} />
            <Texts type={type}>
              <Title>{video?.title}</Title>
              <AnimatorName>{channel?.username}</AnimatorName>
              <Info>
                {video?.views} views • {format(video?.createdAt)}
              </Info>
            </Texts>
          </Details>
        </Link>
      </Container>
    </motion.div>
  );
};

export default Card;

//framer-motion
//keyframes
