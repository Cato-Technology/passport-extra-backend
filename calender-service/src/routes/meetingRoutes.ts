// routes/meetingRoutes.ts
import { Router } from 'express';
import { scheduleMeeting, getMeetings } from '../controllers/meetingController';

const router = Router();
router.post('/meetings/schedule', scheduleMeeting);
router.get('/meetings/:month/:year', getMeetings);

export default router;
