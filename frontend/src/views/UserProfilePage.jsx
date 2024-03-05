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
import { useGetUserProfileQuery } from "../features/users/usersApiSlice.js";
import PostUserPage from "../features/posts/PostUserPage.jsx";

const UserProfilePage = () => {
  const {
    data: posts,
    isError: isPostsError,
    isSuccess: isPostsSuccess,
    isLoading: isPostsLoading,
    error: postsError,
    refetch,
  } = useGetPostsForUserQuery();

  const {
    data: user,
    isLoading: isUserLoading,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUserProfileQuery();

  let userData;
  if (isUserSuccess) {
    const userJoinedDate = new Date(user.createdAt);

    userData = (
      <Box
        sx={{
          minWidth: "content",
          paddingRight: "30px",
        }}
      >
        <Typography variant="h5" mb={"10px"} borderBottom={"1px solid gray"}>
          User Details:
        </Typography>
        <Typography variant="body1" >
          <b>Username:</b> {user.username}
        </Typography>
        <Typography variant="body1" >
          <b>Email:</b> {user.email}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          Member since: {`${userJoinedDate.getDate()}.${userJoinedDate.getMonth()}.${userJoinedDate.getFullYear()}`}
        </Typography>

        <Link to={"/edit-profile"}>
          <Button variant="contained">Edit</Button>
        </Link>
      </Box>
    );
  } else if (isUserError) {
    console.log(userError);
  }

  let content;
  if (isPostsLoading) {
    content = <CircularProgress />;
  } else if (isPostsSuccess) {
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
        <Grid mr={"50px"} sx={{ width: "content" }} key={post._id}>
          <PostUserPage key={post._id} post={post} />
        </Grid>
      );
    });
  } else if (isPostsError) {
    console.log(error);
  }

  return (
    <Container sx={{ display: "flex", width: "100%" }}>
      {userData}
      <Grid
        container
        columns={3}
        ml={"30px"}
        sx={{ width: "auto", paddingRight: "-400px" }}
      >
        {content}
      </Grid>
    </Container>
  );
};

export default UserProfilePage;
