//POST DIALOG COMPONENT


import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import PostPopupForm from "./PopupPostForm";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopupPost = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{marginBottom: "20px"}}>
      <Button variant="outlined" onClick={handleClickOpen} >
        <AddIcon /> New Post
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add new post"}</DialogTitle>
        <DialogContent sx={{paddingLeft: "8px", paddingRight: "8px"}}>
          {/* <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText> */}
          <PostPopupForm
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
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

export default PopupPost;
