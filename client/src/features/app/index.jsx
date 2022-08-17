import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
            <AppRoutes  data-testid='main-app-routes'/>
        </ThemeProvider>
    );
}

