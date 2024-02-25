import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar
} from "@mui/material";
import React from "react";

const Comment = ({comment}) => {
  return (
    <ListItem key={comment._id} alignItems="flex-start">
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "primary.main" }}></Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={comment.userId.username}
        secondary={
          <React.Fragment>
            {comment.text}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

export default Comment;
