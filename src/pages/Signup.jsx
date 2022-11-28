import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { device } from "../media";

//MUI
import LockIcon from "@mui/icons-material/Lock";
import LoginIcon from "@mui/icons-material/Login";
import CategoryIcon from "@mui/icons-material/Category";
import EmailIcon from "@mui/icons-material/Email";

//Icons
import PersonIcon from "@mui/icons-material/Person";

//Framer Motion
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

//TOAST
import { AccountCreated } from "../components/Toasts";

//RouterDOM
import { useNavigate } from "react-router-dom";

//Modal
import { TermsModal } from "../components/VideoModalDelete";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.titleColor};
  font-family: "Roboto", sans-serif;
  margin: 30px;

  /* Mobile S */
  @media ${device.mobileS} {
    max-width: 320px;
    margin: 40px 0px;
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
  padding: 10px 25px;
  border: 1px solid;
  gap: 10px;
  border-radius: 20px;
  max-width: 100%;
`;

const Image = styled.img`
  max-width: 25%;
  @media ${device.laptop} {
    max-width: 20%;
    margin: -10px;
  }
`;

const Title = styled.h1`
  margin-bottom: 10px;

  /* Mobile S */
  @media ${device.mobileS} {
    font-size: 18px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
`;

const Icons = styled.img`
  max-width: 5%;
  cursor: pointer;

  /* Mobile S */
  @media ${device.mobileS} {
    max-width: 2em;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const PasswordWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
`;

const LockIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const H4 = styled.h4`
  /* Mobile S */
  @media ${device.mobileS} {
    font-size: 14px;
  }
`;

const Input = styled.input`
  border-radius: 5px;
  padding: 5px;
`;
const Select = styled.select`
  /* LAPTOP */
  @media ${device.laptop} {
    width: 180px;
    text-align: center;
  }
`;
const Option = styled.option``;

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

const Options = styled.div`
  display: flex;
  gap: 50px;
  margin: 5px 0px 40px 0px;

  /* Mobile S */
  @media ${device.mobileS} {
    gap: 30px;
  }
`;

const H6 = styled.h6`
  margin: 10px 5px;
  cursor: pointer;
  transition: 0.2s ease-in;
  color: white;
  &:hover {
    color: #fca326;
    text-decoration: underline;
  }
`;

const Signup = () => {
  const nav = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    userCategory: "",
    password: "",
    validpass: "",
  });
  // const [validatedpass, setValidatedPass] = useState("");
  const [agree, setAgree] = useState(false);

  const [status, setStatus] = useState("");

  const onClickAgree = () => {
    agree ? setAgree(false) : setAgree(true);
  };

  const Alert = styled.p`
    margin: 15px 0px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-weight: bold;
  `;

  const onChangeHandle = (e) => {
    const newUser = { ...user };
    newUser[e.target.id] = e.target.value;
    setUser(newUser);
  };

  useEffect(() => {
    try {
      if (user.password === "") {
        setStatus("");
      } else if (user.password !== user.validpass) {
        setStatus("Password does not match!");
      } else {
        setStatus("Password Match!");
      }
    } catch (err) {
      console.log(err);
    }
  }, [user.password, user.validpass]);

  const onClickAddSubmit = async (e) => {
    e.preventDefault();
    const NewUser = await axios.post(
      `https://filanimeback.onrender.com/api/auth/signup`,
      {
        email: user.email,
        username: user.username,
        userCategory: user.userCategory,
        password: user.password,
      }
    );
    nav("/signin");
    console.log(NewUser);
    AccountCreated();

    setUser({
      username: "",
      email: "",
      userCategory: "",
      password: "",
      validpass: "",
    });
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: "100%", opacity: 1 }}
      exit={{
        x: window.innerWidth,
        y: window.innerHeight,
      }}
    >
      <Container>
        <LoginWrapper>
          <Title>Signup</Title>

          <H4> Email Address </H4>

          <InputWrapper>
            <EmailIcon />
            <Input
              placeholder="Username@user.com"
              type="text"
              id="email"
              onChange={(e) => {
                onChangeHandle(e);
              }}
            />
          </InputWrapper>
          <H4> User Name </H4>
          <InputWrapper>
            <PersonIcon />
            <Input
              placeholder="User Name"
              type="text"
              id="username"
              onChange={(e) => {
                onChangeHandle(e);
              }}
            />
          </InputWrapper>
          <H4> User Category </H4>
          <InputWrapper>
            <CategoryIcon />
            <Select
              id="userCategory"
              onChange={(e) => {
                onChangeHandle(e);
              }}
            >
              <Option value="Viewer" select>
                Viewer
              </Option>
              <Option value="Animator">Animator</Option>
              <Option value="Employer">Employer</Option>
            </Select>
          </InputWrapper>
          <H4> Password </H4>

          <InputWrapper>
            <>
              <PasswordWrapper>
                <LockIconContainer>
                  <LockIcon />
                </LockIconContainer>
                <BtnContainer>
                  <Input
                    placeholder="Password"
                    type="password"
                    id="password"
                    onChange={(e) => {
                      onChangeHandle(e);
                    }}
                  />
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    id="validpass"
                    onChange={(e) => {
                      onChangeHandle(e);
                    }}
                  />
                  <Alert>{status}</Alert>
                </BtnContainer>
              </PasswordWrapper>
            </>
          </InputWrapper>
          <InputWrapper>
            <input type="checkbox" onClick={onClickAgree} />
            <H6>
              <TermsModal />
            </H6>
          </InputWrapper>
          {agree ? (
            <>
              <InputWrapper>
                <Button onClick={onClickAddSubmit}>
                  SignUp
                  <LoginIcon />
                </Button>
              </InputWrapper>
              <Options>
                <Link to={"/signin"} style={{ textDecoration: "none" }}>
                  <H6>Already Signed up? </H6>
                </Link>
                <Link to={"/Fpassword"} style={{ textDecoration: "none" }}>
                  <H6>Forgot Password </H6>
                </Link>
              </Options>
            </>
          ) : (
            ""
          )}
        </LoginWrapper>
      </Container>
    </motion.div>
  );
};

export default Signup;
