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
import Footer from 'components/layout/footer';
import { useForm, FormProvider } from 'react-hook-form';
import RegisterForm from './form';
import useAuth from 'features/auth/use';

export default function SignUp() {

  const { handleSave, loading, error, success } = useAuth();
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = (data) => handleSave(data);
    const onError = (error) => console.log(error);
  return (
    <>
    {loading && <LinearProgress />}
    <Container component="main" maxWidth="xs">
        {error && <Alert severity="error">{error.data.info}</Alert>}
        {success && <Alert severity="success">{'Your user account has been created successfully.'}</Alert>}
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
          Sign up
        </Typography>
        <Box noValidate sx={{ mt: 3 }}>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                    <RegisterForm />
                </form>
            </FormProvider>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
    </Container>
    </>
  );
}