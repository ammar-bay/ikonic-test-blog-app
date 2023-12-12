import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  PostState,
  deletePost,
  selectPostById,
  updatePost,
} from "./postsSlice";
// import { selectAllUsers } from "../users/usersSlice";
import { RootState } from "../../app/store";
import { useDeletePostMutation, useUpdatePostMutation } from "./postApiSlice";
import { Button, TextField, Typography } from "@mui/material";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );
  // const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);
  const [requestStatus, setRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const [updatePostApi, { isLoading: isUpdating }] = useUpdatePostMutation();
  const [deletePostApi, { isLoading: isDeleting }] = useDeletePostMutation();
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === "idle";

  const onSavePostClicked = async () => {
    if (title && content && userId) {
      try {
        setRequestStatus("pending");
        await updatePostApi({
          id: post._id,
          title,
          body: content,
          userId,
          date: post.date,
        }).unwrap();
        dispatch(
          updatePost({
            id: post._id,
            post: {
              _id: post._id,
              title,
              body: content,
              userId,
              date: post.date,
            },
          })
        );

        setTitle("");
        setContent("");
        setUserId("");
        navigate(`/post/${postId}`);
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setRequestStatus("idle");
      }
    }
  };

  const onDeletePostClicked = async () => {
    try {
      setRequestStatus("pending");
      await deletePostApi(post._id).unwrap();
      dispatch(deletePost(post._id));
      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
      setRequestStatus("idle");
    }
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "0 2rem",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Edit Post
      </Typography>
      <TextField
        id="postTitle"
        name="postTitle"
        label="Post Title"
        fullWidth
        value={title}
        onChange={onTitleChanged}
      />
      <TextField
        id="postContent"
        name="postContent"
        label="Content"
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={onContentChanged}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSavePostClicked}
        disabled={!canSave}
      >
        Save Post
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={onDeletePostClicked}
      >
        Delete Post
      </Button>
    </section>
  );
};

export default EditPostForm;
