import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../auth/authSlice";
import { useAddNewPostMutation } from "./postApiSlice";
import { PostState, addPost } from "./postsSlice";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onTitleChanged = (e: any) => setTitle(e.target.value);
  const onContentChanged = (e: any) => setContent(e.target.value);

  const username = useSelector(selectCurrentUser);

  const canSave =
    [title, content].every(Boolean) && addRequestStatus === "idle";

  const [addNewPostApi, { isLoading }] = useAddNewPostMutation();

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const newPost: PostState = await addNewPostApi({
          title,
          body: content,
          username,
          date: new Date().toISOString(),
        }).unwrap();

        dispatch(addPost(newPost));

        setTitle("");
        setContent("");
        navigate("/");
      } catch (err) {
        console.error("Failed to save the post", err);
      } finally {
        setAddRequestStatus("idle");
      }
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
        Add a New Post
      </Typography>
      <TextField
        id="postTitle"
        name="postTitle"
        placeholder="Title"
        value={title}
        onChange={onTitleChanged}
      />
      <TextField
        id="postContent"
        name="postContent"
        placeholder="Body"
        minRows={3}
        multiline
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
    </section>
  );
};

export default AddPostForm;
