import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { device } from "../media";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { loginFailed, loginStart, loginSuccess } from "../redux/userSlice";

//Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//MUI
import LoginIcon from "@mui/icons-material/Login";

//Framer Motion
import { motion } from "framer-motion";

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
  transition: 0.5s ease-in;
  width: 15em;
  justify-content: center;
  &:hover {
    background-color: #fca326;
    color: white;
  }
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const Alert = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

//START ALL FUNCTIONS HERE
const Signin = () => {
  const { token } = useParams();
  const [user, setUser] = useState({
    password: "",
  });
  const [validatedpass, setValidatedPass] = useState("");
  //TOAST
  const Notify = () =>
    toast.success("Password has been reset!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeHandle = (e) => {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
    console.log(newUser);
  };

  const onSubmitReset = async () => {
    try {
      const reset = await axios.put(
        `https://capstoneback2.herokuapp.com/api/users/find/email/reset/${token}`,
        {
          password: user.password,
        }
      );
      console.log(reset);
      console.log(user.password);
      Notify();
    } catch (error) {}
  };

  //CHECKER IF NEW PASSWORD MATCHES
  useEffect(() => {
    let status = "";
    try {
      if (user.password !== user.validpass) {
        status = "Password does not match!";
        setValidatedPass(status);
      } else status = "Password Match!";
      setValidatedPass(status);
    } catch (err) {
      status = err;
    }
  }, [user.password, user.validpass]);

  // START ALL ELEMENTS HERE
  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{
        x: window.innerWidth,
        y: window.innerHeight,
      }}
      // transition={{'1s'}}
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
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />

      <Container>
        <LoginWrapper>
          {/* <Image src={Logo}></Image> */}
          <Title>RESET PASSWORD</Title>
          <H4> ENTER NEW PASSWORD </H4>

          <PasswordWrapper>
            <Input
              placeholder="New Password"
              type="password"
              id="password"
              onChange={(e) => {
                onChangeHandle(e);
              }}
            />
            <Input
              placeholder="Confirm new Password"
              type="password"
              id="validpass"
              onChange={(e) => {
                onChangeHandle(e);
              }}
            />

            <Alert>{validatedpass}</Alert>
          </PasswordWrapper>

          <InputWrapper>
            <Button onClick={onSubmitReset}>
              SUBMIT
              <LoginIcon />
            </Button>
          </InputWrapper>
        </LoginWrapper>
      </Container>
    </motion.div>
  );
};

export default Signin;
