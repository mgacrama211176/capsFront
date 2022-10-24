import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import CommentsBox from './CommentsBox';
import axios from 'axios';

//TOAST
import { CommentSuccess } from './Toasts';

//MUI
import SendIcon from '@mui/icons-material/Send';

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
  const [comments, setComments] = useState([]);
  const { currentUser } = useSelector((state) => state.username);
  const [newComment, setNewComment] = useState('');
  const [selectedComment, setSelectedComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      const responseComments = await axios.get(
        `http://localhost:4000/api/comments/${videoId}`
      );
      setComments(responseComments.data);
    };
    fetchComments();
  }, [videoId]);

  const onChangeHandler = (e) => {
    const latestComment = ([e.target.id] = e.target.value);
    console.log(latestComment);
    setNewComment(latestComment);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(currentUser._id);
    console.log(videoId);
    try {
      const currentUserComment = await axios.post(
        `http://localhost:4000/api/comments/${currentUser._id}/${videoId}`,
        {
          desc: newComment,
        }
      );
      CommentSuccess();
      setNewComment('');

      console.log(currentUserComment);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      {currentUser === null ? (
        ''
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
          <SendIcon style={{ cursor: 'pointer' }} onClick={onSubmitHandler} />
        </NewComment>
      )}

      {comments.map((comment) => (
        <CommentsBox
          key={comment._id}
          comment={comment}
          currentUser={currentUser?._id}
          setSelectedComment={setSelectedComment}
          selectedComment={selectedComment}
        />
      ))}
    </Container>
  );
};

export default ViewComments;
