import React, { useState, useEffect } from "react";
import AnimatorCards from "../components/AnimatorCards";
import axios from "axios";

//loader
import LoadingAnimation from "../components/LoadingAnimation";

//MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const AnimatorProfiles = () => {
  let [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchingProfiles = async () => {
    const fetchedUsers = await axios.get(
      `https://capstoneback2.herokuapp.com/api/users/find/All`
    );
    setUsers(fetchedUsers.data);
    console.log(fetchedUsers.data);
  };

  useEffect(() => {
    fetchingProfiles();
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Animator Profiles
      </Typography>
      {/* <AnimatorCards /> */}
      <Box sx={{ display: "Flex", flexFlow: "wrap", gap: 5 }}>
        {users.map((user) => (
          <AnimatorCards key={user._id} user={user} />
        ))}
      </Box>
    </Container>
  );
};

export default AnimatorProfiles;
