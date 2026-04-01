import express from 'express';
import { getExample, postExample } from '../controllers/exampleController.js';
import { validateBody } from '../utils/validation.js';
import { exampleSchema } from '../utils/validation.js';

const router = express.Router();

router.get('/', getExample);
router.post('/', validateBody(exampleSchema), postExample);

export default router;
