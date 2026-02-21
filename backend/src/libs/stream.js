import { StreamChat } from 'stream-chat';
import { StreamClient } from '@stream-io/node-sdk';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const streamClient = new StreamClient(apiKey, apiSecret); // for videocalls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // for chat messaging

export const upsertStreamUser = async (user) => {
    try {
        await chatClient.upsertUser(user);
        console.log('Stream user upserted successfully:', user)
    } catch (error) {
      console.log('Error upserting Stream User:', error);   
    }
}

export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log('Stream user deleted successfully:', userId )
    } catch (error) {
      console.log('Error deleting Stream User:', error);   
    }
}