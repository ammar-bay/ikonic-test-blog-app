import {
  createSlice,
  nanoid,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit";
// import { sub } from "date-fns";
import axios from "axios";

export interface Post {
  id: string;
  title: string;
  body: string;
  date: string;
  userId: string;
}

export interface PostsState {
  posts: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState: PostsState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk<Post[]>(
  "posts/fetchPosts",
  async () => {
    const response = await axios.get<Post[]>(POSTS_URL);
    return response.data;
  }
);

export const addNewPost = createAsyncThunk<Post, Post>(
  "posts/addNewPost",
  async (initialPost) => {
    const response = await axios.post<Post>(POSTS_URL, initialPost);
    return response.data;
  }
);

export const updatePost = createAsyncThunk<Post, Post>(
  "posts/updatePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.put<Post>(`${POSTS_URL}/${id}`, initialPost);
      return response.data;
    } catch (err) {
      return initialPost; // only for testing Redux!
    }
  }
);

export const deletePost = createAsyncThunk<Post, Post>(
  "posts/deletePost",
  async (initialPost) => {
    const { id } = initialPost;
    try {
      const response = await axios.delete<Post>(`${POSTS_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    } catch (err: any) {
      return err.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<Post>) {
        state.posts.push(action.payload);
      },
      prepare(title: string, body: string, userId: string) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            date: new Date().toISOString(),
            userId,
            reactions: {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = state.posts.concat(action.payload);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const sortedPosts = state.posts.sort((a, b) =>
          a.id.localeCompare(b.id)
        );
        action.payload.id = (
          parseInt(sortedPosts[sortedPosts.length - 1].id) + 1
        ).toString();
        action.payload.date = new Date().toISOString();
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Update could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        action.payload.date = new Date().toISOString();
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = [...posts, action.payload];
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;
        const posts = state.posts.filter((post) => post.id !== id);
        state.posts = posts;
      });
  },
});

export const selectAllPosts = (state: { posts: PostsState }) =>
  state.posts.posts;
export const getPostsStatus = (state: { posts: PostsState }) =>
  state.posts.status;
export const getPostsError = (state: { posts: PostsState }) =>
  state.posts.error;

export const selectPostById = (state: { posts: PostsState }, postId: string) =>
  state.posts.posts.find((post) => post.id === postId);

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
