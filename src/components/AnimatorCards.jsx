import React, { useState, useEffect } from "react";

//MUI
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const AnimatorCards = ({ user }) => {
  console.log(user);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="200"
        image={user.image}
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user.username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.about}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained">
          View Profile
        </Button>
        <Button size="small" variant="contained">
          Download CV
        </Button>
        <Button size="small" variant="contained">
          Email
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnimatorCards;
