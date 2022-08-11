import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    // const isAuthenticated = useIsAuthenticated();
    const isAuthenticated = false;
    console.log('is authenticated', isAuthenticated)
    return (
        isAuthenticated ? (
            children
        ) : (
            <Navigate to='/login'
            state={{ from: location }} 
            replace
            />
        )
    )
};
export default PrivateRoute;