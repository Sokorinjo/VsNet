import { apiSlice } from "../../app/api/apiSlice";
import { logout, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/api/users/login",
        method: "POST",
        body: {
          ...credentials,
        },
      }),
    }),

    sendLogout: builder.mutation({
      query: () => ({
        url: '/api/users/logout',
        method: 'POST'
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try{
          const {data} = await queryFulfilled
          console.log(data)
          dispatch(logout())
          setTimeout(()=> {
            dispatch(apiSlice.util.resetApiState())
          }, 1000)
        }catch(err){
          console.log(err)
        }
      }
    }),

    refresh: builder.mutation({
      query: () => ({
        url: '/api/users/refresh',
        method: 'GET'
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
        try{
          const {data} = await queryFulfilled
          console.log(data)
          const {accessToken} = data
          dispatch(setCredentials({accessToken}))
        }catch(err){
          console.log(err)
        }
      }
    })
  }),
});

export const {
  useLoginMutation,
  useSendLogoutMutation,
  useRefreshMutation
} = authApiSlice