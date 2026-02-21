import express from 'express'
import { protectRoute } from '../middleware/clerk.protect.route.js';
import { 
    createSession, 
    getActiveSession, 
    getRecentSession, 
    getSessionById, 
    joinSession, 
    endSession 
} from '../controllers/session.controller.js';

const router = express.Router();

router.post('/', protectRoute, createSession);
router.get('/active', protectRoute, getActiveSession);
router.get('/recent-session', protectRoute, getRecentSession);

router.get('/:id', protectRoute, getSessionById);
router.post('/:id/join', protectRoute, joinSession);
router.post('/:id/end', protectRoute, endSession);

export default router;