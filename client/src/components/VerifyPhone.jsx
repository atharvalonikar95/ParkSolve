import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container,
    Stack,
    CircularProgress,
    Alert,
    InputAdornment,
    IconButton
} from '@mui/material';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { setPh } from '../services/userService'; // Add your verifyOtp service if you have one

const VerifyPhone = () => {
    const navigate = useNavigate();
    const { user, setUser } = useAuth();

    const [phone, setPhone] = useState(user?.phone || '');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1); // 1 = Phone Input, 2 = OTP Input
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(0);

    // Resend countdown timer
    useEffect(() => {
        let interval;
        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [resendTimer]);

    // 1. Send OTP to Phone
    const handleSendOTP = async (e) => {
        e?.preventDefault();
        setError('');

        if (!phone || phone.length < 10) {
            setError('Please enter a valid 10-digit phone number');
            return;
        }

        try {
            setLoading(true);
            const res = await setPh(phone);
            console.log("OTP sent response:", res);

            setStep(2);
            setResendTimer(30); // 30-second cooldown for resending
        } catch (err) {
            setError(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // 2. Verify OTP
    const handleVerifyOTP = async (e) => {
        e?.preventDefault();
        setError('');

        if (!otp || otp.length < 4) {
            setError('Please enter the valid OTP');
            return;
        }

        try {
            setLoading(true);
            // Replace with your verify OTP API call:
            // const res = await verifyPhoneOtp({ phone, otp });
            
            console.log("OTP verification submitted:", otp);

            // Update Auth State if verified
            if (setUser) {
                setUser((prev) => ({
                    ...prev,
                    phone: phone,
                    isPhoneVerified: true,
                }));
            }

            // Redirect to profile or home page
            navigate('/profile');
        } catch (err) {
            setError(err?.response?.data?.message || 'Invalid or expired OTP. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const BtnStyle = {
        backgroundColor: '#FFC107',
        color: '#000000',
        fontWeight: 'bold',
        py: 1.2,
        borderRadius: 2,
        ':hover': {
            backgroundColor: '#FFB300',
            color: '#000000',
        },
    };

    const inputStyles = {
        '& .MuiOutlinedInput-root': {
            color: '#FFFFFF',
            backgroundColor: '#0B0F1A',
            borderRadius: 2,
            '& fieldset': {
                borderColor: '#232D42',
            },
            '&:hover fieldset': {
                borderColor: '#FFC107',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FFC107',
            },
        },
        '& .MuiInputLabel-root': {
            color: '#94A3B8',
            '&.Mui-focused': {
                color: '#FFC107',
            },
        },
    };

    return (
        <Container maxWidth="xs" sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', py: 4 }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    p: { xs: 3, sm: 4 },
                    bgcolor: '#131A2B',
                    color: '#FFFFFF',
                    borderRadius: 4,
                    border: '1px solid #232D42',
                    textAlign: 'center',
                }}
            >
                {/* Icon Header */}
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        bgcolor: 'rgba(255, 193, 7, 0.1)',
                        color: '#FFC107',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                    }}
                >
                    {step === 1 ? <PhoneAndroidIcon sx={{ fontSize: 32 }} /> : <VerifiedUserIcon sx={{ fontSize: 32 }} />}
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {step === 1 ? 'Verify Phone Number' : 'Enter Verification Code'}
                </Typography>

                <Typography sx={{ color: '#94A3B8', fontSize: 14, mb: 3 }}>
                    {step === 1
                        ? 'We will send a one-time verification code (OTP) to your mobile number.'
                        : `Enter the code sent to +91 ${phone}`}
                </Typography>

                {/* Error Banner */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2, bgcolor: '#451a1a', color: '#ff8080' }}>
                        {error}
                    </Alert>
                )}

                {/* STEP 1: Phone Number Form */}
                {step === 1 && (
                    <Box component="form" onSubmit={handleSendOTP}>
                        <Stack spacing={2.5}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="9876543210"
                                type="tel"
                                required
                                sx={inputStyles}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography sx={{ color: '#94A3B8', fontWeight: 'bold' }}>
                                                +91
                                            </Typography>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                fullWidth
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                sx={BtnStyle}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Get OTP'}
                            </Button>
                        </Stack>
                    </Box>
                )}

                {/* STEP 2: OTP Verification Form */}
                {step === 2 && (
                    <Box component="form" onSubmit={handleVerifyOTP}>
                        <Stack spacing={2.5}>
                            {/* Phone number preview with edit button */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 1,
                                    bgcolor: '#0B0F1A',
                                    py: 1,
                                    px: 2,
                                    borderRadius: 2,
                                    border: '1px solid #232D42',
                                }}
                            >
                                <Typography sx={{ color: '#E2E8F0', fontSize: 14 }}>
                                    +91 {phone}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={() => {
                                        setStep(1);
                                        setOtp('');
                                        setError('');
                                    }}
                                    sx={{ color: '#FFC107', p: 0.5 }}
                                >
                                    <EditIcon sx={{ fontSize: 16 }} />
                                </IconButton>
                            </Box>

                            <TextField
                                fullWidth
                                label="Enter OTP"
                                name="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)} // 👈 FIXED: setOtp instead of setPhone
                                placeholder="• • • •"
                                required
                                sx={{
                                    ...inputStyles,
                                    '& input': {
                                        textAlign: 'center',
                                        letterSpacing: '8px',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                    },
                                }}
                                inputProps={{ maxLength: 6 }}
                            />

                            <Button
                                fullWidth
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                sx={BtnStyle}
                            >
                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Proceed'}
                            </Button>

                            {/* Resend Code Button & Countdown */}
                            <Box sx={{ mt: 1 }}>
                                {resendTimer > 0 ? (
                                    <Typography sx={{ color: '#94A3B8', fontSize: 13 }}>
                                        Resend code in <b style={{ color: '#FFC107' }}>{resendTimer}s</b>
                                    </Typography>
                                ) : (
                                    <Button
                                        variant="text"
                                        disabled={loading}
                                        onClick={handleSendOTP}
                                        sx={{ color: '#FFC107', fontSize: 13, textTransform: 'none' }}
                                    >
                                        Didn't receive the code? Resend OTP
                                    </Button>
                                )}
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    );
};

export default VerifyPhone;