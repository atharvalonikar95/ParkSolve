import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Paper,
    Grid,
    Divider,
    // Button,
    CircularProgress,
    Container,
    Stack
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import QrCode2Icon from '@mui/icons-material/QrCode2';
// import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const Profile = () => {
    const navigate = useNavigate();
    const { user, loading } = useAuth();

    // Proper navigation inside useEffect to prevent render warnings
    useEffect(() => {
        if (!loading && !user) {
            navigate('/login', { replace: true });
        }
    }, [user, loading, navigate]);

    if (loading || !user) {
        return (
            <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#FFC107' }} />
            </Box>
        );
    }

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : 'N/A';

    const cardStyle = {
        bgcolor: '#131A2B',
        color: '#FFFFFF',
        borderRadius: 3,
        border: '1px solid #232D42',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            {/* 1. Header / Avatar Section */}
            <Paper
                elevation={0}
                sx={{
                    ...cardStyle,
                    mb: 3,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'center', sm: 'center' },
                    justifyContent: 'space-between',
                    gap: 3,
                    textAlign: { xs: 'center', sm: 'left' },
                }}
            >
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
                    <Avatar
                        sx={{
                            width: 84,
                            height: 84,
                            bgcolor: '#FFC107',
                            color: '#000000',
                            fontSize: 32,
                            fontWeight: 'bold',
                        }}
                    >
                        {user.firstName?.[0]?.toUpperCase()}
                        {user.lastName?.[0]?.toUpperCase()}
                    </Avatar>

                    <Box>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                            {user.firstName} {user.lastName}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: 15, mt: 0.5 }}>
                            {user.email}
                        </Typography>

                        <Stack direction="row" spacing={1} sx={{ mt: 1.5, justifyContent: { xs: 'center', sm: 'flex-start' }, flexWrap: 'wrap', gap: 1 }}>
                            {user.profileCompleted && (
                                <Chip
                                    label="Profile Completed"
                                    size="small"
                                    color="success"
                                    sx={{ fontWeight: '500' }}
                                />
                            )}
                            <Chip
                                icon={<CalendarMonthIcon sx={{ fontSize: '16px !important', color: '#94A3B8' }} />}
                                label={`Joined ${formattedDate}`}
                                size="small"
                                sx={{ bgcolor: '#1E293B', color: '#CBD5E1' }}
                            />
                        </Stack>
                    </Box>
                </Stack>
            </Paper>

            {/* 2. Responsive Grid for Details */}
            <Grid container spacing={3} sx={{border:'px solid red'}}>
                {/* Column 1: Personal Information */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon sx={{ color: '#FFC107' }} /> Personal Information
                        </Typography>
                        <Divider sx={{ borderColor: '#232D42', mb: 2 }} />

                        <Stack spacing={2.5}>
                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    First Name
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                    {user.firstName || '—'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Last Name
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                    {user.lastName || '—'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Email Address
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                    {user.email || '—'}
                                </Typography>
                            </Box>

                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Phone Number
                                </Typography>
                                <Typography variant="body1" sx={{ fontWeight: 500, mt: 0.5 }}>
                                    {user.phone ? `+91 ${user.phone}` : '—'}
                                </Typography>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                {/* Column 2: Account & Verification Status */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon sx={{ color: '#FFC107' }} /> Verification & Security
                        </Typography>
                        <Divider sx={{ borderColor: '#232D42', mb: 2 }} />

                        <Stack spacing={2.5}>
                            {/* Email Verification */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EmailIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                                    <Typography>Email Verification</Typography>
                                </Box>
                                {user.isEmailVerified ? (
                                    <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" />
                                ) : (
                                    <Chip icon={<CancelIcon />} label="Unverified" color="error" size="small" />
                                )}
                            </Box>

                            {/* Phone Verification */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon sx={{ color: '#94A3B8', fontSize: 20 }} />
                                    <Typography>Phone Verification</Typography>
                                </Box>
                                {user.isPhoneVerified ? (
                                    <Chip icon={<CheckCircleIcon />} label="Verified" color="success" size="small" />
                                ) : (
                                    <Chip icon={<CancelIcon />} label="Unverified" color="warning" size="small" />
                                )}
                            </Box>

                            {/* QR Access Status */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <QrCode2Icon sx={{ color: '#94A3B8', fontSize: 20 }} />
                                    <Typography>QR Parking Pass</Typography>
                                </Box>
                                <Chip
                                    label={user.qrActive ? 'Active' : 'Inactive'}
                                    color={user.qrActive ? 'success' : 'default'}
                                    size="small"
                                    sx={{ bgcolor: user.qrActive ? undefined : '#334155', color: '#FFF' }}
                                />
                            </Box>

                            {/* QR Token snippet if available */}
                            {user.qrToken && (
                                <Box sx={{ bgcolor: '#0B0F1A', p: 1.5, borderRadius: 2, border: '1px dashed #334155' }}>
                                    <Typography sx={{ color: '#94A3B8', fontSize: 12 }}>QR Pass Token</Typography>
                                    <Typography sx={{ color: '#E2E8F0', fontSize: 13, fontFamily: 'monospace', wordBreak: 'break-all' }}>
                                        {user.qrToken}
                                    </Typography>
                                </Box>
                            )}
                        </Stack>
                    </Paper>
                </Grid>

                {/* Full Width Row: Emergency Contacts Summary */}
                {/* <Grid item xs={12}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                                <ContactEmergencyIcon sx={{ color: '#FFC107' }} /> Emergency Contacts (
                                {user.emergencyContacts?.length || 0})
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => navigate('/emergency-contacts')} // adjust route as needed
                                sx={{
                                    borderColor: '#FFC107',
                                    color: '#FFC107',
                                    ':hover': { borderColor: '#FFB300', bgcolor: 'rgba(255, 193, 7, 0.08)' }
                                }}
                            >
                                Manage Contacts
                            </Button>
                        </Box>

                        <Divider sx={{ borderColor: '#232D42', mb: 2 }} />

                        {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
                            <Grid container spacing={2}>
                                {user.emergencyContacts.map((contact, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Box
                                            sx={{
                                                bgcolor: '#0B0F1A',
                                                p: 2,
                                                borderRadius: 2,
                                                border: '1px solid #232D42',
                                            }}
                                        >
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#FFF' }}>
                                                {contact.name}
                                            </Typography>
                                            <Typography sx={{ color: '#90CAF9', fontSize: 14, textTransform: 'capitalize' }}>
                                                Relation: {contact.relation}
                                            </Typography>
                                            <Typography sx={{ color: '#94A3B8', fontSize: 14, mt: 0.5 }}>
                                                📞 {contact.phone}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography sx={{ color: '#94A3B8', textAlign: 'center', py: 2 }}>
                                No emergency contacts added yet.
                            </Typography>
                        )}
                    </Paper>
                </Grid> */}
            </Grid>
        </Container>
    );
};

export default Profile;