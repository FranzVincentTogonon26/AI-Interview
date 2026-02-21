import express from 'express';
import cors from 'cors';

import { serve } from "inngest/express";
import { clerkMiddleware } from '@clerk/express'

import { ENV } from './libs/env.js';
import connectDB from './libs/db.js'
import { functions, inngest } from './libs/inngest.js';
import clerkRoutes from './middleware/clerk.routes.js';
import chatRoutes from './routes/chatRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js'

const app = express();
const PORT = ENV.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware())

// Webhooks 
app.use('/api/webhooks', clerkRoutes);
app.use('/api/inngest', serve({ client: inngest, functions }));

// Routes
app.use('/api/chat', chatRoutes);
app.use('/api/sessions', sessionRoutes);

connectDB().then( () => {
    app.listen( PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})