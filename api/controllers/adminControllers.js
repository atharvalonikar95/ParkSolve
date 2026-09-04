import User from "../models/User.js"

export const fetchUsers = async (req, res) => {
    try {
        const userId = req.user?._id
        console.log(userId)
        if (!userId) {
            res.status(401).json({
                message: "unauthorized",
                success: false
            })
        }
        const user = await User.findById(userId)
        if (!user) {
            res.status(404).json({
                message: "user not found",
                success: false
            })
        }
        if (user.role !== 'admin') {
            res.status(403).json({
                message: "Access Restricted ",
                success: false
            })
        }
        const users = await User.find({})
        res.status(200).json({
            message: "Users fetched Successfully.",
            success: true,
            users
        })
    } catch (error) {
        return res.status(500).json({
            message: "failed to fetched Users.",
            success: false
        })
    }
}

export const changeQRStatus = async (req, res) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId)
        user.qrActive = !user.qrActive
        await user.save()

        return res.status(200).json({
            message: "qr status changed Successfully.",
            success: true,
            qrStatus:user.qrActive
        })

    } catch (error) {
        return res.status(500).json({
            message: " failed to qr status.",
            success: false
        })
    }
}