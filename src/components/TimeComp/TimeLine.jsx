import React, { useState } from "react";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import WorkIcon from "@mui/icons-material/Work";

import "../../components/TimeComp/Time.css";
import { Typography } from "@mui/material";

const TimeLine = ({ children, retrivedUser }) => {
  return (
    <Timeline className={"timeline"}>
      {/*Item Header*/}
      <TimelineItem>
        <HeaderLineSeparator />
        <TimelineContent>
          <Typography variant="h6" className={"timeline_header"}>
            My Profile
          </Typography>
        </TimelineContent>
      </TimelineItem>

      {children}

      {/*Content Info*/}

      <TimelineItem>
        <CustomTimeLineSeparator />
        <TimelineContent>
          User Category: {retrivedUser.userCategory}
        </TimelineContent>
      </TimelineItem>

      {retrivedUser.address === undefined ? (
        ""
      ) : (
        <TimelineItem>
          <CustomTimeLineSeparator />
          <TimelineContent>Address: {retrivedUser.address}</TimelineContent>
        </TimelineItem>
      )}

      <TimelineItem>
        <CustomTimeLineSeparator />
        <TimelineContent>
          Subscribers: {retrivedUser.subscribers}
        </TimelineContent>
      </TimelineItem>

      <TimelineItem>
        <CustomTimeLineSeparator />
        <TimelineContent>
          Subscribed Users: {retrivedUser?.subscribedUsers?.length}
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
};

export const CustomTimeLineSeparator = () => (
  <TimelineSeparator className={"separator_padding"}>
    <TimelineDot variant={"outlined"} className={"timeline_dot"} />
    <TimelineConnector />
  </TimelineSeparator>
);

export const HeaderLineSeparator = () => (
  <TimelineSeparator className={"head_padding"}>
    <TimelineDot className={"head_dot"}>{<WorkIcon />}</TimelineDot>
    <TimelineConnector />
  </TimelineSeparator>
);

export default TimeLine;
