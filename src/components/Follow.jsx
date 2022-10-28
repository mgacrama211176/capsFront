import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import axios from "axios";
import { SubsCriptionModal } from "../components/VideoModalDelete";

//redux

import { useDispatch } from "react-redux";
import { subscription } from "../redux/userSlice";

//Media Queries
import { device } from "../media";

//TOAST
import { loginRequired, SubscribeErrorNotif } from "../components/Toasts";

const Container = styled.div``;

const Wrapper = styled.div`
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

const Follow = ({ currentUser, merger }) => {
  const dispatch = useDispatch();

  const subscribeHandler = async () => {
    try {
      if (currentUser._id === merger._id) {
        SubscribeErrorNotif();
      } else {
        if (currentUser.subscribedUsers.includes(merger._id)) {
          await axios.put(
            `https://capstoneback2.herokuapp.com/api/users/unsub/${currentUser._id}/${merger._id}`
          );
        }
        dispatch(subscription(merger._id));
      }
    } catch (err) {
      console.log(err);
      loginRequired();
    }
  };

  return (
    <Container>
      {currentUser?._id === merger._id ? (
        ""
      ) : (
        <>
          <Wrapper>
            <NotificationsActiveIcon />
            <>
              {currentUser?.subscribedUsers?.includes(merger._id) ? (
                <>
                  <p onClick={subscribeHandler}>FOLLOWED</p>
                </>
              ) : (
                <SubsCriptionModal currentUser={currentUser} merger={merger} />
              )}
            </>
          </Wrapper>
        </>
      )}
    </Container>
  );
};

export default Follow;
