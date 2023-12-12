import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../auth/authSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useFetchPostsQuery } from "./postApiSlice";
import { selectAllPosts, setPosts } from "./postsSlice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const username = useSelector(selectCurrentUser);

  const {
    data: fetchedPosts,
    error,
    isLoading,
    isSuccess,
    isError,
  } = useFetchPostsQuery(username!);

  useEffect(() => {
    if (isSuccess) {
      // Dispatch the fetched posts to the Redux store
      dispatch(setPosts(fetchedPosts));
    }
  }, [isSuccess, dispatch, fetchedPosts]);

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    if (posts.length === 0) {
      content = <p>No posts found.</p>;
    } else {
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date));
      content = orderedPosts.map((post) => (
        <PostsExcerpt key={post._id} post={post} />
      ));
    }
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;
