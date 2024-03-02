import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetPostsForUserQuery } from "../features/posts/postsApiSlice";
import PostUserPage from "../features/posts/PostUserPage.jsx";

const UserProfilePage = () => {
  const {
    data: posts,
    isError,
    isSuccess,
    isLoading,
    error,
    refetch
  } = useGetPostsForUserQuery();

  let content;
  if (isLoading) {
    content = <CircularProgress />;
  } else if (isSuccess) {
    content = posts.map((post) => {
      const startDate = new Date(`${post.createdAt}`);
      const endDate = new Date();
      
      //calculate elapsed time
      let elapsedTimeMinutes = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60
      );
      let elapsedTimeHours = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60
      );
      let elapsedTimeDays = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      );

      //time in chars
      let elapsedTime;
      if (elapsedTimeDays < 1 && elapsedTimeMinutes > 60) {
        elapsedTime = "hr";
      } else if (elapsedTimeHours < 1) {
        elapsedTime = "min";
      } else {
        elapsedTime = "d";
      }
      return (
        <Grid mr={"50px"} sx={{width: "content"}} key={post._id}>
          <PostUserPage
            key={post._id}
            post={post}
          />
        </Grid>
      );
    });
  } else if (isError) {
    console.log(error);
  }
  return (
    <Container sx={{ display: "flex", width: "100%"}}>
      <Box
        sx={{
          // border: "1px solid white",
          minWidth: "content",
          paddingRight: "30px",
        }}
      >
        <Typography variant="h5">User Credentials:</Typography>
        <Typography variant="body1">Username:</Typography>
        <Typography variant="body1">Email:</Typography>
        <Typography variant="body1">das{}</Typography>
      </Box>
      {/* <Box sx={{ border: "1px solid white", width: "auto", display: "grid" }}>
        <Typography variant="h3">Some content</Typography>
      </Box> */}
      <Grid container columns={3} ml={"30px"} sx={{width: "auto", paddingRight:"-400px"}}>
        {content}
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
