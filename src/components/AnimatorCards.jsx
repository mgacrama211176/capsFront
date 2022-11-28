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

const BtMedia = {
  fontSize: {
    xs: "9px",
    sm: "10px",
    md: "11px",
    lg: "13px",
    xl: "13px",
  },
};

const TypoMedia = {
  fontSize: {
    xs: "18px",
    sm: "19px",
    md: "19px",
    lg: "22px",
    xl: "22px",
  },
};
const TypoMedia2 = {
  fontSize: {
    xs: "14px",
    sm: "14px",
    md: "15px",
    lg: "16px",
    xl: "16px",
  },
};

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
              <Typography
                sx={TypoMedia}
                gutterBottom
                variant="h5"
                component="div"
              >
                {user.username}
              </Typography>
              <Typography
                sx={TypoMedia}
                gutterBottom
                variant="h1"
                component="div"
              >
                {user.email}
              </Typography>
              <Typography
                sx={TypoMedia2}
                variant="body2"
                color="text.secondary"
              >
                {user.about}
              </Typography>
            </CardContent>
            <CardActions sx={{ display: "flex" }}>
              <Link
                to={`/profile/About/${user._id}`}
                style={{ textDecoration: "none" }}
              >
                <Button sx={BtMedia} size="small" variant="contained">
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
                      <Button
                        sx={BtMedia}
                        size="small"
                        variant="contained"
                        disabled
                      >
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
                    <Button sx={BtMedia} size="small" variant="contained">
                      Download CV
                    </Button>
                  </a>
                </>
              )}
              <a
                href={`mailto: ${user.email}`}
                style={{ textDecoration: "none" }}
              >
                <Button sx={BtMedia} size="small" variant="contained">
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
