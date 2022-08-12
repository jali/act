import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from 'features/auth/use';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { data } = useAuth();
    const isAuthenticated = !!data;
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