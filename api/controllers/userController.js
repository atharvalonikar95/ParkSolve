import { use } from "react";
import User from "../models/User.js";

export const completeProfile = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }

        const { contacts } = req.body;
        console.log(contacts)
        // Validate contacts
        if (!contacts || !Array.isArray(contacts)) {
            return res.status(400).json({
                success: false,
                message: "Contacts must be an array",
            });
        }

        // Maximum 2 contacts
        if (contacts.length > 2) {
            return res.status(400).json({
                success: false,
                message: "Maximum 2 emergency contacts allowed",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Add contacts
        user.emergencyContacts = contacts;
        // user.emergencyContacts.push(...contacts);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Emergency contacts added successfully",
            emergencyContacts: user.emergencyContacts,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating user profile",
            error: error.message,
        });
    }
};

export const setPhone = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const { phone } = req.body
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        user.phone = phone;
        if (user.email && user.phone && user.firstName && user.lastName && Array.isArray(user.emergencyContacts) && user.emergencyContacts.length !== 0) {
            user.profileCompleted = true
        }
        user.save();
        return res.status(200).json({
            success: true,
            message: "phone added enter correct otp to verify",
            phone,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating user profile",
            error: error.message,
        });
    }
}

export const getVehicleByQR = async (req, res) => {
    try {
        const { qrToken } = req.params;

        const user = await User.findOne({ qrToken }).select(
            "firstName lastName phone emergencyContacts"
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "QR code not found",
            });
        }

        return res.status(200).json({
            success: true,
            user: {
                name: `${user.firstName} ${user.lastName}`,
                phone: user.phone,
                emergencyContacts: user.emergencyContacts,
            },
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch QR information",
        });
    }
};
export const generateQR = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if(user.profileCompleted===false){
            return res.status(301).json({
                success: false,
                message: "Profile not Completed.",
            });
        }
        const qrToken = crypto.randomUUID();

        if (!user.qrToken) {
            user.qrToken = qrToken
            user.qrActive = true
            await user.save();
        }
        const qrUrl = `http://localhost:3000/vehicle/${user.qrToken}`;

        return res.status(200).json({
            success: true,
            message: "QR code Generated Successfully. ",
            qrUrl,
            qrToken: user.qrToken

        })

    } catch (error) {
        console.error("Generate QR error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to generate QR",
            error: error.message,
        });
    }
}



export const getQR = async (req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const user = await User.findById(userId).select('qrActive qrToken ');

        if (!user || !user.qrToken) {
            return res.status(404).json({
                success: false,
                message: "QR code not found",
            });
        }
        const qrUrl = `http://localhost:3000/vehicle/${user.qrToken}`;
        return res.status(200).json({
            success: true,
            message: "QR code fetched Successfully.",
            qrToken: user.qrToken,
            qrActive: user.qrActive,
            qrUrl
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch QR information",
        });
    }
}

export const deleteContact = async(req, res) => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated",
            });
        }
        const user = await User.findById(userId);

        if (!user ) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const { id } = req.body
        // console.log("contact id : ",id)
        if (!id ) {
            return res.status(400).json({
                success: false,
                message: "id not provided",
            });
        }
        if(user.emergencyContacts.length===0){
            return res.status(400).json({
                success:false,
                message:"No Emergency contacts Exist."
            })
        }
        const filteredContacts= user.emergencyContacts.filter((contact)=>contact._id.toString() !==id);
        user.emergencyContacts=filteredContacts;
        await user.save()
        return res.status(200).json({
            success:true,
            message:'contact deleted Successfully.'
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete Contact.",
        });
    }
}