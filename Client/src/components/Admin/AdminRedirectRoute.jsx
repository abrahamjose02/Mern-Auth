import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function AdminRedirectRoute({children}) {
    const {adminUser} = useSelector(state=>state.admin)
  return adminUser ? <Navigate to="/admin/dashboard"/> : children
}

export default AdminRedirectRoute
