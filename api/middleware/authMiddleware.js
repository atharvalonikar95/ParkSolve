import redisClient from "../config/redis.js";
import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "not authorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('authMiddleware: token decoded', decoded);

        if (decoded.sessionId && redisClient) {
            try {
                const sessionKey = `session:${decoded.sessionId}`
                const session = await redisClient.get(sessionKey);
                if (!session) {
                    console.warn('authMiddleware: session not found in redis', sessionKey);
                    return res.status(401).json({ success: false, message: 'Session expired' });
                }
            } catch (error) {
                console.error('authMiddleware: redis error', err.message);
                // allow proceed if redis is unavailable? choose to reject for safety
                return res.status(500).json({ success: false, message: 'Session store error' });
            }

        }
        req.user = decoded;
        next()

    } catch (error) {
        console.error('authMiddleware: token verify error', error.message);
        return res.status(401).json({ success: false, message: 'Unauthorized',error:error.message });
    }

}

export const adminMiddleware = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
};