import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { Aggregate } from "mongoose";

// const postsAdapter = createEntityAdapter({});
// const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: () => ({
        url: "/api/posts",
        method: "GET",
      }),
      // validatesStatus: (response, result) => {
      //   return response.status === 200 && !result.isError;
      // },
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return loadedPosts
        // return postsAdapter.setAll(initialState, loadedPosts);
      },
      // providesTags: (result, error, arg) => {
      //   if (result?.ids) {
      //     return [
      //       { type: "Post", id: "LIST" },
      //       ...result.ids.map((id) => ({ type: "Post", id })),
      //     ];
      //   } else return [{ type: "Post", id: "List" }];
      // },
      providesTags: (result, error, arg) => 
      result 
      ? [
        ...result.map(({id}) => ({type: 'Post', id})),
        {type: 'Post', id: 'List'}
      ]: [{type: 'Post', id:'List'}]
    }),
    getPostsForUser: builder.query({
      query: () => ({
        url: "/api/posts/user-posts",
        method: "GET",
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return loadedPosts
        
      },
      // providesTags: [{ type: "Post", id: "List" }],
      providesTags: (result) => (
        result 
        ? [
          ...result.map(({id}) => ({type: 'Post', id})),
          {type: 'Post', id: 'User List'}
        ]: [{type: 'Post', id:'User List'}]
      )
    }),

    addNewPost: builder.mutation({
      query: (data) => ({
        url: "/api/posts",
        method: "POST",
        body: {
          ...data,
        },
      }),
      invalidatesTags: [{ type: "Post", id: "List" }],
    }),

    updatePost: builder.mutation({
      query: (data) => ({
        url: "/api/posts",
        method: "PATCH",
        body: {
          ...data
        },
      }),
      invalidatesTags:(result,error, arg) => [{type: 'Post', id:arg.postId}]
    }),

    deletePost: builder.mutation({
      query: (data) => ({
        url: "/api/posts",
        method: "DELETE",
        body: {
          ...data
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),

    addLikeToPost: builder.mutation({
      query: (data) => ({
        url: "/api/posts/add-like",
        method: "PATCH", 
        body: {
          ...data
        }
      }),
      invalidatesTags: (result, error, arg) => [{type: 'Post', id: arg.postId}]
    })
  }),
});

export const {
  useGetAllPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetPostsForUserQuery,
  useAddLikeToPostMutation
} = postsApiSlice;

// export const selectPostsResult = postsApiSlice.endpoints.getAllPosts.select()

// const selectPostsData = createSelector(
//   selectPostsResult,
//   postsResult => postsResult.data
// )

// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostsById,
//   selectIds: selectPostsIds
// } = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
