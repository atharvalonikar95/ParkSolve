import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IconButton, Modal, Paper, Stack } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { deleteEmergencyContact } from '../services/userService';
import toast from 'react-hot-toast';

const ContactCards = ({ contacts = [], handleDeleteSuccess }) => {
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleOpen = (id) => {
        setSelectedId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setSelectedId(null);
        setOpen(false);
    };

    const handleDeleteContact = async () => {
        if (selectedId === null) return;
        try {
            setLoading(true);
            const res = await deleteEmergencyContact(selectedId);
            console.log("Deleted contact:", res);
            toast.success(
                <Typography sx={{ color: '#94A3B8', textAlign: 'center', justifyItems: 'center', fontSize: 14, }}>{res.message}</Typography>,
            );
            const updatedContacts = contacts.filter((contact) => contact._id !== selectedId);

            if (handleDeleteSuccess) {
                handleDeleteSuccess(updatedContacts);

            }
            handleClose();
        } catch (error) {
            console.log("Delete error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!contacts || contacts.length === 0) return null;

    return (
        <Paper
            elevation={0}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                p: { xs: 1, sm: 2 },
                gap: 3,
                borderRadius: 2,
                mb: 2,
                bgcolor: "inherit",
            }}
        >
            {contacts.map((contact) => (
                <Card
                    elevation={2}
                    key={contact._id}
                    sx={{
                        minWidth: 260,
                        position: 'relative',
                        p: 1.5,
                        borderRadius: 3,
                        bgcolor: '#131A2B',
                        color: 'white',
                        border: '1px solid #232D42'
                    }}
                >
                    {/* 👈 Clean IconButton (no nested button) */}
                    <IconButton
                        onClick={() => handleOpen(contact._id)}
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            bgcolor: '#d32f2f',
                            height: 34,
                            width: 34,
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            borderBottomLeftRadius: 10,
                            ':hover': {
                                bgcolor: '#b71c1c',
                            }
                        }}
                    >
                        <ClearIcon sx={{ color: "#FFFFFF", fontSize: 18 }} />
                    </IconButton>

                    <CardContent sx={{ pt: 2.5 }}>
                        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold', mb: 0.5 }}>
                            {contact.name}
                        </Typography>
                        <Typography sx={{ color: '#90CAF9', fontSize: 14 }}>
                            Relation: {contact.relation}
                        </Typography>
                        <Typography sx={{ color: '#E0E0E0', fontSize: 14, mt: 0.5 }}>
                            Phone: {contact.phone}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 2
                }}
            >
                <Box
                    sx={{
                        bgcolor: '#0B0F1A',
                        color: 'white',
                        border: '1px solid #232D42',
                        borderRadius: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 3,
                        p: 4,
                        width: '100%',
                        maxWidth: 420
                    }}
                >
                    <Typography sx={{ fontSize: 18, textAlign: 'center', fontWeight: 500 }}>
                        Are you sure you want to delete this emergency contact?
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{ width: "100%", justifyContent: 'center' }}>
                        <Button
                            variant="outlined"
                            onClick={handleClose}
                            sx={{ color: 'white', borderColor: '#475569', px: 3 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={loading}
                            onClick={handleDeleteContact}
                            color="error"
                            variant="contained"
                            sx={{ px: 3 }}
                        >
                            {loading ? "Deleting..." : "Delete"}
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            {/* Delete Confirmation Modal */}
        </Paper>
    );
};

export default ContactCards;