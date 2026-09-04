import React, { useState, useEffect } from 'react';
import {
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Button,
    Typography,
    Avatar,
    Stack,
    Menu,
    MenuItem,
    Divider,
    ListItemIcon,
    Switch,
    Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import PersonIcon from '@mui/icons-material/Person';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import LogoutIcon from '@mui/icons-material/Logout';

// Custom Animated Theme Switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: '#232D42',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: '#FFC107',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#000',
            )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#334155',
        borderRadius: 20 / 2,
    },
}));

const Navbar = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const [checked, setChecked] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = Boolean(anchorEl);

    const mode = localStorage.getItem('theme') || 'dark';

    useEffect(() => {
        setChecked(mode === 'dark');
    }, [mode]);

    const handleThemeChange = (event) => {
        const nextChecked = event.target.checked;
        setChecked(nextChecked);
        const newMode = nextChecked ? 'dark' : 'light';
        localStorage.setItem('theme', newMode);
        window.dispatchEvent(new Event('themechange'));
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await fetch("http://localhost:8000/api/v1/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
            });

            if (setUser) setUser(null);
            handleMenuClose();
            navigate('/signin', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <Box sx={{ width: "100%", position: 'sticky', top: 0, zIndex: 1100 }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    bgcolor: '#0B0F1A',
                    borderBottom: '1px solid #232D42',
                    py: 0.5,
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '65px' }}>
                        
                        {/* 👈 Styled Logo with Hover Animation & Responsive Size */}
                        <Box
                            component={Link}
                            to="/home"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                textDecoration: 'none',
                                transition: 'transform 0.2s ease, opacity 0.2s ease',
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                    opacity: 0.95,
                                },
                            }}
                        >
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
                        </Box>

                        {/* Right Navigation & User Controls */}
                        <Stack direction="row" spacing={{ xs: 1.5, sm: 2.5 }} alignItems="center">
                            {/* Theme Toggle */}
                            <MaterialUISwitch
                                checked={checked}
                                onChange={handleThemeChange}
                                slotProps={{ input: { 'aria-label': 'theme-toggle' } }}
                            />

                            {/* User Menu or Login Button */}
                            {user ? (
                                <>
                                    <IconButton
                                        onClick={handleMenuOpen}
                                        sx={{
                                            p: 0.5,
                                            border: '2px solid #FFC107',
                                            transition: 'transform 0.2s ease',
                                            ':hover': { transform: 'scale(1.05)' }
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: '#FFC107',
                                                color: '#000000',
                                                fontWeight: 'bold',
                                                width: 36,
                                                height: 36,
                                                fontSize: 15
                                            }}
                                        >
                                            {user.firstName?.[0]?.toUpperCase() || user.name?.[0]?.toUpperCase() || 'U'}
                                        </Avatar>
                                    </IconButton>

                                    {/* User Dropdown Menu */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={openMenu}
                                        onClose={handleMenuClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        PaperProps={{
                                            sx: {
                                                bgcolor: '#131A2B',
                                                color: '#FFFFFF',
                                                border: '1px solid #232D42',
                                                borderRadius: 3,
                                                mt: 1.5,
                                                minWidth: 220,
                                                boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                                            },
                                        }}
                                    >
                                        {/* User Info Header */}
                                        <Box sx={{ px: 2, py: 1.5 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                                                {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.name || 'User'}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: '#94A3B8' }} noWrap>
                                                {user.email}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ borderColor: '#232D42' }} />
                                        {
                                            user.role === 'admin' ? (
                                                <MenuItem
                                                    onClick={() => {
                                                        handleMenuClose();
                                                        navigate('/dashboard');
                                                    }}
                                                    sx={{ py: 1.2, ':hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                                                >
                                                    <ListItemIcon sx={{ color: '#FFC107' }}>
                                                        <PersonIcon fontSize="small" />
                                                    </ListItemIcon>
                                                
                                                    Dashboard
                                                </MenuItem>
                                            ):
                                            <>
                                            <MenuItem
                                                onClick={() => {
                                                    handleMenuClose();
                                                    navigate('/home/profile');
                                                }}
                                                sx={{ py: 1.2, ':hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                                            >
                                                <ListItemIcon sx={{ color: '#FFC107' }}>
                                                    <PersonIcon fontSize="small" />
                                                </ListItemIcon>
                                                Profile
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    handleMenuClose();
                                                    navigate('/home/qr');
                                                }}
                                                sx={{ py: 1.2, ':hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                                            >
                                                <ListItemIcon sx={{ color: '#FFC107' }}>
                                                    <QrCode2Icon fontSize="small" />
                                                </ListItemIcon>
                                                My QR Pass
                                            </MenuItem>

                                            <MenuItem
                                                onClick={() => {
                                                    handleMenuClose();
                                                    navigate('/home/contact-details');
                                                }}
                                                sx={{ py: 1.2, ':hover': { bgcolor: 'rgba(255, 255, 255, 0.05)' } }}
                                            >
                                                <ListItemIcon sx={{ color: '#FFC107' }}>
                                                    <ContactEmergencyIcon fontSize="small" />
                                                </ListItemIcon>
                                                Emergency Contacts
                                            </MenuItem>
                                            </>
                                        }

                                        <Divider sx={{ borderColor: '#232D42' }} />

                                        <MenuItem
                                            onClick={handleLogout}
                                            sx={{
                                                py: 1.2,
                                                color: '#EF4444',
                                                ':hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
                                            }}
                                        >
                                            <ListItemIcon sx={{ color: '#EF4444' }}>
                                                <LogoutIcon fontSize="small" />
                                            </ListItemIcon>
                                            Logout
                                        </MenuItem>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    variant="contained"
                                    component={Link}
                                    to="/signin"
                                    sx={{
                                        bgcolor: '#FFC107',
                                        color: '#000000',
                                        fontWeight: 'bold',
                                        borderRadius: 2,
                                        px: 2.5,
                                        ':hover': { bgcolor: '#FFB300' }
                                    }}
                                >
                                    Login
                                </Button>
                            )}
                        </Stack>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default Navbar;