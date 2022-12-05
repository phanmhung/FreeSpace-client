import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/useContext';

const LoggedinLayout = ({children}) => {
  const {user} =useAppContext();
  if (!user) return <Navigate to = '/home' />
  return children
}

export default LoggedinLayout;