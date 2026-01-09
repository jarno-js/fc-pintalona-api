import express from 'express';
import {
  getAllMatches,
  searchMatches,
  getUpcomingMatches,
  getCompletedMatches,
  getMatchById,
  createMatch,
  updateMatch,
  deleteMatch
} from '../controllers/matchesController.js';
import {
  getMatchStats,
  createMatchStats
} from '../controllers/matchStatsController.js';
import { validateMatch, validateMatchStats } from '../middleware/validation.js';

const router = express.Router();

// GET routes
router.get('/', getAllMatches);
router.get('/search', searchMatches);
router.get('/upcoming', getUpcomingMatches);
router.get('/completed', getCompletedMatches);
router.get('/:id', getMatchById);
router.get('/:id/stats', getMatchStats);

// POST routes
router.post('/', validateMatch, createMatch);
router.post('/:id/stats', validateMatchStats, createMatchStats);

// PUT routes
router.put('/:id', validateMatch, updateMatch);

// DELETE routes
router.delete('/:id', deleteMatch);

export default router;
