import express from 'express';
import { createUserWebhook } from '../controllers/clerk.controller.js'

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), createUserWebhook);

export default router;