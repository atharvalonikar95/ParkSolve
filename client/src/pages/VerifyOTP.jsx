import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Paper,
    Stack,
    Typography,
    Alert,
    CircularProgress,
    Container
} from '@mui/material';
import { VerifyCode, GenerateOTP } from '../services/authService';
import InfoComp from '../components/InfoComp';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import OTP from '../components/OTP';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email || '';

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState('');
    const [resendTimer, setResendTimer] = useState(30);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!otp || otp.length < 4) {
            setError('Please enter the complete 4-digit OTP.');
            return;
        }

        try {
            setLoading(true);
            const data = await toast.promise(
                VerifyCode({ email, otp }), // 1. Pass the raw promise (do NOT await here)
                {
                    loading: (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            Verifying OTP...
                        </Typography>
                    ),
                    success: (data) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {data?.message || 'OTP verified successfully!'}
                        </Typography>
                    ),
                    error: (error) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {error?.response?.data?.message || 'Failed to verify OTP.'}
                        </Typography>
                    ),
                }
            );
            console.log("Verify response:", data);

            if (data.success) {
                navigate('/reset-password', { state: { email } });
            } else {
                setError(data.message || "Invalid or expired OTP. Please try again.");
            }
        } catch (err) {
            console.error("Verification error:", err);
            setError(err?.response?.data?.message || "Failed to verify OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        try {
            setResending(true);
            setError('');
            await GenerateOTP({ email });
            toast.success(
                <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                    OTP resent successfully!
                </Typography>
            );
            setResendTimer(30);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to resend OTP. Please try again.");
        } finally {
            setResending(false);
        }
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

                {/* OTP Card */}
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
                        Verify OTP
                    </Typography>

                    <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14, mb: 3 }}>
                        Enter the verification code sent to your email.
                    </Typography>

                    {/* Email Display Badge */}
                    <Box
                        sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.04)',
                            p: 1.5,
                            borderRadius: 2,
                            border: '1px solid #232D42',
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >
                        <Typography sx={{ color: '#94A3B8', fontSize: 12 }}>Code sent to</Typography>
                        <Typography sx={{ color: '#FFC107', fontWeight: 'bold', fontSize: 15 }}>
                            {email || 'your registered email'}
                        </Typography>
                    </Box>

                    {/* Error Banner */}
                    {error && (
                        <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(239, 68, 68, 0.15)', color: '#FCA5A5' }}>
                            {error}
                        </Alert>
                    )}

                    <Stack component="form" onSubmit={handleSubmit} spacing={3} alignItems="center">
                        {/* OTP Input Component */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <OTP
                                separator={<span>-</span>}
                                value={otp}
                                onChange={(val) => {
                                    setOtp(val);
                                    if (error) setError('');
                                }}
                                length={4}
                                required={true}
                            />
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
                            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'Verify Code'}
                        </Button>

                        {/* Resend OTP Section */}
                        <Box sx={{ textAlign: 'center', mt: 1 }}>
                            {resendTimer > 0 ? (
                                <Typography sx={{ color: '#94A3B8', fontSize: 13 }}>
                                    Resend code in <b style={{ color: '#FFC107' }}>{resendTimer}s</b>
                                </Typography>
                            ) : (
                                <Button
                                    variant="text"
                                    disabled={resending}
                                    onClick={handleResendOTP}
                                    sx={{ color: '#FFC107', fontSize: 13, textTransform: 'none' }}
                                >
                                    {resending ? 'Sending...' : "Didn't receive code? Resend OTP"}
                                </Button>
                            )}
                        </Box>

                        {/* Back to Sign In Link */}
                        <Typography sx={{ textAlign: 'center', color: '#94A3B8', fontSize: 14 }}>
                            <Link
                                to="/signin"
                                style={{
                                    color: '#94A3B8',
                                    textDecoration: 'none'
                                }}
                            >
                                ← Back to Sign In
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Box>
        </Container>
    );
};

export default VerifyOTP;