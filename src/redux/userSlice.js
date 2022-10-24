import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  message: '',
};

export const userSlice = createSlice({
  name: 'username',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;

      state.message = 'logged in!';
    },
    loginFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
      state.message = 'logged out!';
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(
          state.currentUser.subscribedUsers.findIndex(
            (channelId) => channelId === action.payload
          ),
          1
        );
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    },

    reduxSaveVideo: (state, action) => {
      if (!state.currentUser.saveVideos.includes(action.payload)) {
        state.currentUser.saveVideos.push(action.payload);
      } else {
        state.currentUser.saveVideos.splice(
          state.currentUser.saveVideos.findIndex(
            (videoid) => videoid === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  subscription,
  reduxSaveVideo,
} = userSlice.actions;

export default userSlice.reducer;
