import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommentsBox from "./CommentsBox";
import axios from "axios";

//TOAST
import { CommentSuccess } from "./Toasts";

//MUI
import SendIcon from "@mui/icons-material/Send";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { FetchSuccess } from "../redux/commentSlice";

//loader
import { LoadingComments } from "./LoadingAnimation";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

const ViewComments = ({ videoId }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [selectedComment, setSelectedComment] = useState("");

  const { currentUser } = useSelector((state) => state.username);
  // const commentsOnVideo = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      const responseComments = await axios.get(
        `https://filanimeback.onrender.com/api/comments/${videoId}`
      );
      dispatch(FetchSuccess(responseComments.data));
      setComments(responseComments.data);
    };
    fetchComments();
    setLoading(false);
  }, [videoId, dispatch, comments]);

  const onChangeHandler = (e) => {
    const latestComment = ([e.target.id] = e.target.value);
    setNewComment(latestComment);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const currentUserComment = await axios.post(
        `https://filanimeback.onrender.com/api/comments/${currentUser._id}/${videoId}`,
        {
          desc: newComment,
        }
      );
      CommentSuccess();
      setNewComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {currentUser === null ? (
        ""
      ) : (
        <NewComment>
          <Avatar src={currentUser?.image} />
          <Input
            placeholder="Add new comment"
            onChange={(e) => onChangeHandler(e)}
            id="comment"
            type="text"
            value={newComment}
          />
          <SendIcon style={{ cursor: "pointer" }} onClick={onSubmitHandler} />
        </NewComment>
      )}
      {loading ? (
        <>
          <LoadingComments />
        </>
      ) : (
        comments.map((comment) => (
          <CommentsBox
            key={comment._id}
            comment={comment}
            currentUser={currentUser?._id}
            setSelectedComment={setSelectedComment}
            selectedComment={selectedComment}
          />
        ))
      )}
    </Container>
  );
};

export default ViewComments;
