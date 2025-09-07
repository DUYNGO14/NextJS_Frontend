'use client';

import {
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { LoginBody, LoginBodyType } from '@/app/common/validation/auth.schema';
import { logo } from '@/app/images';
import { loginAction, makeSelectAuthError, makeSelectAuthIsCalling, makeSelectAuthIsError, makeSelectAuthIsSuccess, makeSelectAuthType } from '@stores/reducers/auth';
import { StyleTextField } from '@components/atom/StyleTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState<number>();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  const router = useRouter();

  //dispatcher selector auth
  const isCalling = useSelector(makeSelectAuthIsCalling);
  const isSuccess = useSelector(makeSelectAuthIsSuccess);
  const isError = useSelector(makeSelectAuthIsError);
  const error = useSelector(makeSelectAuthError);
  const type = useSelector(makeSelectAuthType)

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
  })
  const onSubmit = (data: LoginBodyType) => {
    dispatch(loginAction(data));
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (isSuccess && type === 'login') {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl') || '/home';
      router.push(returnUrl);
    }
  }, [isSuccess, type, router]);
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        px: 2,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          backgroundColor: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >

        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            style={{ display: 'block', margin: '0 auto' }}
          />
        </Box>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            mb: 1,
          }}
        >
          LOG IN
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Don&apos;t have an account?{' '}
          <MuiLink component={Link} href="/auth/register" underline="none">
            Create an account
          </MuiLink>
        </Typography>
        {isError && <Alert severity="error" sx={{ mb: 2 }}>{error || 'Invalid email or password'}.</Alert>}
        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
            autoFocus
            sx={StyleTextField}
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            variant="outlined"
            sx={StyleTextField}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: 'text.secondary' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isCalling}
            sx={{
              py: 1.5,
              mb: 3,
              borderRadius: 1,
              fontWeight: 'bold',
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
              },
            }}
          >
            {isCalling ? 'LOGGING IN...' : 'LOG IN'}
          </Button>
          <MuiLink component={Link} href="/auth/register" underline="none">
            Forgot password?
          </MuiLink>
          <Divider sx={{ my: 2 }} />
        </Box>
        <Box sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
          &copy; {year} Your Company. All rights reserved.
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginForm;