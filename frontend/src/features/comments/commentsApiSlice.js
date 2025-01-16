import { apiSlice } from "../../app/api/apiSlice";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

export const commentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostComments: builder.query({
      query: (postId) => ({
        url: `/api/comments/${postId}`,
        method: "GET",
      }),
      providesTags: ['Comment']
    }),
    addPostComment: builder.mutation({
      query: (data) => ({
        url: `/api/comments`,
        method: "POST",
        body: {
         ...data
        },
      }),
      invalidatesTags: ['Comment']
    }),
    deletePostComments: builder.mutation({
      query:(data) => ({
        url: "/api/comments",
        method: "DELETE",
        body: {
          ...data
        }
      })
    })
  }),
});

export const { useGetPostCommentsQuery, useAddPostCommentMutation, useDeletePostCommentsMutation } =
  commentsApiSlice;
