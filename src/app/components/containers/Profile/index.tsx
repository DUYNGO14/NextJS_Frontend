'use client'
import { UpdateMeBody, UpdateMeBodyType } from '@/app/common/validation/account.schema';
import { accountAction, accountUpdateAction, makeSelectAccount } from '@/app/stores/reducers/account';
import { zodResolver } from '@hookform/resolvers/zod';
import useFormatDate from '@hooks/useFormatDate';
import {
  Cake as CakeIcon,
  Cancel as CancelIcon,
  Edit as EditIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import { Avatar, Box, Button, Chip, CircularProgress, Container, Divider, Grid, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { set } from 'zod';

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const dispatch = useDispatch();
  const formatDate = useFormatDate();
  const { data, isCalling, isError, error, isUpdating, updateSuccess } = useSelector(makeSelectAccount);

  const { control, reset, handleSubmit, formState: { errors, isDirty } } = useForm<UpdateMeBodyType>({
    resolver: zodResolver(UpdateMeBody),
    defaultValues: {
      name: '',
      username: '',
      phone: '',
      gender: null,
      dob: null
    }
  });

  useEffect(() => {
    dispatch(accountAction());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || '',
        username: data.username || '',
        phone: data.phone || '',
        gender: data.gender || '',
        dob: data.dob ? new Date(data.dob) : null
      });
    }
    setIsEditMode(false);
  }, [data, reset]);
  const handleEditToggle = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    // Reset về giá trị từ server
    if (data) {
      reset({
        name: data.name || '',
        username: data.username || '',
        phone: data.phone || '',
        gender: data.gender || '',
        dob: data.dob ? new Date(data.dob) : null
      });
    }
    setIsEditMode(false);
  };

  const handleUpdate = (formData: UpdateMeBodyType) => {
    const updateData = {
      name: formData.name,
      username: formData.username,
      phone: formData.phone,
      gender: formData.gender,
      dob: !formData.dob ? null : formData.dob
    };
    dispatch(accountUpdateAction(updateData));
  };

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography variant="h5">{error}</Typography>
      </Box>
    );
  }

  if (isCalling) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
          {/* Header Section */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 3, sm: 0 }
          }}>
            {/* User Info Section */}
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'left' }
            }}>
              <Avatar
                sx={{
                  width: { xs: 60, sm: 80 },
                  height: { xs: 60, sm: 80 },
                  mr: { xs: 0, sm: 3 },
                  mb: { xs: 2, sm: 0 },
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                  bgcolor: 'primary.main'
                }}
              >
                {data?.name ? data.name.charAt(0).toUpperCase() : 'U'}
              </Avatar>
              <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>
                  {data?.name || 'User'}
                </Typography>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  flexWrap: 'wrap',
                  justifyContent: { xs: 'center', sm: 'flex-start' }
                }}>
                  <Chip
                    icon={<EmailIcon />}
                    label={data?.email || 'No email'}
                    size="small"
                    variant="outlined"
                    sx={{
                      maxWidth: { xs: '200px', sm: 'none' },
                      '& .MuiChip-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }
                    }}
                  />
                  {data?.username && (
                    <Chip
                      icon={<PersonIcon />}
                      label={`@${data.username}`}
                      size="small"
                      variant="outlined"
                    />
                  )}
                </Box>
              </Box>
            </Box>

            {/* Action Buttons Section */}
            <Box sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              width: { xs: '100%', sm: 'auto' },
              maxWidth: { xs: '300px', sm: 'none' }
            }}>
              {!isEditMode ? (
                <Button
                  variant="contained"
                  startIcon={<EditIcon />}
                  onClick={handleEditToggle}
                  size="large"
                >
                  Edit Profile
                </Button>
              ) : (
                <Box sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                  width: { xs: '100%', sm: 'auto' }
                }}>
                  <Button
                    variant="outlined"
                    startIcon={<CancelIcon />}
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={isUpdating ? <CircularProgress size={20} /> : <SaveIcon />}
                    onClick={handleSubmit(handleUpdate)}
                    disabled={!isDirty || isUpdating}
                    size="large"
                    sx={{
                      width: { xs: '100%', sm: 'auto' }
                    }}
                  >
                    {isUpdating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
          <Divider sx={{ mb: 4 }} />

          {/* Profile Form/View */}
          <Box component="form" onSubmit={handleSubmit(handleUpdate)}>
            <Grid container spacing={4}>
              {/* Left Column - Personal Info */}
              <Grid item xs={12} md={6}>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Full Name"
                          disabled={!isEditMode}
                          error={!!errors.name}
                          helperText={errors.name?.message}
                          InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="dob"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Date of Birth"
                          type="date"
                          disabled={!isEditMode}
                          InputLabelProps={{ shrink: true }}
                          value={field.value ? formatDate(field.value.toISOString().split('T')[0]) : ''}
                          onChange={e => field.onChange(e.target.value ? new Date(e.target.value) : null)}
                          error={!!errors.dob}
                          helperText={errors.dob?.message}
                          InputProps={{
                            startAdornment: <CakeIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="gender"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          select
                          label="Gender"
                          InputLabelProps={{ shrink: true }}
                          disabled={!isEditMode}
                          error={!!errors.gender}
                          helperText={errors.gender?.message}
                          value={field.value || ''}
                        >
                          <MenuItem value="">Select Gender</MenuItem>
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </TextField>
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Right Column - Contact Info */}
              <Grid item xs={12} md={6}>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Username"
                          disabled={!isEditMode}
                          error={!!errors.username}
                          helperText={errors.username?.message}
                          InputProps={{
                            startAdornment: <PersonIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={data?.email || 'No email'}
                      disabled
                      InputProps={{
                        startAdornment: <EmailIcon sx={{ mr: 1, color: 'action.active' }} />
                      }}                         
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Phone Number"
                          disabled={!isEditMode}
                          error={!!errors.phone}
                          helperText={errors.phone?.message}
                          InputProps={{
                            startAdornment: <PhoneIcon sx={{ mr: 1, color: 'action.active' }} />
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>

          {/* Read-only view when not in edit mode */}
          {!isEditMode && (
            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Last updated: {new Date().toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default Profile;