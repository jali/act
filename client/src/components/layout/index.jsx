
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from './header';

export default function Layout({children}) {
    return (
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
    </>
    );
};