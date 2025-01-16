import React, { useState } from "react";
import {
  Container,
  Box,
  CssBaseline,
  Paper,
  Button,
  Typography,
  TextField,
  TextareaAutosize,
  Stack,
} from "@mui/material";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import MultiLineTextField from "../../components/MultiLineTextField";

//RTK Query
import { useAddPostCommentMutation } from "./commentsApiSlice";

const PopupCommentForm = ({ handleClose, postId }) => {
  const [commentText, setCommentText] = useState("");
  const [addNewComment, { isLoading, isSuccess, isError, error }] =
    useAddPostCommentMutation();

  const navigate = useNavigate();

  const handleCommentText = (e) => setCommentText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentText) {
      try {
        const {data} = await addNewComment({postId, commentText}).unwrap()
        toast.success("Comment added!");
        setCommentText("");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <Container
      sx={
        {
          // width: "900px",
          // display: "flex",
          // justifyContent: "center",
          // maxWidth: "850px",
        }
      }
    >
      <CssBaseline />
      {/* <Paper elevation={1}> */}
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          marginTop: 2,
          marginBottom: -2,
          gap: 2,
          width: "300px",
        }}
        onSubmit={handleSubmit}
      >
        {/* <Typography variant="h3">Add a post</Typography> */}
        {/* <TextField
          sx={{ width: "100%" }}
          // label="Post Title"
          placeholder="Post title(max 30chr)"
          variant="standard"
          name="title"
          label="Post Title"
          value={title}
          onChange={handleTitle}
          color="accent"
          size="small"
          inputProps={{maxLength: 30}}
        /> */}
        {/* <TextareaAutosize sx={{width: "300px"}} minRows={4} placeholder="What is on your mind?" /> */}

        {/* <MultiLineTextField handleText={handleText}/> */}
        <TextField
          id="outlined-multiline-static"
          label="Comment"
          multiline
          minRows={6}
          // defaultValue="Default Value"
          placeholder="Write something for this post."
          value={commentText}
          onChange={handleCommentText}
          sx={{ width: "100%" }}
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "end",
            gap: "5px",
          }}
        >
          <Button
            type="submit"
            disabled={!commentText ? true : false}
            // variant={!title || !text ? "contained" : ""}
            variant="contained"
            // onClick={handleClose}
          >
            Post
          </Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Stack>
      </Box>
      {/* </Paper> */}
    </Container>
  );
};

export default PopupCommentForm;
