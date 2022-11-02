import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { device } from "../media";

//REDUX
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

//modals
import { LogoutModal } from "./VideoModalDelete";

//MUI
import SettingsIcon from "@mui/icons-material/Settings";
import FlagIcon from "@mui/icons-material/Flag";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const Container = styled.div``;

const Wrapper = styled.div``;

const DropdownContainer = styled.div``;

const DropdownContent = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  transition: 0.5s ease;
  padding: 5px;
  color: black;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
    border-radius: 15px;
    color: white;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  padding: 10px;
`;

const ContentWrapper = styled.div`
  position: absolute;
  right: 0px;
  top: 50px;
  border: solid #132550 0.5px;
  border-radius: 15px;
  padding: 5px;
  background-color: white;
  display: flex;
  flex-flow: wrap column;
  gap: 5px;
  z-index: 99;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
`;

const HoverMenu = ({ setOpenModal }) => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.username.currentUser);
  const [rightMenu, setRightMenu] = useState(false);

  const OnclickLogout = () => {
    // dispatch(logout(currentUser));
    // nav("/");
  };

  const onHover = () => {
    rightMenu ? setRightMenu(false) : setRightMenu(true);
  };

  const SignIn = styled.div`
    display: flex;
    gap: 5px;
    border: 1px white solid;
    border-radius: 5px;
    padding: 5px;
    align-items: center;
    color: white;
    transition: 0.3s ease;
    font-family: Inter;

    &:hover {
      color: #b2792d;
      border: 5px #b2792d solid;
    }
  `;

  return (
    <Container>
      <Wrapper>
        <DropdownContainer>
          {currentUser ? (
            <>
              <Button onMouseEnter={onHover}>
                <Link
                  to={`/profile/About/${currentUser._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <User>
                    {/* {currentUser.username} */}
                    <Avatar src={currentUser.image} />
                  </User>
                </Link>
              </Button>
            </>
          ) : (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <SignIn>
                <PersonPinIcon />
                Sign In
              </SignIn>
            </Link>
          )}

          {rightMenu ? (
            <>
              <ContentWrapper onMouseLeave={onHover}>
                <Link
                  to={`/profile/About/${currentUser?._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <DropdownContent>
                    <User>
                      {/* {currentUser.username} */}
                      <Avatar src={currentUser?.image} />
                    </User>
                    {currentUser?.username}
                  </DropdownContent>
                </Link>
                <DropdownContent onClick={setOpenModal}>
                  <VideoCallIcon />
                  UPLOAD
                </DropdownContent>

                <Link to={"/update"} style={{ textDecoration: "none" }}>
                  <DropdownContent>
                    <SettingsIcon />
                    UPDATE PROFILE
                  </DropdownContent>
                </Link>
                <DropdownContent>
                  <FlagIcon />
                  REPORT
                </DropdownContent>
                <DropdownContent>
                  <LiveHelpIcon />
                  HELP
                </DropdownContent>
                <DropdownContent onClick={OnclickLogout}>
                  {/* CALL LogoutModal to use the logout Modal */}
                  <LogoutIcon />
                  <LogoutModal />
                </DropdownContent>
              </ContentWrapper>
            </>
          ) : (
            ""
          )}
        </DropdownContainer>
      </Wrapper>
    </Container>
  );
};

export default HoverMenu;
