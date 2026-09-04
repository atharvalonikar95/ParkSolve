import React, { useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    Container
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { resetPass } from '../services/authService';
import InfoComp from '../components/InfoComp';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const initialData = {
        password: '',
        confirmPassword: ''
    };

    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || '';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match. Please verify.');
            return;
        }

        try {
            setLoading(true);
            // const data = await ;
            const data = await toast.promise(
                resetPass({ password: formData.password, email }), // 1. Pass the raw promise (do NOT await here)
                {
                    loading: (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            Resetting password...
                        </Typography>
                    ),
                    success: (data) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {data?.message || 'Password reset successfully!'}
                        </Typography>
                    ),
                    error: (error) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {error?.response?.data?.message || 'Failed to reset password.'}
                        </Typography>
                    ),
                }
            );
            console.log("Reset password response:", data);

            if (data.success) {
                setSuccess("Password reset successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate('/signin', { replace: true });
                }, 2000);
            } else {
                setError(data.message || "Failed to reset password. Please try again.");
            }
        } catch (err) {
            console.error("Reset password error:", err);
            setError(err?.response?.data?.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        '& .MuiInputBase-input': {
            color: 'white',
            fontSize: '15px',
        },
        '& .MuiInput-underline:before': {
            borderBottomColor: '#334155',
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#FFC107',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FFC107',
        },
    };

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: 'calc(100vh - 80px)',
                    py: { xs: 4, md: 6 },
                    gap: { xs: 4, md: 8 },
                }}
            >
                {/* Info / Branding Component */}
                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }}>
                    <InfoComp />
                </Box>

                {/* Reset Password Card */}
                <Paper
                    elevation={8}
                    sx={{
                        width: '100%',
                        maxWidth: 420,
                        p: { xs: 3, sm: 4.5 },
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        backgroundImage: `linear-gradient(rgba(11, 15, 26, 0.88), rgba(11, 15, 26, 0.95)), url('/image.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: 4,
                        border: '1px solid #232D42',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: 1,
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                        }}
                    >
                        New Password
                    </Typography>

                    <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14, mb: 3 }}>
                        Create a strong and secure new password for your account.
                    </Typography>

                    {/* Success Alert */}
                    {success && (
                        <Alert severity="success" sx={{ mb: 2.5, bgcolor: 'rgba(34, 197, 94, 0.15)', color: '#86EFAC' }}>
                            {success}
                        </Alert>
                    )}

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2.5, bgcolor: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5' }}>
                            {error}
                        </Alert>
                    )}

                    <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                        {/* New Password Field */}
                        <TextField
                            variant="standard"
                            name="password"
                            placeholder="New password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={inputStyle}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: '#94A3B8', p: 0.5 }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        {/* Confirm Password Field */}
                        <TextField
                            variant="standard"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={inputStyle}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            sx={{ color: '#94A3B8', p: 0.5 }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            disabled={loading || !!success}
                            type="submit"
                            variant="contained"
                            sx={{
                                width: '100%',
                                py: 1.3,
                                mt: 1,
                                color: '#000000',
                                backgroundColor: '#FFC107',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                ':hover': {
                                    backgroundColor: '#FFB300',
                                }
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Update Password'}
                        </Button>

                        {/* Back to Sign In Link */}
                        <Typography sx={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, mt: 1 }}>
                            <Link
                                to="/signin"
                                style={{
                                    color: '#FFC107',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                }}
                            >
                                Back to Sign In
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default ResetPassword;