import express from 'express';
import {
  getAllInjuries,
  getActiveInjuries,
  createInjury,
  updateInjury,
  deleteInjury
} from '../controllers/injuriesController.js';
import { validateInjury } from '../middleware/validation.js';

const router = express.Router();

// GET routes
router.get('/', getAllInjuries);
router.get('/active', getActiveInjuries);

// POST routes
router.post('/', validateInjury, createInjury);

// PUT routes
router.put('/:id', validateInjury, updateInjury);

// DELETE routes
router.delete('/:id', deleteInjury);

export default router;
