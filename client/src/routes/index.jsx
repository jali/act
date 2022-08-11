import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './private-route';
import GuestOnlyRoute from './guest-only-route';
import Home from 'pages/home';
import NotFound from 'pages/not-found';
import SignIn from 'pages/login';
import SignUp from 'pages/register';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route 
                    exact path='/' 
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
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
                <Route path='*' element={<NotFound />} data-testid='app-route-not-found' />
            </Routes>
        </Router>
    );
};
