import React from 'react';
import { Typography } from '@mui/material';
import toast from 'react-hot-toast';

export const handleDownloadQR = () => {
    const svgElement = document.getElementById("parking-qr-code");
    if (!svgElement) return;

    if (!svgElement.getAttribute("xmlns")) {
        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // High resolution for 300 DPI sticker printing
    const W = 800;
    const H = 940;
    canvas.width = W;
    canvas.height = H;

    const qrImg = new Image();
    const logoImg = new Image();

    const roundRect = (x, y, w, h, r) => {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
    };

    const renderTag = () => {
        const borderColor = "#D97706";

        // 1. Background
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, W, H);

        // 2. Outer Dark Yellow Border
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 14;
        roundRect(14, 14, W - 28, H - 28, 38);
        ctx.stroke();

        // 3. Inner Dashed Safety Line
        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 3;
        ctx.setLineDash([16, 10]);
        roundRect(26, 26, W - 52, H - 52, 30);
        ctx.stroke();
        ctx.setLineDash([]);

        // 4. Logo
        const logoW = 540;
        const logoAspectRatio = (logoImg.width && logoImg.height) ? (logoImg.height / logoImg.width) : 0.255;
        const logoH = logoW * logoAspectRatio;
        const logoX = (W - logoW) / 2;
        const logoY = 38;

        if (logoImg.complete && logoImg.naturalWidth > 0) {
            ctx.drawImage(logoImg, logoX, logoY, logoW, logoH);
        } else {
            ctx.fillStyle = borderColor;
            ctx.font = "800 36px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText("SolvePark", W / 2, logoY + 50);
        }

        // 5. Center QR Code Frame
        const qrSize = 340;
        const qrFramePad = 16;
        const frameSize = qrSize + 2 * qrFramePad;
        const frameX = (W - frameSize) / 2;
        const frameY = logoY + logoH + 22;

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 4;
        roundRect(frameX, frameY, frameSize, frameSize, 20);
        ctx.fill();
        ctx.stroke();

        // Corner Accents
        const arm = 30;
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";

        // TL
        ctx.beginPath();
        ctx.moveTo(frameX + arm, frameY); ctx.lineTo(frameX, frameY); ctx.lineTo(frameX, frameY + arm);
        ctx.stroke();
        // TR
        ctx.beginPath();
        ctx.moveTo(frameX + frameSize - arm, frameY); ctx.lineTo(frameX + frameSize, frameY); ctx.lineTo(frameX + frameSize, frameY + arm);
        ctx.stroke();
        // BL
        ctx.beginPath();
        ctx.moveTo(frameX, frameY + frameSize - arm); ctx.lineTo(frameX, frameY + frameSize); ctx.lineTo(frameX + arm, frameY + frameSize);
        ctx.stroke();
        // BR
        ctx.beginPath();
        ctx.moveTo(frameX + frameSize - arm, frameY + frameSize); ctx.lineTo(frameX + frameSize, frameY + frameSize); ctx.lineTo(frameX + frameSize, frameY + frameSize - arm);
        ctx.stroke();

        // Draw QR
        ctx.drawImage(qrImg, frameX + qrFramePad, frameY + qrFramePad, qrSize, qrSize);

        // Banner below QR
        const scanPillW = 380;
        const scanPillH = 34;
        const scanPillX = (W - scanPillW) / 2;
        const scanPillY = frameY + frameSize + 12;

        ctx.fillStyle = "#F59E0B";
        roundRect(scanPillX, scanPillY, scanPillW, scanPillH, 10);
        ctx.fill();

        ctx.fillStyle = "#0F172A";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SCAN TO CONTACT OWNER", W / 2, scanPillY + 23);

        // 6. Notice 1: Parking Inconvenience (Polite Tone)
        const noticeW = W - 72;
        const notice1H = 92;
        const noticeX = 36;
        const notice1Y = scanPillY + scanPillH + 16;

        ctx.fillStyle = "#FFFBEB";
        ctx.strokeStyle = "#F59E0B";
        ctx.lineWidth = 2;
        roundRect(noticeX, notice1Y, noticeW, notice1H, 14);
        ctx.fill();
        ctx.stroke();

        ctx.textAlign = "left";
        ctx.fillStyle = "#B45309";
        ctx.font = "bold 16.5px sans-serif";
        ctx.fillText("⚠️ PARKING INCONVENIENCE?", noticeX + 18, notice1Y + 28);

        ctx.fillStyle = "#334155";
        ctx.font = "500 14px sans-serif";
        ctx.fillText("If this bike is troubling you or parked improperly, please scan to contact", noticeX + 18, notice1Y + 53);
        ctx.fillText("the owner directly before taking any action. Let's resolve it politely!", noticeX + 18, notice1Y + 75);

        // 7. Notice 2: Emergency / Unconscious Owner Alert
        const notice2H = 92;
        const notice2Y = notice1Y + notice1H + 12;

        ctx.fillStyle = "#FEF2F2";
        ctx.strokeStyle = "#EF4444";
        ctx.lineWidth = 2;
        roundRect(noticeX, notice2Y, noticeW, notice2H, 14);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#DC2626";
        ctx.font = "bold 16.5px sans-serif";
        ctx.fillText("🚨 EMERGENCY / UNCONSCIOUS OWNER", noticeX + 18, notice2Y + 28);

        ctx.fillStyle = "#334155";
        ctx.font = "500 14px sans-serif";
        ctx.fillText("If you find the bike owner unconscious, injured, or in medical distress,", noticeX + 18, notice2Y + 53);
        ctx.fillText("scan immediately to access emergency contacts & notify family.", noticeX + 18, notice2Y + 75);

        // 8. Footer
        ctx.fillStyle = "#94A3B8";
        ctx.font = "600 13px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("SolvePark • Park Smart, Stay Safe • www.solvepark.com", W / 2, H - 40);

        // 9. Instant Native PNG Download (Only 4 lines!)
        const a = document.createElement("a");
        a.download = "SolvePark_Bike_Tag.png";
        a.href = canvas.toDataURL("image/png");
        a.click();

        toast.success(
            <Typography sx={{ color: '#94A3B8', textAlign: 'center', fontSize: 14 }}>
                Bike Safety Tag downloaded successfully!
            </Typography>
        );
    };

    let loadedCount = 0;
    let rendered = false;
    const checkReady = () => {
        loadedCount++;
        if (loadedCount === 2 && !rendered) {
            rendered = true;
            renderTag();
        }
    };

    qrImg.onload = checkReady;
    logoImg.onload = checkReady;
    qrImg.onerror = checkReady;
    logoImg.onerror = () => {
        console.warn("Could not load logo from '/logo2.png' - rendering cleanly");
        checkReady();
    };

    qrImg.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
    logoImg.src = '/logo2.png';
};