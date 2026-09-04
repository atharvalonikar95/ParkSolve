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
import { Login } from '../services/authService';
import { useAuth } from '../context/AuthProvider';
import InfoComp from '../components/InfoComp';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignIn = () => {
    const initialData = {
        email: '',
        password: ''
    };

    const [formData, setFormData] = useState(initialData);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            setLoading(true);
            const data = await Login(formData);
            console.log("Login response:", data);

            if (data.success) {
                // Update Auth context immediately if user data returned
                if (setUser && data.user) {
                    setUser(data.user)
                    toast.success(
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', justifyItems: 'center', fontSize: 14, }}>{data.message}</Typography>,
                    );
                }
                navigate('/home/profile', { replace: true });
            } else {
                setError(data.message || "Invalid email or password. Please try again.");
            }
        } catch (err) {
            console.error("Login error:", err);
            const errMsg =err?.response?.data?.message || "Failed to sign in. Please try again."
            setError(errMsg);
            toast.error(
                <Typography sx={{ color: '#94A3B8', textAlign: 'center', justifyItems: 'center', fontSize: 14, }}>{errMsg }</Typography>,
            );
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
                {/* Information / Branding Component */}
                <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', justifyContent: 'center' }}>
                    <InfoComp />
                </Box>

                {/* Login Form Card */}
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
                        Sign In
                    </Typography>

                    <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14, mb: 3 }}>
                        Welcome back! Please enter your details.
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
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            sx={inputStyle}
                        />

                        <TextField
                            variant="standard"
                            name="password"
                            placeholder="Password"
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

                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: -1 }}>
                            <Typography
                                component={Link}
                                to="/forgot-password"
                                sx={{
                                    color: '#FFC107',
                                    fontSize: 13,
                                    textDecoration: 'none',
                                    ':hover': { textDecoration: 'underline' }
                                }}
                            >
                                Forgot password?
                            </Typography>
                        </Box>

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
                            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Sign In'}
                        </Button>

                        {/* Sign Up Redirect */}
                        <Typography sx={{ textAlign: 'center', color: '#94A3B8', fontSize: 14, mt: 2 }}>
                            Don't have an account?{' '}
                            <Link
                                to="/signup"
                                style={{
                                    color: '#FFC107',
                                    fontWeight: 'bold',
                                    textDecoration: 'none'
                                }}
                            >
                                Sign Up
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default SignIn;