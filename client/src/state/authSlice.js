import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
  isEditing: false,
  isMessage: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.token = action.payload.token;
    },
    setUserData: (state, action) => {
      state.user = action.payload.user;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.log("user friends non-existent");
      }
    },
    setProfileImg: (state, action) => {
      if (state.user) {
        state.user.picturePath = action.payload.picturePath;
      } else {
        console.log("user image error");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
    setIsEditing: (state, action) => {
      state.isEditing = action.payload.isEditing;
    },
    setIsMessage: (state, action) => {
      state.isMessage = action.payload.isMessage;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
  setUserData,
  setProfileImg,
  setIsEditing,
  setIsMessage,
} = authSlice.actions;
export default authSlice.reducer;
