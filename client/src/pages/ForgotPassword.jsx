import React, { useState } from 'react';
import {
    Box,
    Button,
    Paper,
    Stack,
    TextField,
    Typography,
    Alert,
    CircularProgress,
    Container
} from '@mui/material';
import { GenerateOTP } from '../services/authService';
import InfoComp from '../components/InfoComp';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            // const data = await ;
            const data = await toast.promise(
                GenerateOTP({ email }), // 1. Pass the raw promise (do NOT await here)
                {
                    loading: (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            Sending OTP...
                        </Typography>
                    ),
                    success: (data) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {data?.message || 'OTP sent successfully!'}
                        </Typography>
                    ),
                    error: (error) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {error?.response?.data?.message || 'Failed to send OTP.'}
                        </Typography>
                    ),
                }
            );
            console.log("OTP response:", data);
            // Redirect to OTP verification with email passed in route state
            navigate('/verify-otp', { state: { email } });
        } catch (err) {
            console.error("Forgot password error:", err);
            setError(err?.response?.data?.message || "Failed to send OTP. Please check your email and try again.");
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

                {/* Forgot Password Card */}
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
                        Reset Password
                    </Typography>

                    <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14, mb: 3 }}>
                        Enter your registered email address and we'll send you an OTP to reset your password.
                    </Typography>

                    {/* Error Alert */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 2, bgcolor: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5' }}>
                            {error}
                        </Alert>
                    )}

                    <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                        <TextField
                            variant="standard"
                            name="email"
                            placeholder="Email address"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (error) setError('');
                            }}
                            fullWidth
                            required
                            sx={inputStyle}
                        />

                        <Button
                            disabled={loading}
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
                            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Send OTP'}
                        </Button>

                        {/* Back to Sign In Link */}
                        <Typography sx={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, mt: 2 }}>
                            Remember your password?{' '}
                            <Link
                                to="/signin"
                                style={{
                                    color: '#FFC107',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                }}
                            >
                                Sign In
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default ForgotPassword;