import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RedirectRoute({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/profile" /> : children;
}

export default RedirectRoute;
