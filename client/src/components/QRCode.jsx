import React, { useEffect, useState, useRef } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography,
    Paper,
    Container,
    Divider,
    IconButton,
    Tooltip
} from '@mui/material';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RefreshIcon from '@mui/icons-material/Refresh';
import { getMyQR, newQR } from '../services/userService';
import { QRCodeSVG } from "qrcode.react";
import toast from 'react-hot-toast';
import { handleDownloadQR } from '../helpers/DownloadQR';

const QRCode = () => {
    const [qrUrl, setQrUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [showQR, setShowQR] = useState(true);

    const generateQR = async () => {
        try {
            setGenerating(true);
            // const res = await newQR();
            const res = await toast.promise(
                newQR(),
                {
                    loading: (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            Generating QR...
                        </Typography>
                    ),
                    success: (data) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {data?.message || 'QR generated successfully!'}
                        </Typography>
                    ),
                    error: (error) => (
                        <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                            {error?.response?.data?.message || 'Failed to generate QR.'}
                        </Typography>
                    ),
                }
            );
            console.log("Generated QR:", res);
            if (res.success) {
                setQrUrl(res.qrUrl);
                setShowQR(true);
            }
        } catch (error) {
            console.log("Generate QR error:", error.message);
        } finally {
            setGenerating(false);
        }
    };

    const fetchQR = async () => {
        try {
            setLoading(true);
            const res = await getMyQR();
            console.log("Fetched QR:", res);
            if (res.success && res.qrUrl) {
                setQrUrl(res.qrUrl);
            }
        } catch (error) {
            console.log("Fetch QR error:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQR();
    }, []);

    // Function to download the QR code as a PNG image
    // const handleDownloadQR = () => {
    //     const svgElement = document.getElementById("parking-qr-code");
    //     if (!svgElement) return;

    //     const svgData = new XMLSerializer().serializeToString(svgElement);
    //     const canvas = document.createElement("canvas");
    //     const ctx = canvas.getContext("2d");
    //     const img = new Image();

    //     img.onload = () => {
    //         canvas.width = img.width + 40;
    //         canvas.height = img.height + 40;
    //         ctx.fillStyle = "#ffffff";
    //         ctx.fillRect(0, 0, canvas.width, canvas.height);
    //         ctx.drawImage(img, 20, 20);

    //         const pngFile = canvas.toDataURL("image/png");
    //         const downloadLink = document.createElement("a");
    //         downloadLink.download = "Parking_Sathi_QR.png";
    //         downloadLink.href = pngFile;
    //         downloadLink.click();
    //     };

    //     img.src = "data:image/svg+xml;base64," + btoa(svgData);
    //     toast.success(
    //         <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
    //             QR code downloaded successfully!
    //         </Typography>
    //     );
    // };


    const BtnStyle = {
        backgroundColor: '#FFC107',
        color: 'black',
        fontWeight: 'bold',
        borderRadius: 2,
        py: 1.2,
        ':hover': { backgroundColor: '#FFB300' }
    };

    return (
        <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 }, display: 'flex', justifyContent: 'center' }}>
            <Paper
                elevation={0}
                sx={{
                    width: '100%',
                    bgcolor: '#131A2B',
                    color: '#FFFFFF',
                    borderRadius: 4,
                    border: '1px solid #232D42',
                    p: { xs: 3, sm: 4 },
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3
                }}
            >
                {/* Header Icon & Title */}
                <Box>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            bgcolor: 'rgba(255, 193, 7, 0.1)',
                            color: '#FFC107',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 1.5,
                        }}
                    >
                        <QrCode2Icon sx={{ fontSize: 32 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                        Vehicle Parking QR Pass
                    </Typography>
                    <Typography sx={{ color: '#94A3B8', fontSize: 14, mt: 0.5, maxWidth: 360 }}>
                        Stick this QR code on your vehicle. Anyone can scan it in emergencies or parking issues.
                    </Typography>
                </Box>

                <Divider sx={{ width: '100%', borderColor: '#232D42' }} />

                {/* Loading State */}
                {loading ? (
                    <Box sx={{ py: 6 }}>
                        <CircularProgress sx={{ color: '#FFC107' }} />
                        <Typography sx={{ color: '#94A3B8', mt: 2, fontSize: 14 }}>
                            Loading your QR code...
                        </Typography>
                    </Box>
                ) : !qrUrl ? (
                    /* If no QR exists yet */
                    <Box sx={{ py: 4, width: '100%' }}>
                        <Typography sx={{ color: '#94A3B8', mb: 3 }}>
                            You haven't generated a parking QR pass yet.
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={generateQR}
                            disabled={generating}
                            sx={BtnStyle}
                        >
                            {generating ? <CircularProgress size={24} color="inherit" /> : "Generate Parking QR"}
                        </Button>
                    </Box>
                ) : (
                    /* When QR exists */
                    <Stack spacing={3} alignItems="center" sx={{ width: '100%' }}>
                        {showQR ? (
                            <Box
                                sx={{
                                    bgcolor: '#FFFFFF',
                                    p: 2.5,
                                    borderRadius: 3,
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <QRCodeSVG
                                    id="parking-qr-code"
                                    value={qrUrl}
                                    size={220}
                                    level="H"
                                    includeMargin={false}
                                />
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    height: 250,
                                    width: 250,
                                    bgcolor: '#0B0F1A',
                                    borderRadius: 3,
                                    border: '1px dashed #232D42',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    color: '#94A3B8',
                                    gap: 1
                                }}
                            >
                                <VisibilityOffIcon sx={{ fontSize: 40 }} />
                                <Typography variant="body2">QR Code Hidden</Typography>
                            </Box>
                        )}

                        <Typography variant="body2" sx={{ color: '#94A3B8', fontSize: 13 }}>
                            {showQR ? "Scan with any camera or scanner app." : "Click 'Show QR' below to reveal."}
                        </Typography>

                        {/* Action Buttons */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
                            {/* Download Button */}
                            {showQR && (
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleDownloadQR}
                                    startIcon={<DownloadIcon />}
                                    sx={BtnStyle}
                                >
                                    Download QR
                                </Button>
                            )}

                            {/* Toggle Show/Hide Button */}
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setShowQR(!showQR)}
                                startIcon={showQR ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                sx={{
                                    borderColor: '#FFC107',
                                    color: '#FFC107',
                                    py: 1.2,
                                    ':hover': { borderColor: '#FFB300', bgcolor: 'rgba(255, 193, 7, 0.08)' }
                                }}
                            >
                                {showQR ? 'Hide QR' : 'Show QR'}
                            </Button>
                        </Stack>

                        {/* Regenerate Button */}
                        <Button
                            variant="text"
                            size="small"
                            onClick={generateQR}
                            disabled={generating}
                            startIcon={<RefreshIcon />}
                            sx={{ color: '#94A3B8', fontSize: 13, textTransform: 'none', ':hover': { color: '#FFC107' } }}
                        >
                            {generating ? "Regenerating..." : "Regenerate new QR pass"}
                        </Button>
                    </Stack>
                )}
            </Paper>
        </Container>
    );
};

export default QRCode;