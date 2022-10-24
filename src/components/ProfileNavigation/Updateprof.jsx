import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IosShareIcon from '@mui/icons-material/IosShare';

//Media Queries
import { device } from '../../media';

const ContainerWrapper = styled.div`
  padding: 0px;
  margin-left: 15px;
  margin-top: 25px;
  margin-right: 10px;
  background-color: #ffffffd3;
  width: 830px;
  height: 660px;
  position: relative;
`;

const UploadBtn = styled.div`
  appearance: button;
  background-color: #132550;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #000 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #ffff;

  cursor: pointer;
  display: inline-block;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: bolder;
  line-height: 20px;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  margin-top: -330px;
  margin-bottom: 20px;
  margin-left: 380px;

  &:focus {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
    outline: 0;
  }
  &:not([disabled]):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

const Savebt = styled.div`
  appearance: button;
  background-color: #132550;
  background-image: none;
  border: 1px solid #000;
  border-radius: 4px;
  box-shadow: #000 4px 4px 0 0, #000 4px 4px 0 1px;
  box-sizing: border-box;
  color: #ffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: bolder;
  line-height: 20px;
  margin: 0 5px 10px 0;
  overflow: visible;
  padding: 12px 40px;
  text-align: center;
  text-transform: none;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  margin-top: 20px;
  margin-left: 13px;

  &:focus {
    text-decoration: none;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.125) 0 3px 5px inset;
    outline: 0;
  }
  &:not([disabled]):active {
    box-shadow: #fff 2px 2px 0 0, #000 2px 2px 0 1px;
    transform: translate(2px, 2px);
  }
`;

const Input = styled.input``;

const Headers = styled.div`
  margin-left: 16px;
  font-size: 20px;
  font-family: Roboto, Arial, sans-serif;
`;

const Updateprof = () => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const OnchangePHandler = () => {};

  return (
    <ContainerWrapper>
      <Headers> Channel name and description</Headers>
      <TextField
        sx={{
          '& > :not(style)': { m: 2, width: '30ch' },
        }}
        id="outlined-name"
        label="Channel Name"
      />
      <br />
      <TextField
        sx={{
          '& > :not(style)': { m: 2, width: '85ch' },
        }}
        id="outlined-multiline-static"
        label="Description"
        multiline
        rows={6}
        defaultValue="Default Value"
      />
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 2, width: '30ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Headers> Personal Information</Headers>
        <TextField id="outlined-name" label="First Name" />
        <TextField id="outlined-uncontrolled" label="Last Name" />
        <br />
        <TextField id="outlined-uncontrolled" type="date" />
        <TextField id="outlined-name" label="Address" />
      </Box>

      <Savebt>Save changes</Savebt>

      <UploadBtn onClick={handleClick}>
        <Input
          type="file"
          accept=".pdf"
          style={{ display: 'none' }}
          ref={inputRef}
        />
        Upload CV <IosShareIcon />
        <p>(.pdf file Only)</p>
      </UploadBtn>
    </ContainerWrapper>
  );
};

export default Updateprof;
