import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { PostsState } from "./postsSlice";

const SinglePostPage = () => {
  const { postId } = useParams();

  const post = useSelector((state: { posts: PostsState }) =>
    selectPostById(state, postId!)
  );

  // Check if post is not found
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  );
};

export default SinglePostPage;
