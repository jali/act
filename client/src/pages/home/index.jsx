import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Layout from 'components/layout';
import useAuth from 'features/auth/use';

const Home = () => {
    const { loading } = useAuth();
    return (
        <>  
            <Layout/>
            {loading && <i>loading...</i>}
            
            <Box sx={{ mt: 1 }}>
                <Link to='/login'>can you go to login page which is a guest only route?</Link>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Link to='/register'>can you go to register page which is a guest only route?</Link>
            </Box>
            
        </>
    )
    
};

export default Home;