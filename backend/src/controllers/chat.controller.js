import { streamClient } from "../libs/stream.js"

export const getStreamToken = async (req, res) => {
    try {
        const token = streamClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        })
    } catch (error) {
        console.error('Error in getStreamToken controller', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            statusCode: 500
        })
    }
}