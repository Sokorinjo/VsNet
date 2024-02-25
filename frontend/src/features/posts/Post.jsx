import * as React from "react";
import { useSelector } from "react-redux";
import { ThumbUpOutlined, ThumbUpAltOutlined } from "@mui/icons-material";
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

const Post = ({ postId, user, title, text, time, createdAt }) => {


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
          <Button size="small">
            <ThumbUpAltOutlined />
          </Button>
          <PopupComment postId={postId} />
        </Stack>
    
        {/* Check if user can edit post */}
        <Button size="small" type="button">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
