import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Layout from 'components/layout';


const Home = () => {
    return (
        <>  
            <Layout>
            <Box sx={{ mt: 1 }}>
                <Link to='/login'>can you go to login page which is a guest only route?</Link>
            </Box>
            <Box sx={{ mt: 1 }}>
                <Link to='/register'>can you go to register page which is a guest only route?</Link>
            </Box>
            </Layout>
        </>
    )
    
};

export default Home;