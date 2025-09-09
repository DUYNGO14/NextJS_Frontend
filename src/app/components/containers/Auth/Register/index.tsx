'use client';

import { RegisterBody, RegisterBodyType } from '@/app/common/validation/auth.schema';
import { logo } from '@/app/images';
import { StyleTextField } from '@components/atom/StyleTextField';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Visibility,
  VisibilityOff,
  ArrowBack
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
import { makeSelectAuthError, makeSelectAuthIsCalling, makeSelectAuthIsError, makeSelectAuthIsSuccess, makeSelectAuthType, registerAction, reset } from '@stores/reducers/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
const RegisterForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  //dispatcher selector auth
  const isCalling = useSelector(makeSelectAuthIsCalling);
  const isSuccess = useSelector(makeSelectAuthIsSuccess);
  const isError = useSelector(makeSelectAuthIsError);
  const error = useSelector(makeSelectAuthError);
  const type = useSelector(makeSelectAuthType)

  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterBodyType>({
    resolver: zodResolver(RegisterBody),
  })
  const onSubmit = (data: RegisterBodyType) => {
    dispatch(registerAction(data));
  }
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    dispatch(reset());
  }, [])

  useEffect(() => {
    if (isSuccess && !isCalling) {
      router.push('/auth/login');
    }
  }, [isCalling, isSuccess, router]);

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
          maxWidth: { sm: 400, md: 450 },
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
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#333',
            mb: 1,
          }}
        >
          CREATE AN ACCOUNT
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Already have an account?
          <MuiLink component={Link} href="/auth/login">
            Log in
          </MuiLink>
        </Typography>
        {type === 'register' && isError && <Alert severity="error" sx={{ mb: 2 }}>{error || 'Something went wrong'}.</Alert>}
        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Name"
            type="text"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            variant="outlined"
            autoFocus
            sx={StyleTextField}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            variant="outlined"
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
          <TextField
            label="Confirm Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
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
          <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isCalling}
            >
              {isCalling ? 'Registering...' : 'REGISTER'}
            </Button>
            <Button
              startIcon={<ArrowBack />}
              type="submit"
              fullWidth
              variant="outlined"
              disabled={isCalling}
              onClick={()=> window.history.back()}
            >
              Back
            </Button>
          </Box>

          <Divider sx={{ my: 2 }} />
        </Box>
        <Box sx={{ mt: 3, textAlign: 'center', color: 'text.secondary', fontSize: '0.875rem' }}>
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </Box>
      </Paper>
    </Box>
  );
};

export default RegisterForm;