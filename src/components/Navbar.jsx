import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/Logo.png";
import { device } from "../media";
import { useSelector } from "react-redux";
import Upload from "../components/Upload";
import HoverMenu from "../components/HoverMenu";

//MUI
import PersonPinIcon from "@mui/icons-material/PersonPin";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import VideoCallIcon from "@mui/icons-material/VideoCall";

const Container = styled.div`
  position: relative;
  top: 0;
  background-color: ${({ theme }) => theme.bg};
  max-width: 100vw;
  padding: 0 1rem;
  overflow: visible;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  position: relative;
  width: 100%;

  /* Mobile Large */
  @media (max-width: 425px) {
    width: 90%;
  }
  /* MOBILE S */
  @media (max-width: 320px) {
    width: 90%;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Burger = styled.div`
  cursor: pointer;
  color: white;
`;

const Logo = styled.div`
  display: flex;
  align-content: center;
  gap: 5px;
`;

const Img = styled.img`
  height: 4rem;
`;

const Search = styled.div`
  position: relative;
  left: 0px;
  right: 0;
  margin: auto;
  width: 50%;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  padding: 5px;
  border: 1px solid #b2792d;
  border-radius: 5px;
  background-color: white;
  width: 30%;
`;

const Input = styled.input`
  background-color: transparent;
  width: 100%;
  height: 2em;
  font-family: Inter;
  border: none;
  outline: none;
`;

const Button = styled.button`
  font-family: Inter;
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid white;
  color: white;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: 0.2s ease-in;
  &:hover {
    background-color: transparent;
    border: 1px solid #b2792d;
    color: #b2792d;
  }

  /* Mobile S */
  @media ${device.mobileS} {
    padding: 5px 5px;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const Navbar = ({ setOpen, setClose }) => {
  const [openModal, setOpenModal] = useState(false);
  const [q, setQ] = useState("");

  const User = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    color: ${({ theme }) => theme.text};
  `;

  // THIS IS TO USE THE DATA ON REDUX
  const currentUser = useSelector((state) => state.username.currentUser);

  const nav = useNavigate();
  return (
    <>
      <Container>
        <Wrapper>
          <LeftContainer>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>
                <Img src={logoImg} />
              </Logo>
            </Link>
          </LeftContainer>

          <Search>
            <Input
              type="search"
              name="search"
              id="search"
              placeholder="Search..."
              onChange={(e) => setQ(e.target.value)}
              value={q}
            />
            <SearchIcon
              onClick={() => {
                nav(`/search?q=${q}`);
                setQ("");
              }}
              style={{ cursor: "pointer" }}
            />
          </Search>

          <HoverMenu setOpenModal={setOpenModal} />
        </Wrapper>
      </Container>
      {openModal && (
        <Upload setOpenModal={setOpenModal} currentUser={currentUser?._id} />
      )}
    </>
  );
};

export default Navbar;
