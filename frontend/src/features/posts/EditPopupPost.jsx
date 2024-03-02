//POST DIALOG COMPONENT

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import EditPostPopupForm from "./EditPopupPostForm";
import { Edit } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditPopupPost = ({post}) => {
  const [open, setOpen] = React.useState(false);
  // console.log(post)
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* variant="outlined" */}
      <Button onClick={handleClickOpen}>
        <Edit />
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit your post"}</DialogTitle>
        <DialogContent sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
          {/* <DialogContentText id="alert-dialog-slide-description">
          </DialogContentText> */}
          <EditPostPopupForm
            post={post}
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

export default EditPopupPost;
