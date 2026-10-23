import React, { useContext } from 'react'
import { AuthContext } from '../state/AuthContext'
import { Navigate, Outlet } from 'react-router'

const PublicRoutes = () => {
    const {user,isLoading} = useContext(AuthContext)
  if(isLoading){
    return <h1>Loading data, please wait....</h1>
  }
  if(user){
    return <Navigate to="/home" replace/>
  }
  return <Outlet/>
}

export default PublicRoutes