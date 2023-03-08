import { createSlice } from "@reduxjs/toolkit";


// Define the initial state
const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: []
};

// Create a slice with name "auth" and define reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },

    setLogin: (state, action) =>{
      state.user = action.payload.user;
      state.token = action.payload.token;
    
    },

    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("Cannot set friends for non-existent user.");
      }
    },

    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },

    updatePost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) {
          return action.payload.post;
        } else {
          return post;
        }
      });
      state.posts = updatedPosts;
    }
  }
});

// Define action functions for each reducer
export const { setMode, setLogin, setLogout, setFriends, setPosts, updatePost } = authSlice.actions;

// Export the reducer from the slice
export default authSlice.reducer;
