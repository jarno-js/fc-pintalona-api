import express from 'express';
import {
  updateMatchStats,
  deleteMatchStats
} from '../controllers/matchStatsController.js';
import {
  getTopScorers,
  getTopAssists,
  getCardStatistics,
  getTeamStatistics
} from '../controllers/statisticsController.js';
import { validateMatchStats } from '../middleware/validation.js';

const router = express.Router();

// Statistics endpoints
router.get('/topscorers', getTopScorers);
router.get('/assists', getTopAssists);
router.get('/cards', getCardStatistics);
router.get('/team', getTeamStatistics);

// Match stats CRUD (voor individuele stats records)
router.put('/:id', validateMatchStats, updateMatchStats);
router.delete('/:id', deleteMatchStats);

export default router;
