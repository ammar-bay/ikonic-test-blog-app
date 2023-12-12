import { apiSlice } from "../../app/api/apiSlice";
import { PostState } from "./postsSlice";

const POSTS_URL = "/posts";

export const postApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchPosts: builder.query<PostState[], string>({
      query: (username) => `${POSTS_URL}?${username}`,
      keepUnusedDataFor: 5,
    }),
    addNewPost: builder.mutation({
      query: (newPost) => ({
        url: POSTS_URL,
        method: "POST",
        body: newPost,
      }),
    }),
    updatePost: builder.mutation({
      query: (updatedPost) => {
        return {
          url: POSTS_URL,
          method: "PATCH",
          body: updatedPost,
        };
      },
    }),
    deletePost: builder.mutation({
      query: (id) => {
        return {
          url: `${POSTS_URL}/${id}`,
          method: "DELETE",
        };
      },
    }),
    fetchPostById: builder.query({
      query: (postId) => `${POSTS_URL}/${postId}`,
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApiSlice;
