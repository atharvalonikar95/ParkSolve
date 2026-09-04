import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { useAuth } from '../context/AuthProvider';
import { CompleteProfile } from '../services/userService';

const EditContacts = ({ 
    open, 
    onClose, 
    handleEditChange, 
    contacts = [], 
    setContacts, 
    MAX_CONTACTS = 2, 
    onSuccess 
}) => {
    const [loading, setLoading] = useState(false);
    const { setUser } = useAuth();

    const handleAddContact = () => {
        if (contacts.length < MAX_CONTACTS) {
            setContacts((prev) => [
                ...prev,
                { name: "", phone: "", relation: "" }
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await CompleteProfile(contacts);
            console.log("Updated emergency contacts:", data);

            // Update parent component
            if (onSuccess) {
                onSuccess([...contacts]);
            }

            // Update Auth Context
            if (setUser) {
                setUser((prev) => ({
                    ...prev,
                    emergencyContacts: [...contacts],
                }));
            }

            onClose();
        } catch (error) {
            console.log("Error saving edited contacts:", error);
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        p: 0.5,
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiInput-underline:before': { borderBottomColor: '#232D42' },
        '& .MuiInput-underline:hover:before': { borderBottomColor: '#FFC107' },
        '& .MuiInput-underline:after': { borderBottomColor: '#FFC107' },
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    maxWidth: "92vw",
                    bgcolor: "#0B0F1A",
                    color: "#FFFFFF",
                    border: "1px solid #232D42",
                    boxShadow: 24,
                    borderRadius: 3,
                    p: { xs: 3, sm: 4 },
                    maxHeight: "85vh",
                    overflowY: "auto",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1, color: '#FFFFFF' }}>
                    Edit Emergency Contacts
                </Typography>

                <Typography sx={{ color: '#94A3B8', fontSize: 14, mb: 3 }}>
                    Current contacts: {contacts?.length} / {MAX_CONTACTS}
                </Typography>

                {/* List of contact fields */}
                {contacts.map((contact, index) => (
                    <Box 
                        key={index} 
                        sx={{ 
                            mb: 3, 
                            p: 2.5, 
                            bgcolor: '#131A2B', 
                            borderRadius: 2, 
                            border: '1px solid #232D42',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Typography sx={{ color: '#FFC107', fontWeight: 600 }}>
                            Contact {index + 1}
                        </Typography>

                        <TextField
                            variant="standard"
                            name="name"
                            value={contact.name}
                            onChange={(e) => handleEditChange(index, e)}
                            fullWidth
                            placeholder="Name"
                            required
                            sx={inputStyle}
                        />

                        <TextField
                            variant="standard"
                            name="relation"
                            value={contact.relation}
                            onChange={(e) => handleEditChange(index, e)}
                            fullWidth
                            placeholder="Relation"
                            required
                            sx={inputStyle}
                        />

                        <TextField
                            variant="standard"
                            name="phone"
                            value={contact.phone}
                            onChange={(e) => handleEditChange(index, e)}
                            fullWidth
                            placeholder="Phone"
                            type="tel"
                            required
                            sx={inputStyle}
                        />

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => {
                                setContacts((prevContacts) =>
                                    prevContacts.filter((_, i) => i !== index)
                                );
                            }}
                            sx={{ alignSelf: 'flex-start', mt: 1 }}
                        >
                            Delete
                        </Button>
                    </Box>
                ))}

                {/* Add Another Contact Button */}
                {contacts.length < MAX_CONTACTS && (
                    <Button
                        fullWidth
                        type="button"
                        variant="outlined"
                        onClick={handleAddContact}
                        sx={{
                            mb: 3,
                            borderColor: '#FFC107',
                            color: '#FFC107',
                            py: 1,
                            ':hover': { borderColor: '#FFB300', bgcolor: 'rgba(255, 193, 7, 0.08)' }
                        }}
                    >
                        + Add another contact
                    </Button>
                )}

                {/* Save Button */}
                <Button
                    fullWidth
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    sx={{
                        backgroundColor: '#FFC107',
                        color: 'black',
                        fontWeight: 'bold',
                        py: 1.2,
                        borderRadius: 2,
                        ':hover': { backgroundColor: '#FFB300' }
                    }}
                >
                    {loading ? "Saving..." : "Save Profile"}
                </Button>
            </Box>
        </Modal>
    );
};

export default EditContacts;