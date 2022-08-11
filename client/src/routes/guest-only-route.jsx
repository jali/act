import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export function getRedirectPath(auth) {
    return auth ? '/' : null;
}

const GuestOnlyRoute = ({ children }) => {
    const location = useLocation();
    
    const data = false;
    console.log('data', data)
    const redirectPath = getRedirectPath(!!data);
    console.log('redirect path', redirectPath)
    return (
        !redirectPath ? (
            children
        ) : (
            <Navigate to={redirectPath}
            state={{ from: location }} 
            replace
            />
        )
    );
};

export default GuestOnlyRoute;