import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRoutes from 'routes';

const theme = createTheme({
    // palette: {
    //     mode: 'dark',
    // }
});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <AppRoutes  data-testid='main-app-routes'/>
        </ThemeProvider>
    );
}

