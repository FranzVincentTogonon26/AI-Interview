import { verifyWebhook } from '@clerk/express/webhooks';
import  { inngest }  from '../libs/inngest.js'

export const createUserWebhook = async (req, res, next) => {
    try {
        const event = await verifyWebhook(req);
        if(!event){
            return res.status(400).json({
                success: false,
                message: 'Error verifying webhook',
                statusCode: 400
            })
        }
        await inngest.send({
            name: 'clerk/user.created',
            data: event.data
        });
        return res.status(200).json({
            success: true,
            message: 'User created..',
            statusCode: 200
        })
    } catch (err) {
        next(err);
    }
}
