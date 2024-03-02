import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter();
const initialState = postsAdapter.getInitialState()

export const postsTestApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTestPosts: builder.query({
      query: () => ({
        url: '/api/posts',
        method: 'GET'
      }),
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id
          return post
        })
        return postsAdapter.setAll(initialState, loadedPosts)
      }
    }),
  })
})

export const {useGetAllTestPostsQuery} = postsTestApiSlice

export const selectPostsResult = postsTestApiSlice.endpoints.getAllTestPosts.select()

const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
)

export const {selectAll: selectAllPosts, selectById: selectPostById} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)