import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface PostState {
  _id: string;
  title: string;
  body: string;
  date: string;
  userId: string;
}

const initialState: PostState[] = [];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostState[]>) => {
      return action.payload;
    },
    addPost: (state, action: PayloadAction<PostState>) => {
      state.push(action.payload);
    },
    updatePost: (
      state,
      action: PayloadAction<{ id: string; post: PostState }>
    ) => {
      const { id, post } = action.payload;
      const existingPost = state.find((post) => post._id === id);
      if (existingPost) {
        existingPost.title = post.title;
        existingPost.body = post.body;
      }
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const { payload: postId } = action;
      return state.filter((post) => post._id !== postId);
    },
  },
});

export const selectAllPosts = (state: { posts: PostState[] }) => state.posts;

export const selectPostById = (state: { posts: PostState[] }, postId: string) =>
  state.posts.find((post) => post._id === postId);

export const { addPost, updatePost, deletePost, setPosts } = postsSlice.actions;

export default postsSlice.reducer;
