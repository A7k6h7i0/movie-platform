import express from 'express';
import { providerController } from '../controllers/providerController.js';

const router = express.Router();

router.get('/:id', providerController.getProviders);

export default router;
