import React from 'react'
import { Outlet } from 'react-router-dom'

import { useCurrentUser } from '../hooks/useCurrentUser'

const PublicRoute = () => {
  const currentUser = useCurrentUser()

  console.log(currentUser)
  return <Outlet />
}

export default PublicRoute
