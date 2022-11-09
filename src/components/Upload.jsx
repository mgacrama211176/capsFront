import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../assets/Loading.gif";

//firebase/store
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

//Toaster
import { Uploaded } from "./Toasts";

//Progress Bar
import ProgressBar from "@ramonak/react-progress-bar";

const Container = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  background-color: #4b4b4b55;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Wrapper = styled.div`
  width: 60%;
  min-height: 100%;
  background-color: white;
  color: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  border-radius: 15px;
  align-items: center;
  overflow-y: scroll;
`;

const Close = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  top: 10px;
  right: 20px;
  cursor: pointer;
  font-weight: bolder;
  width: 20px;
  transition: 2s ease;
  &:hover {
    color: #b2792d;
    background-color: white;
    border-radius: 50px;
  }
`;

const Title = styled.h1``;

const Input = styled.input`
  position: relative;
  border: 1px solid ${({ theme }) => theme.bg};
  border-radius: 3px;
  padding: 10px;
  background-color: white;
  color: black;
  width: 80%;
`;

const TextArea = styled.textarea`
  border: 1px solid ${({ theme }) => theme.bg};
  width: 80%;
  border-radius: 3px;
  padding: 10px;
  background-color: white;
`;

const Button = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 10px;
  border-color: transparent;
  background-color: #132550;
  cursor: pointer;
  transition: 0.3s ease;
  font-weight: bolder;
  color: white;
  &:hover {
    background-color: #b2792d;
    color: white;
    font-weight: bolder;
  }
`;

const Select = styled.select`
  width: 80%;
`;

const Option = styled.option``;

const Label = styled.label``;

const Video = styled.video`
  width: 320px;
  height: 240px;
`;

const ThumbContainer = styled.div`
  width: 10%;
`;

const UploadedImg = styled.img`
  width: 100%;
`;

const Upload = ({ setOpenModal, currentUser }) => {
  const nav = useNavigate();
  const [thumbnail, setThumbnail] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [thumbnailPercentage, setThumbnailPercentage] = useState(0);
  const [videoPercentage, setVideoPercentage] = useState(0);
  const videoRef = useRef(null);
  const thumbRef = useRef(null);

  const [uploadInformation, setUploadInformation] = useState({
    title: "",
    desc: "",
    tags: "Traditional Animation",
  });

  const onChangeHandleInformation = (e) => {
    const newInfo = { ...uploadInformation };
    newInfo[e.target.id] = e.target.value;
    console.log(newInfo);
    setUploadInformation(newInfo);
  };

  const uploadFile = (file, urlType) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;

    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        urlType === "imgUrl"
          ? setThumbnailPercentage(Math.round(progress))
          : setVideoPercentage(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log(`Upload is paused`);
            break;
          case "running":
            console.log(`Upload is running`);
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUploadInformation((prev) => {
            return { ...prev, [urlType]: downloadURL };
          });
        });
      }
    );
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    thumbnail && uploadFile(thumbnail, "imgUrl");
  }, [thumbnail]);

  const uploadHandler = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `https://capstoneback2.herokuapp.com/api/videos/${currentUser}`,
      {
        title: uploadInformation.title,
        desc: uploadInformation.desc,
        tags: uploadInformation.tags,
        videoUrl: uploadInformation.videoUrl,
        imgUrl: uploadInformation.imgUrl,
      }
    );
    setOpenModal(false);
    response.status === 200 && nav("/");
    Uploaded();
  };

  const handleVideoClick = () => {
    videoRef.current.click();
  };

  const handleThumbClick = () => {
    thumbRef.current.click();
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpenModal(false)}>X</Close>

        <Title>Upload video</Title>
        {videoPercentage > 0 ? (
          <>
            {videoPercentage === 100 ? (
              <>
                <Video src={uploadInformation.videoUrl} controls></Video>
              </>
            ) : (
              ""
            )}
            <ProgressBar
              completed={videoPercentage}
              width="30em"
              bgColor="#B2792D"
              baseBgColor="#132550"
              maxCompleted={100}
            />
            {videoPercentage === 100 ? "DONE!" : `Uploading Video...`}
          </>
        ) : (
          <>
            <Input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              style={{ display: "none" }}
              ref={videoRef}
            />
            <Button onClick={handleVideoClick}>Upload Video</Button>
          </>
        )}

        {thumbnailPercentage > 0 ? (
          <>
            {thumbnailPercentage === 100 ? (
              <>
                <ThumbContainer>
                  <UploadedImg src={uploadInformation.imgUrl} />
                </ThumbContainer>
              </>
            ) : (
              "Uploading Thumbnail..."
            )}
            <ProgressBar
              completed={thumbnailPercentage}
              width="10%"
              bgColor="#B2792D"
              baseBgColor="#132550"
            />
            {thumbnailPercentage === 100 ? "DONE!" : "Uploading Thumbnail..."}
          </>
        ) : (
          <>
            <Input
              type="file"
              accept="image/*"
              placeholder="Thumbnail"
              onChange={(e) => setThumbnail(e.target.files[0])}
              style={{ display: "none" }}
              ref={thumbRef}
            />
            <Button onClick={handleThumbClick}>Upload Thumbnail</Button>
          </>
        )}

        <Input
          type="text"
          placeholder="Title"
          id="title"
          onChange={(e) => onChangeHandleInformation(e)}
        />
        <TextArea
          placeholder="Description"
          rows={15}
          id="desc"
          onChange={(e) => onChangeHandleInformation(e)}
        ></TextArea>

        <Select
          name="tags"
          id="tags"
          onChange={(e) => onChangeHandleInformation(e)}
        >
          <Option value="Traditional Animation">Traditional Animation</Option>
          <Option value="2D animation">2D animation</Option>
          <Option value="3D animation">3D animation</Option>
          <Option value="Motion Graphics">Motion Graphics</Option>
          <Option value="Stop Motion">Stop Motion</Option>
        </Select>

        <Button onClick={uploadHandler}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;
