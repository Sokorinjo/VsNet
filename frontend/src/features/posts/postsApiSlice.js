import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({});
const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query:() => ({
        url: '/api/posts',
        method:"GET"
      }),
      validatesStatus: (response, result ) =>{
        return response.status === 2 && !result.isError;
      },
      transformErrorResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => {
        if(result?.ids){
          return [
            {type: 'Post', id: 'LIST'},
            ...result.ids.map(id => ({type:'Post', id:arg.id}))
          ]
        }else return [{type: 'Post', id: 'List'}]
      }
    }),

    addNewPost: builder.mutation({
      query: (data) => ({
        url: "/api/posts",
        method: 'POST',
        body: {
          ...data
        }
      }),
      invalidatesTags: [{type: 'Post', id: 'List'}]
    }),

    updatePost: builder.mutation({
      query: (data) => ({
        url: '/api/posts',
        method: 'PATCH',
        body: {
          ...data
        }
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.id}
      ]
    }),

    deletePost: builder.mutation({
      query: ({id}) => ({
        url: '/api/posts',
        method: 'DELETE',
        body: {id}
      }),
      invalidatesTags: (result, error, arg) => [
        {type: 'Post', id: arg.id}
      ]
    })
  }),
});

export const {
  useGetAllPostsQuery,
  useAddNewPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation
}=postsApiSlice

export const selectPostsResult = postsApiSlice.endpoints.getAllPosts.select()

const selectPostsData = createSelector(
  selectPostsResult,
  postsResult => postsResult.data
)

export const {
  selectAll: selectAllPosts,
  selectById: selectPostsById,
  selectIds: selectPostsIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)