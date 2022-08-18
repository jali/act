import React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { useForm, FormProvider } from 'react-hook-form';
import RegistrationForm from './form';
import useProfile from 'features/profile/use';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
            Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Registration() {
    const { handleSave, loading, error } = useProfile();
    const form = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            birthday: ''
        }
    });

    const onSubmit = (data) => handleSave(data);
    const onError = (error) => console.log(error);

  return (
    <Container component="main" maxWidth="xs">
      
      {loading && <LinearProgress />}
      {error && <Alert severity="error">{error.data.info}</Alert>}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Complete your Profile
        </Typography>
        <Box   noValidate sx={{ mt: 1 }}>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <RegistrationForm />
            </form>
          </FormProvider>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}