import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (user) => {
    try {
        await streamClient.upsertUser(user);
        console.log('Stream user upserted successfully:', user)
    } catch (error) {
      console.log('Error upserting Stream User:', error);   
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await streamClient.deleteUser(userId);
        console.log('Stream user deleted successfully:', userId )
    } catch (error) {
      console.log('Error deleting Stream User:', error);   
    }
}