import { requireAuth } from '@clerk/express'
import User from '../models/user.model.js'

export const protectRoute = [
    requireAuth({ signInUrl: '/sign-in' }),
    async (req, res, next) => {
        try {
            const userId = req.auth().userId;
            if(!userId){
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized - Invalid Token',
                    statusCode: 401
                })
            } 

            const user = await User.findOne({userId});
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: 'User not found..',
                    statusCode: 404
                })
            }

            req.user = user;

            next();

        } catch (error) {
            console.error('Error in protected middleware', error.message);
            res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                statusCode: 500
            })
        }
    }
]