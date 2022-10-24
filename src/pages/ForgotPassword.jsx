import React, { useState } from "react";
import styled from "styled-components";
import { device } from "../media";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../redux/userSlice";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//MUI
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";

//Framer Motion
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.titleColor};
  font-family: "Roboto", sans-serif;

  /* Mobile S */
  @media ${device.mobileS} {
    max-width: 320px;
    margin: 0px 0px;
  }

  /* Mobile M */
  @media ${device.mobileM} {
    max-width: 424px;
  }

  /* Mobile L */
  @media ${device.mobileL} {
    max-width: 767px;
  }

  /* Tablet */
  @media ${device.tablet} {
    max-width: 1023px;
  }

  /* Tablet */
  @media ${device.laptopL} {
    max-width: 1919px;
  }
  /* Desktop */
  @media ${device.desktop} {
    max-width: 2559px;
  }
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: white;
  background-color: ${({ theme }) => theme.bg};
  padding: 20px 50px;
  border: 1px solid;
  gap: 10px;
  border-radius: 20px;
  max-width: 50%;
  margin-top: 2em;
`;

const Title = styled.h1`
  margin-bottom: 10px;

  @media ${device.mobileS} {
    font-size: 20px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const H4 = styled.h4``;

const Input = styled.input`
  border-radius: 5px;
  padding: 5px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  font-weight: bolder;
  cursor: pointer;
  padding: 10px;
  margin-top: 10px;
  border-radius: 15px;
  border: 1px solid white;
  color: ${({ theme }) => theme.textSoft};
  background-color: ${({ theme }) => theme.bg};
  transition: 0.2s ease-in;
  width: 15em;
  justify-content: center;
  &:hover {
    background-color: #fca326;
    color: white;
  }
`;

const Options = styled.div`
  display: flex;
  gap: 50px;
  margin: 5px 0px 40px 0px;
`;

const H6 = styled.h6`
  cursor: pointer;
  transition: 0.2s ease-in;
  color: white;
  &:hover {
    color: #fca326;
    text-decoration: underline;
  }
`;

//START ALL FUNCTIONS HERE
const Signin = () => {
  //TOAST
  const Notify = () =>
    toast.success("E-mail sent for password reset!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const NotFound = () => {
    toast.error("Email not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const Empty = () => {
    toast.error("E-mail cant be empty", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const [user, setUser] = useState({
    email: "",
  });

  const onChangeHandle = (e) => {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  const checkEmail = async () => {
    try {
      const result = await axios.put(
        `https://capstoneback2.herokuapp.com/api/users/find/email/${user.email}`
      );
      if (!result.data) {
        NotFound();
      } else {
        console.log(result.data);
        Notify();
      }

      setUser({ email: "" });
    } catch (err) {
      Empty();
    }
  };

  // START ALL ELEMENTS HERE
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{
        x: window.innerWidth,
        y: window.innerHeight,
      }}
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
      {/* Same as */}
      <ToastContainer />
      <ToastContainer />
      <Container>
        <LoginWrapper>
          <Title>FORGOT PASSWORD</Title>
          <H4> Enter email address </H4>
          <InputWrapper>
            <EmailIcon />
            <Input
              id="email"
              placeholder="Email"
              type="text"
              onChange={(e) => {
                onChangeHandle(e);
              }}
              value={user.email}
            />
          </InputWrapper>
          <InputWrapper>
            <Button onClick={checkEmail}>
              SUBMIT
              <LoginIcon />
            </Button>
          </InputWrapper>
          <Options>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <H6>Not yet registered? </H6>
            </Link>
          </Options>
        </LoginWrapper>
      </Container>
    </motion.div>
  );
};

export default Signin;
