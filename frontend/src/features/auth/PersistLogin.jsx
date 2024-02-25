import {Outlet, Link, useNavigate, Navigate} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import {useRefreshMutation} from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector} from 'react-redux'
import { selectCurrenToken } from './authSlice'
import { copyWithStructuralSharing } from '@reduxjs/toolkit/dist/query'
import { LinearProgress } from '@mui/material'
import Welcome from '../../views/Welcome'

const PersistLogin = () => {

  const [persist] = usePersist()

  const token = useSelector(selectCurrenToken)

  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  // const navigate = useNavigate()

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()
  
  useEffect(() => {
    if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async() => {
        console.log('verifying refresh token')
        try{

          // const response = 
          await refresh()

          //const {accessToken} = response.data
          setTrueSuccess(true)
          //setTrueSuccess provides an extra bit of time for refresH()
        }catch(err){
          console.log(err)
        }
      }
      if(!token && persist) {
        verifyRefreshToken()
      }
    }
  return () => effectRan.current = true

  //eslint-disable-next-line
  }, [])

  let content
  if (!persist) { // persist: no
      console.log('no persist')
      content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
      console.log('loading')
      content = <LinearProgress />
  } else if (isError) { //persist: yes, token: no
      console.log('error')
      content = (
          // <p className='errmsg'>
          //     {`${error?.data?.message} - `}
          //     <Link to="/login">Please login again</Link>.
          // </p>
          <Navigate to='/login'/>
      )
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
      console.log('success')
      content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
      console.log('token and uninit')
      console.log(isUninitialized)
      content = <Outlet />
  }

  return content
}

export default PersistLogin