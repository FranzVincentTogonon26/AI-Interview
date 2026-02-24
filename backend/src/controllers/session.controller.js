import { chatClient, streamClient } from "../libs/stream.js";
import Session from "../models/session.model.js";

export const createSession = async (req, res) => {
    try {
        const { problem, difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        if(!problem || !difficulty) return res.status(400).json({message: 'Problem and Difficulty are required'})

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        });
        
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerkId,
                custom: {
                    problem,
                    difficulty,
                    sessionId: session._id.toString()
                }
            }
        });

        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} Session`,
            created_by_id: clerkId,
            members: [clerkId]
        })

        await channel.create();

        res.status(201).json({session})

    } catch (error) {
        console.error('Error in creatSession controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getActiveSession = async (_, res) => {
    try {
        const session = await Session.find({status:"active"})
                                      .populate("host","name profileImage email clerkId")
                                      .populate("participant","name profileImage email clerkId")
                                      .sort({createdAt:-1})
                                      .limit(20);
        res.status(200).json({session});

    } catch (error) {
        console.error('Error in getActiveSessions controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getRecentSession = async (req, res) => {
    try {
        const userId = req.user._id;
        const session = await Session.find({
            status:"completed",
            $or: [{host: userId}, {participant: userId}]
        }).sort({createdAt:-1}).limit(20);
        res.status(200).json({session});
    } catch (error) {
        console.error('Error in getRecentSession controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const getSessionById = async (req, res) => {
    try {
        const { id } = req.params;
        const session = await Session.findById(id)
                                      .populate("host", "name email profileImage clerkId")
                                      .populate("participant", "name email profileImage clerkId");
        
        if(!session) return res.status(404).json({message: 'Session not found..'}) 

        res.status(200).json({session});

    } catch (error) {
        console.error('Error in getSessionById controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const joinSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;
        const session = await Session.findById(id);

        if(!session) return res.status(404).json({message: 'Session not found..'}) 
            
        if(session.status !== "active") return res.status(400).json({message: 'Cannot join a completed session..'})

        if(session.host.toString() === userId.toString()) return res.status(400).json({message: 'Host cannot join their own session as participant'})

        if(session.participant) return res.status(409).json({message: 'Session is full..'})   

        session.participant = userId;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerkId]);

        res.status(200).json({session})

    } catch (error) {
        console.error('Error in joinSession controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}

export const endSession = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const session = await Session.findById(id);

        if(!session) return res.status(404).json({message: 'Session not found..'})  

        // check if the user is host
        if(session.host.toString() !== userId.toString()) return res.status(403).json({message: 'Only the Host can End the Session..'})   

        // check if the session is already completed
        if(session.status === "completed") return res.status(400).json({message: 'Session is already completed'})   

        // deleted stream video call
        const call = streamClient.video.call("default", session.callId);
        await call.delete({hard:true});

        // delete stream chat channel
        const channel =chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        res.status(200).json({session, message: "Session ended successfully.."});

    } catch (error) {
        console.error('Error in endSession controller', error.message);
        res.status(500).json({message: 'Internal Server Error'})
    }
}