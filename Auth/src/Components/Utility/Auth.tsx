import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const Auth = () => {
     const [IsLoggedIn, setIsLoggedIn] = useState(false);
  return IsLoggedIn ? <Outlet/> : <Navigate to="/"/>
}

export default Auth