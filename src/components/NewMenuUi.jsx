import React, { useState } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import { device } from "../media";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

//MUI
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import BrushIcon from "@mui/icons-material/Brush";
import Filter2Icon from "@mui/icons-material/Filter2";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import GestureIcon from "@mui/icons-material/Gesture";
import VibrationIcon from "@mui/icons-material/Vibration";
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LightModeIcon from "@mui/icons-material/LightMode";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import LogoutIcon from "@mui/icons-material/Logout";

//modals
import { LogoutModal } from "./VideoModalDelete";

const Container = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  top: 100px;
  z-index: 6;
`;
const P = styled.p`
  color: black;
  font-size: 10px;
`;

const SideBar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  cursor: pointer;
  transition: 1s ease;
`;

const Item = styled.div`
  display: flex;
  text-decoration: none;
  background: white;
  color: #333;
  text-transform: uppercase;
  padding: 15px 0 15px 10px;
  margin: 2px 0;
  width: 200px;
  position: relative;
  margin-left: -140px;
  transition: 0.5s ease;
  align-items: center;
  transition: 1s ease;
  border-radius: 0px 11px 11px 0px;

  &:hover {
    margin-left: 0px;
  }

  &:hover ${P} {
    display: block;
    color: black;
  }
`;

const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  width: 70px;
  height: 100%;
  border-radius: 0px 10px 10px 0px;

  line-height: 50px;
  text-align: center;
  background: ${({ theme }) => theme.bg};
  color: #fff;
  position: absolute;
  right: 0;
  top: 0;
`;

const I = styled.i`
  font-size: 40px;
  padding: 5px;

  &:hover {
    color: ${({ theme }) => theme.menu};
  }
`;

const NewMenuUi = ({ darkmode, setDarkMode }) => {
  const currentUser = useSelector((state) => state.username.currentUser);

  return (
    <Container>
      <SideBar>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Item>
            <Span>
              <I>
                <HomeIcon />
              </I>
            </Span>
            <P>HOME</P>
          </Item>
        </Link>

        <Link to="/trend" style={{ textDecoration: "none" }}>
          <Item>
            <Span>
              <I>
                <ExploreIcon />
              </I>
            </Span>
            <P>Explore</P>
          </Item>
        </Link>

        {currentUser ? (
          <>
            <Link to="/sub" style={{ textDecoration: "none" }}>
              <Item>
                <Span>
                  <I>
                    <SubscriptionsIcon />
                  </I>
                </Span>
                <P>Subscription</P>
              </Item>
            </Link>
            <Link to="/library" style={{ textDecoration: "none" }}>
              <Item>
                <Span>
                  <I>
                    <LibraryBooksIcon />
                  </I>
                </Span>
                <P>Library</P>
              </Item>
            </Link>
          </>
        ) : (
          <></>
        )}

        <Link to={"/traditional"}>
          <Item>
            <Span>
              <I>
                <BrushIcon />
              </I>
            </Span>
            <P>Traditional Animation</P>
          </Item>
        </Link>

        <Link to={"/2D"}>
          <Item>
            <Span>
              <I>
                <Filter2Icon />
              </I>
            </Span>
            <P>2D Animation</P>
          </Item>
        </Link>

        <Link to={"/3D"}>
          <Item>
            <Span>
              <I>
                <ThreeDRotationIcon />
              </I>
            </Span>
            <P>3D Animation</P>
          </Item>
        </Link>

        <Link to={"/Motion"}>
          <Item>
            <Span>
              <I>
                <GestureIcon />
              </I>
            </Span>
            <P>Motion Graphics</P>
          </Item>
        </Link>

        <Link to={"/Stop"}>
          <Item>
            <Span>
              <I>
                <VibrationIcon />
              </I>
            </Span>

            <P>Stop Motion</P>
          </Item>
        </Link>

        <Item onClick={() => setDarkMode(!darkmode)}>
          <Span>
            <I>
              <LightModeIcon />
            </I>
          </Span>

          <P>{darkmode ? "Dark" : "Light"} Mode</P>
        </Item>
      </SideBar>
    </Container>
  );
};

export default NewMenuUi;
