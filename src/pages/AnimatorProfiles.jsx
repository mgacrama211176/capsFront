import React, { useState, useEffect } from "react";
import AnimatorCards from "../components/AnimatorCards";
import axios from "axios";

//loader
import { LoadingAnimators } from "../components/LoadingAnimation";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const TypoMedia = {
  fontSize: "2.5rem",
  "@media (max-width:600px)": {
    fontSize: "2rem",
  },
};

const BoxMedia = {
  display: "Flex",
  flexWrap: "wrap",
  gap: 2,
  flexDirection: "row",
};

const AnimatorProfiles = () => {
  let [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchingProfiles = async () => {
    const fetchedUsers = await axios.get(
      `https://capstoneback2.herokuapp.com/api/users/find/All`
    );
    setUsers(fetchedUsers.data);
    console.log(fetchedUsers.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchingProfiles();
  }, []);

  return (
    <Container>
      {loading ? (
        <>
          <LoadingAnimators />
        </>
      ) : (
        <>
          <Typography variant="h3" gutterBottom sx={TypoMedia}>
            Animator Profiles
          </Typography>
          {/* <AnimatorCards /> */}
          <Box sx={BoxMedia}>
            {users.map((user) => (
              <AnimatorCards key={user._id} user={user} />
            ))}
          </Box>
        </>
      )}
    </Container>
  );
};

export default AnimatorProfiles;
