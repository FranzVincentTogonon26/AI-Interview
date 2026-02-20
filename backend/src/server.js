import express from 'express';

import { ENV } from './libs/env.js';
import connectDB from './libs/db.js'

const app = express();
const PORT = ENV.PORT || 8000;

connectDB().then( () => {
    app.listen( PORT, () => {
        console.log(`Server is running on port ${PORT}}`)
    })
})