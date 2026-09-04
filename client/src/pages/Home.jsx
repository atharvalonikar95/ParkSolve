import React from 'react';
import { Box, Button, Stack, Typography, Container, Paper } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import LocalParkingIcon from '@mui/icons-material/LocalParking';

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { label: 'Profile', path: '/home/profile', icon: <PersonIcon fontSize="small" /> },
        { label: 'Verify Phone', path: '/home/verify-phone', icon: <PhoneIphoneIcon fontSize="small" /> },
        { label: 'Emergency Contacts', path: '/home/contact-details', icon: <ContactEmergencyIcon fontSize="small" /> },
        { label: 'My QR Pass', path: '/home/qr', icon: <QrCode2Icon fontSize="small" /> },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 3, md: 5 } }}>
            {/* Header Title */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
                    <Box
                        sx={{
                            bgcolor: '#FFC107',
                            color: '#000000',
                            p: 0.8,
                            borderRadius: 2,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <LocalParkingIcon sx={{ fontSize: 28 }} />
                    </Box>
                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 'bold',
                            color: '#FFFFFF',
                            fontSize: { xs: '1.75rem', sm: '2.25rem' }
                        }}
                    >
                        Parking Management System
                    </Typography>
                </Stack>
                <Typography sx={{ color: '#94A3B8', fontSize: { xs: 13, sm: 15 } }}>
                    Manage your profile, emergency contacts, and vehicle QR passes in one place.
                </Typography>
            </Box>

            {/* Navigation Bar (Pill Bar) */}
            <Paper
                elevation={0}
                sx={{
                    bgcolor: '#131A2B',
                    p: 1,
                    borderRadius: 3,
                    border: '1px solid #232D42',
                    mb: 4,
                }}
            >
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={1}
                    justifyContent="space-between"
                >
                    {navItems.map((item) => {
                        const isActive = location.pathname.startsWith(item.path);

                        return (
                            <Button
                                key={item.path}
                                fullWidth
                                onClick={() => navigate(item.path)}
                                startIcon={item.icon}
                                sx={{
                                    py: 1.2,
                                    px: 2,
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontSize: { xs: '14px', sm: '15px' },
                                    fontWeight: isActive ? 700 : 500,
                                    bgcolor: isActive ? '#FFC107' : 'transparent',
                                    color: isActive ? '#000000' : '#94A3B8',
                                    transition: 'all 0.2s ease',
                                    ':hover': {
                                        bgcolor: isActive ? '#FFB300' : 'rgba(255, 255, 255, 0.06)',
                                        color: isActive ? '#000000' : '#FFFFFF',
                                    },
                                }}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </Stack>
            </Paper>

            {/* Content Area Rendering the Child Route */}
            <Box
                sx={{
                    minHeight: '60vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Outlet />
            </Box>
        </Container>
    );
};

export default Home;