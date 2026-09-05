import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Card,
    CardContent,
    Stack,
    Chip,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    useTheme,
    useMediaQuery,
    Avatar
} from '@mui/material';

// Icons
import QrCode2Icon from '@mui/icons-material/QrCode2';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
// import NoPhotographyIcon from '@mui/icons-material/NoPhotography';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import CarCrashIcon from '@mui/icons-material/CarCrash';

// Reusable Yellow Gradient Button Styling
const yellowBtnStyle = {
    background: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)',
    color: '#0B0F19',
    fontWeight: 700,
    textTransform: 'none',
    borderRadius: 2.5,
    boxShadow: '0 6px 20px rgba(255, 179, 0, 0.35)',
    '&:hover': {
        background: 'linear-gradient(135deg, #FFD54F 0%, #FFA000 100%)',
        boxShadow: '0 8px 25px rgba(255, 179, 0, 0.5)',
    }
};

export default function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);

    const navLinks = [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'Accident & Scenarios', href: '#scenarios' },
        { label: 'Why QR Tag?', href: '#why-qr' },
    ];

    const scenarios = [
        {
            icon: <CarCrashIcon sx={{ fontSize: 36, color: '#FF5252' }} />,
            title: 'Critical Accident & Unconscious Victim',
            desc: 'When a rider is unconscious or their phone is destroyed, bystanders and paramedics scan the helmet or vehicle sticker to immediately call family without needing a phone passcode.'
        },
        {
            icon: <LocalHospitalIcon sx={{ fontSize: 36, color: '#FFB300' }} />,
            title: 'Immediate First Responder Access',
            desc: 'Paramedics get instant access to your emergency contacts, blood group, and emergency instructions before arriving at the trauma ward.'
        },
        {
            icon: <ReportProblemIcon sx={{ fontSize: 36, color: '#69F0AE' }} />,
            title: 'Parked Vehicle & Tow Alerts',
            desc: 'Car or bike blocking someone, caught in a tow zone, or left with headlights on? Citizens can notify you instantly without knowing your private personal number.'
        },
        {
            icon: <TwoWheelerIcon sx={{ fontSize: 36, color: '#90CAF9' }} />,
            title: 'Lost Helmet, Keys or Vehicle Retrieval',
            desc: 'Leave your helmet or vehicle behind? Anyone scanning your QR tag can easily coordinate a safe return with your trusted contact.'
        }
    ];

    return (
        <Box sx={{ bgcolor: '#0B0F19', color: 'white', minHeight: '100vh', overflowX: 'hidden' }}>

            {/* ===================== 1. NAVBAR ===================== */}
            <Box sx={{
                borderBottom: '1px solid #1E2638',
                position: 'sticky',
                top: 0,
                bgcolor: 'rgba(11, 15, 25, 0.85)',
                backdropFilter: 'blur(12px)',
                zIndex: 1100
            }}>
                <Container maxWidth="lg">
                    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2 }}>

                        {/* Brand Logo */}
                        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
                            {/* <Avatar sx={{ background: 'linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)', width: 38, height: 38 }}>
                                <QrCode2Icon sx={{ color: '#0B0F19', fontSize: 24 }} />
                            </Avatar> */}
                            {/* <Typography variant="h6" fontWeight="bold" sx={{ letterSpacing: 0.5, color: 'white' }}>
                                Moto<span style={{ color: '#FFC107' }}>Tag</span>
                            </Typography> */}
                            <Box
                                component="img"
                                src="/logo2.png"
                                alt="Parking Sathi"
                                sx={{
                                    height: { xs: 48, sm: 58 },
                                    width: 'auto',
                                    maxWidth: { xs: 150, sm: 190 },
                                    objectFit: 'contain',
                                    display: 'block',
                                    filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))',
                                }}
                            />
                        </Stack>

                        {/* Desktop Links */}
                        {!isMobile && (
                            <Stack direction="row" spacing={4} alignItems="center">
                                {navLinks.map((item) => (
                                    <Typography
                                        key={item.label}
                                        component="a"
                                        href={item.href}
                                        sx={{
                                            color: '#A0AEC0',
                                            textDecoration: 'none',
                                            fontSize: 15,
                                            fontWeight: 500,
                                            transition: 'color 0.2s',
                                            '&:hover': { color: '#FFC107' }
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                ))}
                            </Stack>
                        )}

                        {/* Yellow Action Button */}
                        <Stack direction="row" spacing={1.5} alignItems="center">
                            <Button
                                variant="contained"
                                onClick={() => navigate('/signup')}
                                sx={{
                                    ...yellowBtnStyle,
                                    px: { xs: 2, sm: 3 },
                                    py: 1,
                                    fontSize: { xs: 13, sm: 14 }
                                }}
                            >
                                Get Your QR Tag
                            </Button>

                            {isMobile && (
                                <IconButton onClick={() => setMobileOpen(true)} sx={{ color: 'white' }}>
                                    <MenuIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </Stack>
                </Container>
            </Box>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: { bgcolor: '#131A2B', width: 260, p: 3, borderLeft: '1px solid #232D42' }
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h6" fontWeight="bold" color="white">Menu</Typography>
                    <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <List>
                    {navLinks.map((item) => (
                        <ListItem
                            button
                            key={item.label}
                            component="a"
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            sx={{ color: '#E0E0E0', borderRadius: 1, mb: 1, '&:hover': { bgcolor: '#1E2638' } }}
                        >
                            <ListItemText primary={item.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            {/* ===================== 2. HERO SECTION ===================== */}
            <Container maxWidth="lg" sx={{ pt: { xs: 6, md: 11 }, pb: { xs: 8, md: 13 } }}>
                <Grid container spacing={6} alignItems="center">

                    {/* Left Hero Content */}
                    <Grid item xs={12} md={7}>
                        <Chip
                            icon={<SecurityIcon sx={{ fontSize: '18px !important', color: '#FFC107 !important' }} />}
                            label="Emergency QR Sticker for Vehicles & Helmets"
                            sx={{
                                bgcolor: 'rgba(255, 193, 7, 0.1)',
                                color: '#FFC107',
                                border: '1px solid rgba(255, 193, 7, 0.3)',
                                mb: 3,
                                fontWeight: 600
                            }}
                        />
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4rem' },
                                fontWeight: 800,
                                lineHeight: 1.15,
                                mb: 2.5,
                                background: 'linear-gradient(180deg, #FFFFFF 40%, #CFD8DC 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Your silent lifesaver on every ride.
                        </Typography>
                        <Typography
                            sx={{
                                color: '#A0AEC0',
                                fontSize: { xs: 16, md: 18 },
                                lineHeight: 1.6,
                                mb: 4,
                                maxWidth: 540
                            }}
                        >
                            In severe road accidents, victims are often unconscious and phones are locked or damaged. A simple scan of your vehicle’s QR code lets any bystander notify your family within seconds.
                        </Typography>

                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                onClick={() => navigate('/signup')}
                                sx={{
                                    ...yellowBtnStyle,
                                    px: 4,
                                    py: 1.6,
                                    fontSize: 16,
                                }}
                            >
                                Generate My QR Tag
                            </Button>
                            <Button
                                variant="outlined"
                                size="large"
                                component="a"
                                href="#how-it-works"
                                sx={{
                                    borderColor: '#232D42',
                                    color: '#E0E0E0',
                                    px: 3.5,
                                    py: 1.6,
                                    borderRadius: 2.5,
                                    fontSize: 16,
                                    fontWeight: 600,
                                    textTransform: 'none',
                                    '&:hover': { borderColor: '#FFC107', bgcolor: 'rgba(255, 193, 7, 0.05)', color: '#FFC107' }
                                }}
                            >
                                How It Works
                            </Button>
                        </Stack>
                    </Grid>

                    {/* Right Hero: Visual QR Tag Showcase */}
                    <Grid item xs={12} md={5}>
                        <Box sx={{
                            position: 'relative',
                            p: 3.5,
                            bgcolor: '#131A2B',
                            borderRadius: 4,
                            border: '1px solid #232D42',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
                        }}>
                            {/* Sticker Header */}
                            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                <Typography variant="subtitle2" sx={{ color: '#FFC107', fontWeight: 800, letterSpacing: 1 }}>
                                    EMERGENCY VEHICLE TAG
                                </Typography>
                                <Chip
                                    size="small"
                                    label="NO APP REQUIRED"
                                    sx={{ bgcolor: '#232D42', color: '#90CAF9', fontWeight: 700, fontSize: 10 }}
                                />
                            </Stack>

                            {/* Simulated QR Code Card */}
                            <Box sx={{
                                bgcolor: '#0B0F19',
                                border: '2px dashed #FFC107',
                                borderRadius: 3,
                                p: 3,
                                textAlign: 'center',
                                mb: 3
                            }}>
                                <Avatar sx={{
                                    width: 130,
                                    height: 130,
                                    mx: 'auto',
                                    bgcolor: 'white',
                                    color: '#0B0F19',
                                    borderRadius: 2,
                                    p: 1
                                }}>
                                    <QrCode2Icon sx={{ fontSize: 120 }} />
                                </Avatar>
                                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: 'white' }}>
                                    SCAN IN EMERGENCY
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#A0AEC0', display: 'block' }}>
                                    Scan with any smartphone camera to call emergency contacts
                                </Typography>
                            </Box>

                            {/* What the scanner sees preview */}
                            <Card sx={{ bgcolor: '#0B0F19', border: '1px solid #232D42', borderRadius: 2.5, p: 1.5 }}>
                                <Stack direction="row" spacing={1.5} alignItems="center">
                                    <Avatar sx={{ bgcolor: 'rgba(255, 82, 82, 0.2)', color: '#FF5252', width: 36, height: 36 }}>
                                        <PhoneInTalkIcon fontSize="small" />
                                    </Avatar>
                                    <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="caption" color="#FFC107" fontWeight="bold" display="block">
                                            INSTANT FAMILY NOTIFICATION
                                        </Typography>
                                        <Typography variant="body2" color="white" fontWeight={600}>
                                            Dial Primary Contact: Father
                                        </Typography>
                                    </Box>
                                    <Chip label="1-Tap Call" size="small" sx={{ bgcolor: '#FFC107', color: '#0B0F19', fontWeight: 700 }} />
                                </Stack>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* ===================== 3. REAL LIFE CRITICAL SCENARIOS ===================== */}
            <Box id="scenarios" sx={{ bgcolor: '#0D1322', py: { xs: 8, md: 12 }, borderTop: '1px solid #1E2638' }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={7}>
                        <Typography variant="h6" sx={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: 1.5, mb: 1 }}>
                            Life-Saving Use Cases
                        </Typography>
                        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700 }}>
                            Why your vehicle needs this QR Tag
                        </Typography>
                        <Typography sx={{ color: '#A0AEC0', mt: 1.5, maxWidth: 600, mx: 'auto' }}>
                            Designed for scenarios where you cannot speak for yourself or need to be contacted without compromising privacy.
                        </Typography>
                    </Box>

                    <Grid container spacing={3} alignItems="stretch">
                        {scenarios.map((item, idx) => (
                            <Grid
                                item
                                xs={12}
                                sm={6}
                                key={idx}
                                sx={{ display: 'flex', width: '100%', }} // 1. Makes the grid cell a flex container
                            >
                                <Card sx={{
                                    width: '100%',               // 2. Forces exact 100% width across all cards
                                    display: 'flex',            // 3. Enables flex layout for equal height
                                    flexDirection: 'column',    // 4. Stacks icon, title, desc vertically
                                    bgcolor: '#131A2B',
                                    border: '1px solid #232D42',
                                    borderRadius: 3,
                                    p: 1.5,
                                    boxSizing: 'border-box',
                                    transition: 'transform 0.2s, border-color 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                        borderColor: '#FFC107'
                                    }
                                }}>
                                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                        <Box mb={2}>{item.icon}</Box>
                                        <Typography variant="h6" fontWeight="bold" color="white" mb={1}>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: '#A0AEC0', lineHeight: 1.7, flexGrow: 1 }}>
                                            {item.desc}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* ===================== 4. HOW IT WORKS (3 SIMPLE STEPS) ===================== */}
            <Container id="how-it-works" maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Box textAlign="center" mb={8}>
                    <Typography variant="h6" sx={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: 1.5, mb: 1 }}>
                        Simple 3-Step Process
                    </Typography>
                    <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 700 }}>
                        How MotoTag Works
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        {
                            step: '01',
                            title: 'Register & Add Emergency Contacts',
                            desc: 'Complete your profile and specify trusted contacts (parents, spouse, siblings) who should be alerted first.'
                        },
                        {
                            step: '02',
                            title: 'Generate & Stick the QR Tag',
                            desc: 'Download and print your custom QR code sticker. Affix it to your motorcycle, car windshield, or helmet.'
                        },
                        {
                            step: '03',
                            title: 'Instant Assistance When Scanned',
                            desc: 'In an incident, anyone opens their standard smartphone camera. The page opens instantly—no app download needed.'
                        }
                    ].map((s, idx) => (
                        <Grid item xs={12} md={4} key={idx} sx={{ width: '100%', }}>
                            <Box sx={{
                                // width: '100%',
                                p: 4,
                                bgcolor: '#131A2B',
                                border: '1px solid #232D42',
                                borderRadius: 3,
                                height: '100%',
                                position: 'relative',
                                // gap: 2,

                            }}>
                                <Typography variant="h3" fontWeight="900" sx={{ color: '#232D42', mb: 2 }}>
                                    {s.step}
                                </Typography>
                                <Typography variant="h6" fontWeight="bold" color="white" mb={1}>
                                    {s.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#A0AEC0', lineHeight: 1.6 }}>
                                    {s.desc}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            {/* ===================== 5. WHY QR TAG? (KEY ADVANTAGES) ===================== */}
            <Box id="why-qr" sx={{ bgcolor: '#0D1322', py: { xs: 8, md: 10 }, borderTop: '1px solid #1E2638' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ color: '#FFC107', textTransform: 'uppercase', letterSpacing: 1.5, mb: 1 }}>
                                No Passcodes. No Delays.
                            </Typography>
                            <Typography variant="h3" fontWeight="700" sx={{ mb: 2.5, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                                Why locked phones fail in emergencies
                            </Typography>
                            <Typography sx={{ color: '#A0AEC0', lineHeight: 1.7, mb: 3 }}>
                                When an accident occurs on the highway or city road:
                            </Typography>
                            <Stack spacing={2}>
                                {[
                                    'Phones are password or biometrically locked—bystanders cannot open your contacts.',
                                    'Phones often fly off, run out of battery, or smash on impact.',
                                    'Hospital staff lose valuable golden-hour treatment time identifying emergency guardians.',
                                    'Our vehicle & helmet tags are waterproof, always visible, and never run out of battery.'
                                ].map((point, index) => (
                                    <Stack direction="row" spacing={1.5} alignItems="flex-start" key={index}>
                                        <Avatar sx={{ bgcolor: 'rgba(255, 193, 7, 0.15)', color: '#FFC107', width: 24, height: 24, fontSize: 13, fontWeight: 700, mt: 0.5 }}>
                                            ✓
                                        </Avatar>
                                        <Typography variant="body2" sx={{ color: '#E0E0E0', lineHeight: 1.6 }}>
                                            {point}
                                        </Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box sx={{
                                p: { xs: 3, sm: 4 },
                                bgcolor: '#131A2B',
                                border: '1px solid #232D42',
                                borderRadius: 4,
                                textAlign: 'center'
                            }}>
                                <ContactEmergencyIcon sx={{ fontSize: 72, color: '#FFC107', mb: 2 }} />
                                <Typography variant="h5" fontWeight="bold" color="white" mb={1}>
                                    Save Golden-Hour Minutes
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#A0AEC0', mb: 3, lineHeight: 1.7 }}>
                                    Medical studies show alerting family and getting consent in the first 60 minutes dramatically increases survival chances during severe road injuries.
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() => navigate('/signup')}
                                    sx={{ ...yellowBtnStyle, px: 4, py: 1.4 }}
                                >
                                    Protect Your Ride Today
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* ===================== 6. CALL TO ACTION BANNER ===================== */}
            <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
                <Box sx={{
                    borderRadius: 4,
                    p: { xs: 4, md: 6 },
                    textAlign: 'center',
                    border: '1px solid #232D42',
                    background: 'radial-gradient(circle at 50% 0%, #25334D 0%, #131A2B 80%)'
                }}>
                    <Typography variant="h3" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 700, mb: 2 }}>
                        Get your emergency vehicle QR tag in 2 minutes
                    </Typography>
                    <Typography sx={{ color: '#A0AEC0', mb: 4, maxWidth: 540, mx: 'auto' }}>
                        Set up your contacts once. Stick the tag on your bike, helmet, or car. Ride with peace of mind every single day.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => navigate('/signup')}
                        sx={{
                            ...yellowBtnStyle,
                            px: 5,
                            py: 1.6,
                            fontSize: 16,
                        }}
                    >
                        Generate Your QR Code
                    </Button>
                </Box>
            </Container>

            {/* ===================== 7. FOOTER ===================== */}
            <Box sx={{ borderTop: '1px solid #1E2638', py: 4, bgcolor: '#080C14', color: '#718096' }}>
                <Container maxWidth="lg">
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant="body2">
                            © {new Date().getFullYear()} ParkSolve Emergency Services.
                        </Typography>
                        <Stack direction="row" spacing={3}>
                            <Typography variant="body2" component="a" href="#" sx={{ color: '#718096', textDecoration: 'none', '&:hover': { color: '#FFC107' } }}>
                                Privacy Policy
                            </Typography>
                            <Typography variant="body2" component="a" href="#" sx={{ color: '#718096', textDecoration: 'none', '&:hover': { color: '#FFC107' } }}>
                                Terms of Use
                            </Typography>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}