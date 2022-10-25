import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { format } from "timeago.js";
import { Link } from "react-router-dom";

//MUI
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

//TOAST
import { DeleteNotif, UnauthorizedNotif, CommentSuccess } from "./Toasts";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: "Roboto", sans-serif;
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: bolder;
  color: ${({ theme }) => theme.titleColor};
  display: flex;
`;
const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: gray;
  margin-left: 5px;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.titleColor};
  font-size: 14px;
`;

const Separator = styled.div`
  position: absolute;
  right: 0;
`;

const UpdateContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.titleColor};
  background-color: transparent;
  outline: none;
  padding: 5px;
  width: 100%;
  color: ${({ theme }) => theme.titleColor};
`;

const CommentsBox = ({
  comment,
  currentUser,
  setSelectedComment,
  selectedComment,
}) => {
  const [channel, setChannel] = useState({});
  const [editor, setEditor] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      const responseToComments = await axios.get(
        `https://capstoneback2.herokuapp.com/api/users/find/${comment.userId}`
      );
      setChannel(responseToComments.data);
    };
    fetchComments();
  }, [comment.userId]);

  const deleteComment = async () => {
    const deletedComment = await axios.delete(
      `https://capstoneback2.herokuapp.com/api/comments/${comment._id}`
    );
    DeleteNotif();
  };

  const editComment = async () => {
    editor ? setEditor(false) : setEditor(true);
    setSelectedComment(comment._id);
  };

  const [updatedComment, setUpdatedComment] = useState("");

  const onChangeHandler = (e) => {
    const latestComment = ([e.target.id] = e.target.value);
    console.log(latestComment);
    setUpdatedComment(latestComment);
  };

  const updatedSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(selectedComment);
    try {
      const latestComment = await axios.put(
        `https://capstoneback2.herokuapp.com/api/comments/${selectedComment}`,
        { desc: updatedComment }
      );
      CommentSuccess();
      setEditor(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Link to={`/profile/About/${comment.userId}`}>
          <Avatar src={channel.image} />
        </Link>
        <Details>
          <Name>
            {channel?.username} |<Date>{format(comment?.createdAt)}</Date>
            <Separator>
              {currentUser !== comment.userId ? (
                ""
              ) : (
                <>
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={editComment}
                  />
                  <DeleteIcon
                    style={{ cursor: "pointer" }}
                    onClick={deleteComment}
                  />
                </>
              )}
            </Separator>
          </Name>
          {editor ? (
            <>
              <UpdateContainer>
                <Input
                  placeholder="Add new comment"
                  id="comment"
                  type="text"
                  onChange={(e) => onChangeHandler(e)}
                />

                <SendIcon
                  style={{ cursor: "pointer" }}
                  onClick={updatedSubmitHandler}
                />
              </UpdateContainer>
            </>
          ) : (
            <>
              <Text>{comment.desc}</Text>
            </>
          )}
        </Details>
      </Container>
    </>
  );
};

export default CommentsBox;
