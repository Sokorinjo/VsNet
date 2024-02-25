import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'


const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: 'include',
  prepareHeaders: (headers, {getState}) => {
    const token = getState().auth.token

    if(token){
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithReauth = async(args, api, extraOptions) => {
  //console.log(args) //request url, method, body
  //console.log(api) //signal, dispatch, getState()
  //console.log(extraOptions) // custom like {shout: true}
  let result = await baseQuery(args, api, extraOptions)
  if(result.error && result.error.status === 403){
    //try to get a new token
    const refreshResult = await baseQuery('/api/users/refresh', api, extraOptions)
    if(refreshResult?.data){
      //store the new token in state
      api.dispatch(setCredentials({...refreshResult.data}))
      console.log(refreshResult.data)


      //retry original query with new access token
      result = await baseQuery(args, api, extraOptions)
    }else{

      if(refreshResult?.error?.status === 403){
        refreshResult.error.data.message = 'Your login has expired.'
      }
      return refreshResult
    }
  }
  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Post', 'Comment'],
  endpoints: builder=> ({})
})