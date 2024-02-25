import React from "react";
import Header from "../components/Header";
import Button from "@mui/material/Button";

import {
  Box,
  Container,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useGetAllUsersQuery } from "../features/users/usersApiSlice.js";
import { useGetAllPostsQuery } from "../features/posts/postsApiSlice.js";
import { useSelector } from "react-redux";
import Post from "../features/posts/Post.jsx";
import PopupPost from "../features/posts/PopupPost";

const HomePage = () => {
  

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

  let content;
  if (isPostsLoading) {
    content = <LinearProgress />;
  } else if (isPostsError) {
    console.log(postsError);
  } else if (isPostsSuccess) {
    content = posts.allPosts.map((post) => {
      const startDate = new Date(`${post.createdAt}`);
      const endDate = new Date();
      let elapsedTimeMinutes = Math.floor((endDate.getTime() - startDate.getTime())/1000/60);
      let elapsedTimeHours = Math.floor((endDate.getTime() - startDate.getTime())/1000/60/60);
      let elapsedTimeDays = Math.floor((endDate.getTime() - startDate.getTime())/1000/60/60/24);
      if(elapsedTimeDays < 1 && elapsedTimeMinutes > 60) {
        
        return <Post key={post._id} postId={post._id} user={post.user} title={post.title} text={post.text} time={'hr'} createdAt={elapsedTimeHours} />;
      }else if(elapsedTimeHours < 1){
        
        return <Post key={post._id} postId={post._id} user={post.user} title={post.title} text={post.text} time={'min'} createdAt={elapsedTimeMinutes} />;
      }else{
        
        return <Post key={post._id} postId={post._id} user={post.user} title={post.title} text={post.text} time={'d'} createdAt={elapsedTimeDays} />;
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
