import express from 'express';
import { submitComplaint, getAllComplaints } from '../controllers/dmcaController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/submit', submitComplaint);
router.get('/complaints', protect, getAllComplaints);

export default router;
