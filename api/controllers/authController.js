import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import redisClient from "../config/redis.js"
import { use } from "react"
import { sendVerificationEmail } from "../helpers/sendMail.js"
export const signUp = async (req, res) => {
    const { firstName, lastName, email } = await req.body
    try {
        if (!email) {
            res.status(400).json({
                message: "email is required"
            })
        }
        if (!firstName) {
            res.status(400).json({
                message: "firstName is required"
            })
        }

        if (!lastName) {
            res.status(400).json({
                message: "lastName is required"
            })
        }

        const emailFound = await User.findOne({ email })

        if (emailFound && emailFound.isEmailVerified) {
            return res.status(400).json({
                message: "Already verified user exists.",
                success: false
            })
        }

        if (emailFound) {
            return res.status(400).json({
                message: "Please verify user exists.",
                success: false
            })
        }
        // const salt = await bcrypt.genSalt(10)
        // const hashedPassword = await bcrypt.hash(password, salt)
        const otp = Math.floor(Math.random() * 10000)
        const otpExpiry = new Date(Date.now() + 0.5 * 60 * 1000)
        const user = new User({
            firstName,
            lastName,
            email,
            otp,
            otpExpiry
            // password: hashedPassword
        })

        await user.save()
        const fullName = `${user.firstName} ${user.lastName}`
        await sendVerificationEmail(email,fullName,otp)
        return res.status(200).json({
            success: true,
            message: "verification code sent successfully",
            // user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while creating user",
            error: error.message
        })

    }
}

export const login = async (req, res) => {

    const { email, password } = req.body
    if (!email) {
        res.status(400).json({
            message: "email is required"
        })
    }
    if (!password) {
        res.status(400).json({
            message: "password is required"
        })
    }

    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "user with this email is not registered please signup ",
                success: false
            })
        }
        //check password

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            res.status(400).json({
                message: "invalid credentials"
            })
        }
        const sessionId = crypto.randomUUID();
        await redisClient.set(
            `session:${sessionId}`,
            JSON.stringify({
                userId: user._id,
                // role: user.role
            }),
            {
                EX: 60 * 60 * 24 // 1 day 
            }
        );

        const tokenPayload = { _id: user._id, role: user.role, sessionId }//  add role lateral  
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "1d" })
        const isProd = process.env.NODE_ENV === 'production';

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProd, // true in production (requires HTTPS)
            sameSite: isProd ? 'none' : 'lax', // 'none' for cross-site in prod
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "login successful",
            user,
            // token
        })

    } catch (error) {
        console.log("LOGIN ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "error while login",
            error: error.message
        })
    }



}

export const logout = async (req, res) => {
    try {
        const token = req.cookies.token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        await redisClient.del(
            `session:${decoded.sessionId}`
        );

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        })
        return res.status(200).json({
            success: true,
            message: "logout successful"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while logging out",
            error: error.message
        })

    }

}

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    try {
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "old password and new password are required"
            })
        }
        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "new password must be different from old password"
            })
        }
        const user = await User.findById(req.user._id)
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "old password is incorrect"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
        await user.save()
        return res.status(200).json({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while changing password",
            error: error.message
        })
    }
}

export const generateOTP = async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(400).json({
            message: "email is required"
        })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        const otp = Math.floor(Math.random() * 10000)
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)
        user.otp = otp
        user.otpExpiresAt = otpExpiry
        await user.save();

        const fullName = `${user.firstName} ${user.lastName}`
        await sendVerificationEmail(email, fullName, otp)
        return res.status(200).json({
            message: "otp generated successfully",
            success: true,
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }

}
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.body
    if (!email) {
        return res.status(400).json({
            message: "email is required"
        })
    }
    if (!otp) {
        return res.status(400).json({
            message: "otp is required"
        })
    }
    try {
        console.log(email, otp)
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        if (Date.now() > user.otpExpiresAt) {
            return res.status(400).json({
                message: "otp expired",
                success: false
            })
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "otp mismatched",
                success: false
            })
        }
        if(!user.isEmailVerified){
            user.isEmailVerified=true
            await user.save();
        }
        return res.status(200).json({
            message: "otp verified",
            success: true
        })



    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "server error",
            error: error.message
        })
    }
}

export const resetPassword = async (req, res) => {
    const { email, password } = req.body
    if (!email) {
        return res.status(400).json({
            message: "email is required"
        })
    }
    if (!password) {
        return res.status(400).json({
            message: "password is required"
        })
    }
    console.log(email, password)
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
        await user.save()
        return res.status(200).json({
            success: true,
            message: "password changed successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while changing password",
            error: error.message
        })
    }
}

export const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        if (!user) {
            res.status(400).json({
                message: "user not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "user profile",
            user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error while fetching user profile",
            error: error.message
        })
    }

}

