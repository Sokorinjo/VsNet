import * as React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ThumbUpOutlined, ThumbUp, ElevatorSharp } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Stack,
  CardHeader,
  Avatar,
} from "@mui/material";
import { ChatBubbleOutline, ExpandOutlined } from "@mui/icons-material";
import PopupComment from "../comments/PopupComment";
import LikePostButton from "./LikePostButton";
import { useAddLikeToPostMutation } from "./postsApiSlice";
import { toast } from "react-toastify";

const Post = ({
  post,
  postId,
  userStateId,
  user,
  title,
  text,
  time,
  createdAt,
}) => {
  const [like, setLike] = useState();
  const [likePost, { isSuccess }] = useAddLikeToPostMutation();

  

  const handleLike = async () => {
    try {
      await likePost({ postId, userId: user._id }).unwrap();
      // setLike(!like);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card sx={{ minWidth: 345, maxWidth: 500, marginBottom: "30px" }}>
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text}
        </Typography>
      </CardContent>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "primary.main" }}></Avatar>}
        title={user.username}
        subheader={createdAt + " " + time + " " + "ago"}
      ></CardHeader>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          {/* <Button size="small" onClick={handleLike}> */}
            {/* <LikePostButton post={post} postId={postId} userId={user._id}/> */}
            {/* {like ? <ThumbUp /> : <ThumbUpOutlined />} */}
            {/* {like ? "Dislike" : "Like"} */}
          {/* </Button> */}
          <PopupComment postId={postId} />
        </Stack>

        {/* Check if user can edit post */}
        {/* <Button size="small" type="button">
          Edit
        </Button> */}
      </CardActions>
    </Card>
  );
};

export default Post;
