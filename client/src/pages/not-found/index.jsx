import React from 'react';
import { Box, Card, Link } from '@mui/material';
import Typography from '@mui/material/Typography';

const NotFound = () =>
    <Card>
        <Box align="center" justify="center" data-testid="not-found-element">
            <Typography variant='h1'>Page not found</Typography>
            <Typography variant='h6'>There's nothing here.</Typography>
            <Link href='/' variant='body2'>
                Go to homepage
              </Link>
        </Box>
    </Card>
    ;

  export default NotFound;
