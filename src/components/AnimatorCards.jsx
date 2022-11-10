import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//MUI
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const AnimatorCards = ({ user }) => {
  return (
    <Box>
      {user.employmentStatus === "Available" ? (
        <>
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
            <CardActions sx={{ display: "flex" }}>
              <Link
                to={`/profile/About/${user._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small" variant="contained">
                  View Profile
                </Button>
              </Link>
              {user.uploadCV === "" ? (
                <>
                  <Tooltip title="Animator did not upload CV">
                    <a
                      href={user.uploadCV}
                      download
                      target="_blank"
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="small" variant="contained" disabled>
                        Download CV
                      </Button>
                    </a>
                  </Tooltip>
                </>
              ) : (
                <>
                  <a
                    href={user.uploadCV}
                    download
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" variant="contained">
                      Download CV
                    </Button>
                  </a>
                </>
              )}
              <a
                href={`mailto: ${user.email}`}
                style={{ textDecoration: "none" }}
              >
                <Button size="small" variant="contained">
                  Email
                </Button>
              </a>
            </CardActions>
          </Card>
        </>
      ) : (
        ""
      )}
    </Box>
  );
};

export default AnimatorCards;
