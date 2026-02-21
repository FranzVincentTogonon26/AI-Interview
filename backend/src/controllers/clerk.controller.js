import { verifyWebhook } from '@clerk/express/webhooks';

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
        return res.status(200).json({
            success: true,
            message: 'User created..',
            statusCode: 200
        })
    } catch (err) {
        next(err);
    }
}
