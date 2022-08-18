import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from 'routes';

const theme = createTheme({
    // palette: {
    //     mode: 'dark',
    // }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AppRoutes  data-testid='main-app-routes'/>
            </Router>
        </ThemeProvider>
    );
}

