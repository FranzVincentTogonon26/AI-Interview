import { verifyWebhook } from '@clerk/express/webhooks';
import  { inngest }  from '../libs/inngest.js'

export const createUserWebhook = async (req, res) => {
    try {
        const event = await verifyWebhook(req);
        if(!event){
            return res.status(400).json({message: 'Error verifying webhook'})
        }
        await inngest.send({
            name: 'clerk/user.created',
            data: event.data
        });
        return res.status(200).json({message: 'User created..'})
    } catch (error) {
        console.error('Error in getStreamToken controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}
