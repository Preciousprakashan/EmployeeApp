import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = () => {
    const token=localStorage.getItem('token');
    let verifyUser=false
    if(token){
        verifyUser=true;
    }
    return (
        verifyUser?<Outlet/>:<Navigate to={'/'}/>
    )
}

