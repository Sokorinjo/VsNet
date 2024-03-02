import * as React from "react";
import { useSelector } from "react-redux";
import {
  ThumbUpOutlined,
  ThumbUpAltOutlined,
  Edit,
  Delete,
} from "@mui/icons-material";
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
import PopupPost from "./PopupPost";
import PopupComment from "../comments/PopupComment";
import EditPopupPost from "./EditPopupPost";
import DeletePost from "./DeletePost.jsx";

const PostUserPage = ({ post }) => {
  // console.log(post)
  return (
    <Card
      sx={{ minWidth: 345, maxWidth: 500, height: 200, marginBottom: "20px" }}
    >
      {/* <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      /> */}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.text}
        </Typography>
      </CardContent>
      {/* card header, avatar, username */}
      <CardHeader>posted: {post.createdAt}</CardHeader>
      <CardActions
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <PopupComment postId={post._id} />
        </Stack>

        <Stack sx={{ display: "flex", flexDirection: "row" }}>
          <EditPopupPost post={post} />
          <DeletePost postId={post._id}/>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default PostUserPage;
