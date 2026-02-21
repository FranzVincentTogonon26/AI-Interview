import express from 'express';
import cors from 'cors';

import { serve } from "inngest/express";
import { functions, inngest } from './libs/inngest.js';
import { clerkMiddleware } from '@clerk/express'

import { ENV } from './libs/env.js';
import connectDB from './libs/db.js'
import clerkRoutes from './routes/clerk.routes.js';

const app = express();
const PORT = ENV.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware())

// Inngest Endpoint
app.use('/api/webhooks', clerkRoutes);
app.use('/api/inngest', serve({ client: inngest, functions }));

connectDB().then( () => {
    app.listen( PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})