// form-service/routes/formRoutes.ts
import { Router } from 'express';
import { createForm, getForms, getFormById, submitForm, getAllForms } from '../controllers/formController';

const router = Router();

router.post('/create', createForm);
router.get('/forms', getForms);
router.get('/all/forms', getAllForms);
router.get('/:id', getFormById);
router.post('/submit/:id', submitForm);

export default router;
