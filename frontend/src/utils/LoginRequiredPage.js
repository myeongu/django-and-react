import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAppContext } from "store";

export default function LoginRequiredPage(props) {
    const location = useLocation();
    const { store: { isAuthenticated } } = useAppContext();

    console.log("isAuthenticated : ", isAuthenticated);

    if ( isAuthenticated ) {
        return <Outlet {...props} />
    } 
    
    return <Navigate to="/accounts/login" state={{ from: location }} />
}