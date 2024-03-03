import React, { useEffect } from "react";
import {
  Box,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import bcrypt from "bcrypt"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import { selectAllPosts, selectPostsById, selectPostsIds } from "../features/posts/postsApiSlice.js";
import { useGetAllPostsQuery } from "../features/posts/postsApiSlice.js";
import { selectCurrenToken } from "../features/auth/authSlice.js";
//Components
import Post from "../features/posts/Post.jsx";
import PopupPost from "../features/posts/PopupPost";
import ErrorPage from "./ErrorPage.jsx";

const HomePage = () => {

  const user = useSelector((state) => state.auth.token)

  useEffect(() => {
    console.log(user)
  },[])
  
  const {
    data: posts,
    isError: isPostsError,
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading,
    error: postsError,
  } = useGetAllPostsQuery("postsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  // const postsIds = useSelector(selectPostsIds)
  // const postsById = useSelector(selectPostsById)
  
  
  
  let content;
  if (isPostsLoading) {
    content = <LinearProgress />;
  } else if (isPostsError) {
    console.log(postsError);
  } else if (isPostsSuccess) {
    
    content = posts.map((post) => {
      const startDate = new Date(`${post.createdAt}`);
      const endDate = new Date();
      let elapsedTimeMinutes = Math.floor((endDate.getTime() - startDate.getTime())/1000/60);
      let elapsedTimeHours = Math.floor((endDate.getTime() - startDate.getTime())/1000/60/60);
      let elapsedTimeDays = Math.floor((endDate.getTime() - startDate.getTime())/1000/60/60/24);
      if(elapsedTimeDays < 1 && elapsedTimeMinutes > 60) {
        
        return <Post key={post._id} post={post} postId={post._id} user={post.user} title={post.title} text={post.text} time={'hr'} createdAt={elapsedTimeHours} />;
      }else if(elapsedTimeHours < 1){
        
        return <Post key={post._id} post={post} postId={post._id} user={post.user} title={post.title} text={post.text} time={'min'} createdAt={elapsedTimeMinutes} />;
      }else{
        
        return <Post key={post._id} post={post} postId={post._id} user={post.user} title={post.title} text={post.text} time={'d'} createdAt={elapsedTimeDays} />;
      }

    });
  }
  return (
    <>
      <Container>
        <PopupPost />
        {content}
      </Container>
    </>
  );
};

export default HomePage;
