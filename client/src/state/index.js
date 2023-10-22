import { createSlice } from "@reduxjs/toolkit";
//dark mose vs light mode
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {//actions (functions)
    //changing from light mode to dark mode
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    //state, parameter, saving in session
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    //reset seesion
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    //set friends into local state
    setFriends: (state, action) => {
      if (state.user) {//user exists
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends non-existent");
      }
    },
    //
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    //
    setPost: (state, action) => {
        //return relevant post
        //we only updates post that we change
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } =
  authSlice.actions;
export default authSlice.reducer;