import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import Layout from 'components/layout';
import useProfile from 'features/profile/use';

const Profile = () => {
    const { data, loading, error } = useProfile();
    return (
        <>  
            <Layout>
            {loading && <LinearProgress />}
            {error && <Alert severity="error">{error.data.info}</Alert>}
            Profile
            {data && 
            <div>welcome <b> {data.firstname} {data.lastname}</b></div>
            }
            
            </Layout>
        </>
    )
    
};

export default Profile;