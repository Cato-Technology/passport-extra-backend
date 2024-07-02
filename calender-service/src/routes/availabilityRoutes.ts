// routes/availabilityRoutes.ts
import { Router } from 'express';
import { getAdminAvailability, setAdminAvailability } from '../controllers/availabilityController';

const router = Router();
router.get('/availability/:month/:year', getAdminAvailability);
router.post('/availability', setAdminAvailability);

export default router;
