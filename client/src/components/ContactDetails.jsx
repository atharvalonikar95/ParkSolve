import { Box, Button, Stack, TextField, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CompleteProfile } from "../services/userService";
import { useAuth } from "../context/AuthProvider";
import EditContacts from "./EditContacts";
import ContactCards from "./ContactCards";
import toast from "react-hot-toast";

const initialContact = {
    name: "",
    phone: "",
    relation: "",
};
const MAX_CONTACTS = 2;
const ContactDetails = () => {

    const { user, setUser } = useAuth();

    const [existingContacts, setExistingContacts] = useState(user?.emergencyContacts || []);
    const [contacts, setContacts] = useState([]);
    const [editContacts, setEditContacts] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Sync with auth user state
    useEffect(() => {
        if (user?.emergencyContacts) {
            setExistingContacts(user.emergencyContacts);
        }
    }, [user]);

    // Initial form visibility rule: 1 form if 0 contacts; 0 forms if contacts already exist
    useEffect(() => {
        if (existingContacts.length === 0) {
            setContacts([
                { ...initialContact },
            ]);
        } else {
            setContacts([]);
        }
    }, [existingContacts]);

    const handleOpen = () => {
        setEditContacts(existingContacts ? [...existingContacts] : []);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setContacts((prevContacts) =>
            prevContacts.map((contact, i) =>
                i === index ? { ...contact, [name]: value } : contact
            )
        );
    };

    const handleEditChange = (index, e) => {
        const { name, value } = e.target;
        setEditContacts((prev) =>
            prev.map((contact, i) =>
                i === index ? { ...contact, [name]: value } : contact
            )
        );
    };

    const addContact = () => {
        if (contacts.length + existingContacts.length < MAX_CONTACTS) {
            setContacts((prevContacts) => [
                ...prevContacts,
                { ...initialContact },
            ]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const payload = existingContacts.length === 0
                ? contacts
                : [...existingContacts, ...contacts];

            const data = await toast.promise(
                CompleteProfile(payload), // 1. Pass the raw promise (do NOT await here)
                {
                    loading: (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            Saving profile...
                        </Typography>
                    ),
                    success: (data) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {data?.message || 'Profile saved successfully!'}
                        </Typography>
                    ),
                    error: (error) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {error?.response?.data?.message || 'Failed to save profile.'}
                        </Typography>
                    ),
                }
            );
            console.log("Profile saved:", data);
            setExistingContacts(payload);
            setContacts([]);

            if (setUser) {
                setUser((prev) => ({
                    ...prev,
                    emergencyContacts: payload,
                }));
            }
        } catch (error) {
            console.log("Error saving profile:", error);
            toast.error(
                <Typography sx={{ color: '#94A3B8', textAlign: 'center', justifyItems: 'center', fontSize: 14, }}>{error?.response?.data?.message}</Typography>,
            );
        } finally {
            setLoading(false);
        }
    };

    const handleEditSuccess = (updatedContacts) => {
        setExistingContacts(updatedContacts);
        if (setUser) {
            setUser((prev) => ({
                ...prev,
                emergencyContacts: updatedContacts,
            }));
        }
    };

    const BtnStyle = {
        backgroundColor: '#FFC107',
        color: "black",
        borderRadius: 2,
        fontWeight: 'bold',
        py: 1,
        ':hover': { backgroundColor: '#FFB300', color: "black" },
        width: { xs: '90%', sm: '70%', md: '60%' }
    };

    const inputStyles = {
        width: { xs: '90%', sm: '70%', md: '60%' },
        p: 1,
        '& .MuiInputBase-input': { color: 'white' },
        '& .MuiInput-underline:before': { borderBottomColor: '#232D42' },
        '& .MuiInput-underline:hover:before': { borderBottomColor: '#FFC107' },
        '& .MuiInput-underline:after': { borderBottomColor: '#FFC107' },
    };

    return (
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 4 }}>
            <Typography variant="h4" textAlign="center" sx={{ color: 'white', fontWeight: 'bold' }}>
                Emergency Contact Details
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
            >
                {/* 1. Existing Contact Cards */}
                {existingContacts.length > 0 && (
                    <Box sx={{ width: '100%', mb: 3 }}>
                        <ContactCards
                            contacts={existingContacts}
                            handleDeleteSuccess={handleEditSuccess}
                            onUpdate={handleEditSuccess}
                        />
                    </Box>
                )}

                {/* 2. New Contact Form Fields */}
                {contacts.map((contact, index) => (
                    <Box
                        key={index}
                        sx={{
                            mb: 3,
                            width: '100%',
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            p: 2,
                            gap: 2,
                            bgcolor: '#131A2B',
                            borderRadius: 3,
                            border: '1px solid #232D42'
                        }}
                    >
                        <Typography variant="h6" sx={{ color: '#FFC107' }}>
                            Contact {existingContacts.length + index + 1}
                        </Typography>

                        <TextField
                            variant="standard"
                            name="name"
                            value={contact.name}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Name"
                            required
                            sx={inputStyles}
                        />

                        <TextField
                            variant="standard"
                            name="relation"
                            value={contact.relation}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Relation"
                            required
                            sx={inputStyles}
                        />

                        <TextField
                            variant="standard"
                            name="phone"
                            value={contact.phone}
                            onChange={(e) => handleChange(index, e)}
                            placeholder="Phone"
                            type="tel"
                            required
                            sx={inputStyles}
                        />

                        {/* 👈 Cancel or Remove button */}
                        {(contacts.length > 1 || existingContacts.length > 0) && (
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    if (existingContacts.length > 0) {
                                        setContacts([]);
                                    } else {
                                        setContacts((prev) => prev.filter((_, i) => i !== index));
                                    }
                                }}
                                sx={{ width: { xs: '90%', sm: '70%', md: '60%' }, mt: 1 }}
                            >
                                {existingContacts.length > 0 ? "Cancel" : "Remove"}
                            </Button>
                        )}
                    </Box>
                ))}

                {/* 3. Action Buttons */}
                <Stack alignItems="center" gap={2} sx={{ width: '100%', mt: 2 }}>

                    {/* Add another contact button */}
                    {(contacts.length + existingContacts.length) < MAX_CONTACTS && (
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={addContact}
                            sx={{
                                ...BtnStyle,
                                bgcolor: 'transparent',
                                color: '#FFC107',
                                border: '1px solid #FFC107',
                                ':hover': { bgcolor: 'rgba(255, 193, 7, 0.1)', borderColor: '#FFB300' }
                            }}
                        >
                            Add another contact
                        </Button>
                    )}

                    {/* Save Profile button */}
                    {contacts.length > 0 && (
                        <Button
                            disabled={loading}
                            type="submit"
                            variant="contained"
                            sx={BtnStyle}
                        >
                            {loading ? "Saving..." : "Save Profile"}
                        </Button>
                    )}

                    {/* Edit contacts button */}
                    {existingContacts.length > 0 && contacts.length === 0 && (
                        <>
                            <Typography sx={{ textAlign: 'center', color: '#94A3B8', mt: 1 }}>
                                If you want to make changes, choose Edit Contacts:
                            </Typography>
                            <Button sx={BtnStyle} onClick={handleOpen}>
                                Edit Emergency contacts
                            </Button>
                        </>
                    )}
                </Stack>

                <EditContacts
                    open={open}
                    onClose={handleClose}
                    contacts={editContacts}
                    handleEditChange={handleEditChange}
                    setContacts={setEditContacts}
                    existingContacts={existingContacts.length}
                    MAX_CONTACTS={MAX_CONTACTS}
                    loading={loading}
                    onSuccess={handleEditSuccess}
                />
            </Box>
        </Container>
    );
};

export default ContactDetails;