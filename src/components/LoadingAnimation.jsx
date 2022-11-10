import React from "react";
import styled from "styled-components";

//loader
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 42px;
  color: #132550;
  background-color: transparent;
`;

const LoadingAnimation = () => {
  return (
    <Loader>
      <ClimbingBoxLoader
        color="#132550"
        loading
        size={40}
        speedMultiplier={1}
      />
      Loading Videos...
    </Loader>
  );
};

export default LoadingAnimation;

export const LoadingAProfile = () => {
  return (
    <Loader>
      <ClimbingBoxLoader
        color="#132550"
        loading
        size={40}
        speedMultiplier={1}
      />
      Loading Profile...
    </Loader>
  );
};

export const LoadingComments = () => {
  return (
    <Loader>
      <ClimbingBoxLoader
        color="#132550"
        loading
        size={40}
        speedMultiplier={1}
      />
      Loading Comments...
    </Loader>
  );
};

export const LoadingAnimators = () => {
  return (
    <Loader>
      <ClimbingBoxLoader
        color="#132550"
        loading
        size={40}
        speedMultiplier={1}
      />
      Loading Animators...
    </Loader>
  );
};
