import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commentsOnVideo: null,
  loading: false,
  error: false,
  message: "",
};

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    FetchStart: (state) => {
      state.loading = true;
    },
    FetchSuccess: (state, action) => {
      state.loading = false;
      state.commentsOnVideo = action.payload;
    },
    FetchFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { FetchStart, FetchSuccess, FetchFailed } = commentSlice.actions;

export default commentSlice.reducer;
