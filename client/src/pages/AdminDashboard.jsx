import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Avatar,
    Chip,
    Button,
    TextField,
    InputAdornment,
    CircularProgress,
    Stack,
    Grid
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { getUsers, toggleQRStatus } from '../services/adminService';
// import { getUsers } from '../services/userService'; // 👈 Your API service

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            // Replace with your actual API call:
            // const res = await getUsers();
            // if (res.success) setUsers(res.users);

            // Sample fallback data for preview:
            const res = await getUsers();
            if (res.success) {
                setUsers(res.users);
            }
        } catch (error) {
            console.log("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handler to Activate / Deactivate QR Pass
    const handleToggleQR = async (userId, currentStatus) => {
        const nextStatus = !currentStatus;
        try {
            setUpdatingId(userId);
            const res = await toggleQRStatus(userId);
            console.log(res);

            // 👈 TODO: Call your backend API here later:
            // await toggleQRStatusApi(userId, nextStatus);

            // Update UI state immediately:
            setUsers((prevUsers) =>
                prevUsers.map((u) =>
                    u._id === userId ? { ...u, qrActive: nextStatus } : u
                )
            );
        } catch (error) {
            console.error("Failed to update QR status:", error);
        } finally {
            setUpdatingId(null);
        }
    };

    // Filter users based on search (Name, Surname, Email, Phone)
    const filteredUsers = users.filter((u) => {
        const query = search.toLowerCase();
        const fullName = `${u.firstName || ''} ${u.lastName || ''}`.toLowerCase();
        return (
            fullName.includes(query) ||
            u.email?.toLowerCase().includes(query) ||
            u.phone?.includes(query)
        );
    });

    const activeQRsCount = users.filter((u) => u.qrActive).length;

    const cardStyle = {
        bgcolor: '#131A2B',
        color: '#FFFFFF',
        borderRadius: 3,
        border: '1px solid #232D42',
        p: 2.5,
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
            {/* 1. Header */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                    Admin Dashboard
                </Typography>
                <Typography sx={{ color: '#94A3B8', mt: 0.5 }}>
                    Manage registered users and control their parking QR pass activation.
                </Typography>
            </Box>

            {/* 2. Metrics Overview Cards */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Total Users
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 0.5 }}>
                                    {users.length}
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: 'rgba(255, 193, 7, 0.1)', p: 1.5, borderRadius: 3, color: '#FFC107' }}>
                                <PeopleAltIcon sx={{ fontSize: 30 }} />
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Active QR Passes
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 0.5, color: '#10B981' }}>
                                    {activeQRsCount}
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: 'rgba(16, 185, 129, 0.1)', p: 1.5, borderRadius: 3, color: '#10B981' }}>
                                <CheckCircleIcon sx={{ fontSize: 30 }} />
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Paper elevation={0} sx={cardStyle}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Box>
                                <Typography sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'uppercase' }}>
                                    Inactive QR Passes
                                </Typography>
                                <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 0.5, color: '#EF4444' }}>
                                    {users.length - activeQRsCount}
                                </Typography>
                            </Box>
                            <Box sx={{ bgcolor: 'rgba(239, 68, 68, 0.1)', p: 1.5, borderRadius: 3, color: '#EF4444' }}>
                                <BlockIcon sx={{ fontSize: 30 }} />
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>
            </Grid>

            {/* 3. Live Search Bar */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    placeholder="Search by name, surname, email, or phone..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    fullWidth
                    sx={{
                        bgcolor: '#131A2B',
                        borderRadius: 3,
                        '& .MuiOutlinedInput-root': {
                            color: 'white',
                            '& fieldset': { borderColor: '#232D42' },
                            '&:hover fieldset': { borderColor: '#FFC107' },
                            '&.Mui-focused fieldset': { borderColor: '#FFC107' },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: '#94A3B8' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>

            {/* 4. Users Table */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    bgcolor: '#131A2B',
                    border: '1px solid #232D42',
                    borderRadius: 3,
                    overflowX: 'auto',
                }}
            >
                <Table>
                    <TableHead sx={{ bgcolor: '#0B0F1A' }}>
                        <TableRow>
                            <TableCell sx={{ color: '#94A3B8', fontWeight: 600, borderColor: '#232D42' }}>
                                USER
                            </TableCell>
                            <TableCell sx={{ color: '#94A3B8', fontWeight: 600, borderColor: '#232D42' }}>
                                EMAIL
                            </TableCell>
                            <TableCell sx={{ color: '#94A3B8', fontWeight: 600, borderColor: '#232D42' }}>
                                PHONE NUMBER
                            </TableCell>
                            <TableCell sx={{ color: '#94A3B8', fontWeight: 600, borderColor: '#232D42' }}>
                                QR STATUS
                            </TableCell>
                            <TableCell align="center" sx={{ color: '#94A3B8', fontWeight: 600, borderColor: '#232D42' }}>
                                ACTION
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 6, borderColor: '#232D42' }}>
                                    <CircularProgress sx={{ color: '#FFC107' }} />
                                    <Typography sx={{ color: '#94A3B8', mt: 2 }}>Loading users list...</Typography>
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 5, color: '#94A3B8', borderColor: '#232D42' }}>
                                    No users found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((u) => {
                                const isUpdating = updatingId === u._id;
                                const isQrActive = u.qrActive === true;

                                return (
                                    <TableRow
                                        key={u._id}
                                        sx={{
                                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.02)' },
                                            borderColor: '#232D42',
                                        }}
                                    >
                                        {/* User Name & Surname with Avatar */}
                                        <TableCell sx={{ borderColor: '#232D42', color: 'white' }}>
                                            <Stack direction="row" spacing={1.5} alignItems="center">
                                                <Avatar sx={{ bgcolor: '#FFC107', color: 'black', fontWeight: 'bold', width: 38, height: 38 }}>
                                                    {u.firstName?.[0]?.toUpperCase() || 'U'}
                                                </Avatar>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 600, color: 'white' }}>
                                                        {u.firstName} {u.lastName}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </TableCell>

                                        {/* Email */}
                                        <TableCell sx={{ borderColor: '#232D42', color: '#CBD5E1' }}>
                                            {u.email}
                                        </TableCell>

                                        {/* Phone */}
                                        <TableCell sx={{ borderColor: '#232D42', color: '#CBD5E1' }}>
                                            {u.phone ? `+91 ${u.phone}` : '—'}
                                        </TableCell>

                                        {/* QR Status Chip */}
                                        <TableCell sx={{ borderColor: '#232D42' }}>
                                            <Chip
                                                icon={<QrCode2Icon />}
                                                label={isQrActive ? 'Active' : 'Deactivated'}
                                                size="small"
                                                sx={{
                                                    bgcolor: isQrActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                                    color: isQrActive ? '#10B981' : '#EF4444',
                                                    fontWeight: 600,
                                                    border: `1px solid ${isQrActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                                                }}
                                            />
                                        </TableCell>

                                        {/* Action Button: Deactivate QR / Activate QR */}
                                        <TableCell align="center" sx={{ borderColor: '#232D42' }}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                disabled={isUpdating}
                                                onClick={() => handleToggleQR(u._id, isQrActive)}
                                                sx={{
                                                    minWidth: 130,
                                                    fontWeight: 'bold',
                                                    borderRadius: 2,
                                                    textTransform: 'none',
                                                    bgcolor: isQrActive ? '#EF4444' : '#10B981',
                                                    color: 'white',
                                                    ':hover': {
                                                        bgcolor: isQrActive ? '#DC2626' : '#059669',
                                                    },
                                                }}
                                            >
                                                {isUpdating ? (
                                                    <CircularProgress size={18} sx={{ color: 'white' }} />
                                                ) : isQrActive ? (
                                                    'Deactivate QR'
                                                ) : (
                                                    'Activate QR'
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default AdminDashboard;