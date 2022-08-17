import React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import { useForm, FormProvider } from 'react-hook-form';
import Footer from 'components/layout/footer';
import LoginForm from './form';
import useAuth from 'features/auth/use';

export default function SignIn() {
    
    const { handleLogin, loading, error } = useAuth();
    const form = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => handleLogin(data);
    const onError = (error) => console.log(error);

  return (
    <>
    {loading && <LinearProgress />}
    <Container component="main" maxWidth="xs">
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
            Sign in
        </Typography>
            <Box   noValidate sx={{ mt: 1 }}>
                <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <LoginForm />
                </form>
                </FormProvider>
                
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
                <Footer sx={{ mt: 8, mb: 4 }} />
            </Box>
        </Box>
    </Container>
    </>
  );
}