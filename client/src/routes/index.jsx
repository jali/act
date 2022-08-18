import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './private-route';
import GuestOnlyRoute from './guest-only-route';
import Home from 'pages/home';
import NotFound from 'pages/not-found';
import SignIn from 'pages/login';
import SignUp from 'pages/register';
import Registration from 'pages/registration';
import useAuth from 'features/auth/use';
import useProfile from 'features/profile/use';

export default function AppRoutes() {
    const { data: loggedIn } = useAuth();
    const { success: profileSuccess, data: regIsDone } = useProfile();
    
    return (
        <>
            <Routes>
                <Route 
                    exact path='/' 
                    element={
                        profileSuccess && !regIsDone ? (
                            <Navigate replace to={'/registration'} />
                        ) : (
                            <PrivateRoute>
                                <Home />
                            </PrivateRoute>
                        )
                        } 
                    data-testid='app-route-home'
                />
                <Route 
                    path='/login' 
                    element={
                        <GuestOnlyRoute>
                            <SignIn />
                        </GuestOnlyRoute>
                        } 
                    data-testid='app-route-login'
                />
                <Route 
                    path='/register' 
                    element={
                        <GuestOnlyRoute>
                            <SignUp />
                        </GuestOnlyRoute>
                    }
                    data-testid='app-route-register' 
                />
                <Route 
                    path='/registration' 
                    element={
                        loggedIn ? (
                            <Registration />
                        ) : (
                            <Navigate replace to={'/login'} />
                        )
                        } 
                    data-testid='app-route-registration'
                />
                <Route path='*' element={<NotFound />} data-testid='app-route-not-found' />
            </Routes>
        </>
    );
};
