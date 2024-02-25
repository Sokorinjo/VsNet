import  store  from "../../app/store";
import { useEffect } from "react";
import { usersApiSlice } from "../users/usersApiSlice";
import { postsApiSlice } from "../posts/postsApiSlice";
import { Outlet } from "react-router-dom";
import Welcome from "../../views/Welcome";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const posts = store.dispatch(postsApiSlice.endpoints.getAllPosts.initiate());
    const users = store.dispatch(usersApiSlice.endpoints.getAllUsers.initiate())

    return () => {
      console.log("unsubscribing");
      users.unsubscribe();
      posts.unsubscribe()
    };
  }, []);
  return <Outlet />
};

export default Prefetch;
