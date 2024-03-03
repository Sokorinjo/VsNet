import {
  ThumbUpOutlined,
  ThumbUpAltOutlined,
  ThumbUp,
} from "@mui/icons-material";
import { useAddLikeToPostMutation } from "./postsApiSlice";
import { toast } from "react-toastify";
import { useDeferredValue, useEffect, useState } from "react";

const LikePostButton = ({ post, postId, userId, handleLikeIcon }) => {
  const [likePost, { isSuccess }] = useAddLikeToPostMutation();


  
  const handleLike = async () => {
    try {
      await likePost({ postId, userId }).unwrap();
      toast.success("Liked Post!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  
  return <>Like</>;
};

export default LikePostButton;
