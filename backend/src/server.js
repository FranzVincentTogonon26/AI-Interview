import express from 'express';

import { serve } from "inngest/express";
import { functions, inngest } from './libs/inngest.js';

import { ENV } from './libs/env.js';
import connectDB from './libs/db.js'

const app = express();
const PORT = ENV.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/inngest', serve({ client: inngest, functions }));

connectDB().then( () => {
    app.listen( PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
})