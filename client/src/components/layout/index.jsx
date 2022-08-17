import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './header';
import Footer from './footer';
import useAuth from 'features/auth/use';
import useProfile from 'features/profile/use';
import LoadingPage from 'components/loading-page';

export default function Layout({children}) {
  const { loading } = useAuth();
  const { loading: loadingProfile } = useProfile();
    return ( 
        (loading || loadingProfile) ? (
            <LoadingPage/>
        ) : (
            <>
            <Header />
            <main>
                {/* Hero unit */}
                <Box
                sx={{
                    bgcolor: 'background.paper',
                    pt: 8,
                    pb: 6,
                }}
                >
                <Container maxWidth="sm">
                    {children}
                </Container>
                </Box>
            </main>
            <Footer sx={{ mt: 8, mb: 4 }} />
            </>
        )
    );
};