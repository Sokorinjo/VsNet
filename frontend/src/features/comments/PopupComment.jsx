import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { ChatBubbleOutline, ChatBubble } from "@mui/icons-material";
import { Box, ListItem, ListItemText, Typography, List } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

//Component imports
import PopupCommentForm from "./PopupCommentForm";
import Comment from "./Comment";
//RTK Query
import { useGetPostCommentsQuery } from "./commentsApiSlice";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupComment = ({ postId }) => {
  const [open, setOpen] = React.useState(false);

  const {
    data: comments = [],
    isSuccess,
    isError,
    isLoading,
    error,
  } = useGetPostCommentsQuery(postId);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderedComments = comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ));

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {/* <ChatBubbleIcon /> */}
        <ChatBubbleOutline />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Comments"}</DialogTitle>
        <List>{renderedComments}</List>
        <DialogContent sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
          {/* <DialogContentText id="alert-dialog-slide-description">
        </DialogContentText> */}
          <PopupCommentForm
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            postId={postId}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose}>Agree</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupComment;
