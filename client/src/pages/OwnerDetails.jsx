import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchVehicleDetails } from '../services/userService';
import {
    Box,
    Typography,
    Button,
    Paper,
    Container,
    Stack,
    Avatar,
    Chip,
    CircularProgress,
    Divider,
    Card,
    CardContent
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import VerifiedIcon from '@mui/icons-material/Verified';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const OwnerDetails = () => {
    const { qrToken } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(false);
                const res = await fetchVehicleDetails(qrToken);
                console.log("Vehicle details response:", res);
    
                // 👈 Correctly extracts res.user from your response object
                if (res && res.success && res.user) {
                    setUser(res.user);
                } else if (res && res.user) {
                    setUser(res.user);
                } else if (res && res.name) {
                    setUser(res);
                } else {
                    setError(true);
                }
            } catch (err) {
                console.error("Failed to fetch vehicle details:", err);
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        if (qrToken) {
            fetchDetails();
        }
    }, [qrToken]);

    // Loading State
    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F1A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress sx={{ color: '#FFC107' }} />
                <Typography sx={{ color: '#94A3B8', mt: 2, fontSize: 15 }}>
                    Fetching vehicle pass details...
                </Typography>
            </Box>
        );
    }

    // Invalid or Expired QR State
    if (error || !user) {
        return (
            <Container maxWidth="xs" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4 }}>
                <Paper
                    sx={{
                        p: 4,
                        textAlign: 'center',
                        bgcolor: '#131A2B',
                        color: 'white',
                        borderRadius: 4,
                        border: '1px solid #232D42',
                    }}
                >
                    <ErrorOutlineIcon sx={{ fontSize: 54, color: '#EF4444', mb: 2 }} />
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Invalid QR Code
                    </Typography>
                    <Typography sx={{ color: '#94A3B8', fontSize: 14 }}>
                        This vehicle QR pass is either inactive or does not exist. Please contact the vehicle owner directly.
                    </Typography>
                </Paper>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#0B0F1A', py: { xs: 3, sm: 5 } }}>
            <Container maxWidth="sm">
                <Paper
                    elevation={8}
                    sx={{
                        p: { xs: 2.5, sm: 4 },
                        bgcolor: '#131A2B',
                        color: '#FFFFFF',
                        borderRadius: 4,
                        border: '1px solid #232D42',
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.7)',
                    }}
                >
                    {/* Header: Verified Vehicle Pass Badge */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box sx={{ bgcolor: 'rgba(255, 193, 7, 0.15)', p: 0.8, borderRadius: 2, display: 'flex', color: '#FFC107' }}>
                                <DirectionsCarIcon />
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
                                Parking<span style={{ color: '#FFC107' }}>Sathi</span> Pass
                            </Typography>
                        </Stack>
                        <Chip
                            icon={<VerifiedIcon sx={{ fontSize: '16px !important', color: '#10B981' }} />}
                            label="Verified Vehicle"
                            size="small"
                            sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', fontWeight: 600, border: '1px solid rgba(16, 185, 129, 0.2)' }}
                        />
                    </Stack>

                    {/* 1. Vehicle Owner Card */}
                    <Box
                        sx={{
                            bgcolor: '#0B0F1A',
                            p: 3,
                            borderRadius: 3,
                            border: '1px solid #232D42',
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 68,
                                height: 68,
                                bgcolor: '#FFC107',
                                color: '#000000',
                                fontSize: 26,
                                fontWeight: 'bold',
                                mx: 'auto',
                                mb: 1.5,
                            }}
                        >
                            {user.name?.[0]?.toUpperCase() || 'O'}
                        </Avatar>

                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                            {user.name}
                        </Typography>
                        <Typography sx={{ color: '#94A3B8', fontSize: 14, mt: 0.5 }}>
                            Vehicle Owner
                        </Typography>

                        {/* Owner Action Buttons (Call & WhatsApp) */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 3 }}>
                            {user.phone && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    component="a"
                                    href={`tel:${user.phone}`}
                                    startIcon={<PhoneIcon />}
                                    sx={{
                                        bgcolor: '#FFC107',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                        py: 1.3,
                                        borderRadius: 2,
                                        fontSize: 15,
                                        ':hover': { bgcolor: '#FFB300' }
                                    }}
                                >
                                    Call Owner
                                </Button>
                            )}

                            {user.phone && (
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    component="a"
                                    href={`https://wa.me/91${user.phone}?text=Hello%20${encodeURIComponent(user.name)},%20I%20scanned%20your%20vehicle%20QR%20pass%20regarding%20your%20parked%20vehicle.`}
                                    target="_blank"
                                    startIcon={<WhatsAppIcon sx={{ color: '#25D366' }} />}
                                    sx={{
                                        borderColor: '#25D366',
                                        color: '#25D366',
                                        fontWeight: 'bold',
                                        py: 1.3,
                                        borderRadius: 2,
                                        ':hover': { bgcolor: 'rgba(37, 211, 102, 0.1)', borderColor: '#25D366' }
                                    }}
                                >
                                    WhatsApp
                                </Button>
                            )}
                        </Stack>
                    </Box>

                    {/* 2. Emergency Contacts Section */}
                    <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1.5, display: 'flex', alignItems: 'center', gap: 1, color: '#FFFFFF' }}>
                            <ContactEmergencyIcon sx={{ color: '#FFC107' }} /> Emergency Contacts
                        </Typography>

                        {user.emergencyContacts && user.emergencyContacts.length > 0 ? (
                            <Stack spacing={2}>
                                {user.emergencyContacts.map((contact, index) => (
                                    <Card
                                        key={contact._id || index}
                                        sx={{
                                            bgcolor: '#0B0F1A',
                                            color: '#FFFFFF',
                                            border: '1px solid #232D42',
                                            borderRadius: 2.5,
                                            p: 0.5,
                                        }}
                                    >
                                        <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: '12px !important' }}>
                                            <Box>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                                        {contact.name}
                                                    </Typography>
                                                    <Chip
                                                        label={contact.relation}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: 'rgba(255, 193, 7, 0.1)',
                                                            color: '#FFC107',
                                                            fontSize: 11,
                                                            height: 22,
                                                            textTransform: 'capitalize'
                                                        }}
                                                    />
                                                </Stack>
                                                <Typography sx={{ color: '#94A3B8', fontSize: 13, mt: 0.5 }}>
                                                    {contact.phone}
                                                </Typography>
                                            </Box>

                                            {/* Call Emergency Contact Button */}
                                            <Button
                                                variant="contained"
                                                component="a"
                                                href={`tel:${contact.phone}`}
                                                startIcon={<PhoneIcon />}
                                                sx={{
                                                    bgcolor: '#1E293B',
                                                    color: '#FFFFFF',
                                                    border: '1px solid #334155',
                                                    fontWeight: 600,
                                                    borderRadius: 2,
                                                    px: 2,
                                                    ':hover': { bgcolor: '#334155' }
                                                }}
                                            >
                                                Call
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </Stack>
                        ) : (
                            <Typography sx={{ color: '#94A3B8', fontSize: 14, textAlign: 'center', py: 2 }}>
                                No alternative emergency contacts provided.
                            </Typography>
                        )}
                    </Box>

                    <Divider sx={{ my: 3, borderColor: '#232D42' }} />

                    {/* Footer Info */}
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block', textAlign: 'center' }}>
                        This contact info is provided via Parking Sathi for emergency vehicle communication.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
};

export default OwnerDetails;