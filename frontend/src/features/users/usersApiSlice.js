import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice.js"

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/api/users/allusers",
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformErrorResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "User", id: "LIST" },
            ...result.ids.map((id) => ({ type: "User", id })),
          ];
        } else {
          return [{ type: "User", id: "LIST" }];
        }
      },
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/api/users/register",
        method: "POST",
        body: {
          ...data
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/users/profile",
        method: "PATCH",
        body: {
          ...data
        },
      }),
      invalidatesTags: (result, error, arg) => {
        [{ type: "User", id: arg.id }];
      },
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: "/api/users/profile",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "User", id: arg.id }
      ],
    }),
    getUserProfile: builder.query({
      query: () => ({
        url: "/api/users/profile",
        method: "GET",
        //either pass data through body or using access token
      }),
    }),

  
  }),
});

export const {
  useGetAllUsersQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
  useUpdateUserMutation
} = usersApiSlice;

export const selectUsersResult = usersApiSlice.endpoints.getAllUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState);
