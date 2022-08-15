import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from 'features/auth/use';

export function getRedirectPath(auth) {
    return auth ? '/' : null;
}

const GuestOnlyRoute = ({ children }) => {
    const location = useLocation();
    const { data } = useAuth();
    const redirectPath = getRedirectPath(!!data);
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