import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useCurrentUser'

const PrivateRoute = () => {
  const currentUser = useCurrentUser()

  if (!currentUser) {
    return <Navigate to="/auth/login" />
  }
  return <Outlet />
}

export default PrivateRoute
