import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { Post } from "./postsSlice";
import React from "react";

interface IProps {
  post: Post;
}

const PostsExcerpt: React.FC<IProps> = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>
    </article>
  );
};
export default PostsExcerpt;
