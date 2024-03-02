import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Delete } from "@mui/icons-material";
import { useDeletePostMutation } from "./postsApiSlice";
import { toast } from "react-toastify";

const DeletePost = ({postId}) => {
  const [open, setOpen] = React.useState(false);

  const [deletePost, {isSuccess}] = useDeletePostMutation()

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = async() => {
    setOpen(false)
    try{
      await deletePost({id: postId})
      toast.success("Post successfully deleted!")
    }catch(err){
      toast.error(err?.data?.message || err.error)
    }
  }
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <Delete />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this post? There is no going back
            once you do!!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeletePost;
