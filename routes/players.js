import express from 'express';
import {
  getAllPlayers,
  searchPlayers,
  getPlayerById,
  getPlayerStats,
  getPlayerInjuries,
  createPlayer,
  updatePlayer,
  deletePlayer
} from '../controllers/playersController.js';
import { validatePlayer } from '../middleware/validation.js';

const router = express.Router();

// GET routes
router.get('/', getAllPlayers);
router.get('/search', searchPlayers);
router.get('/:id', getPlayerById);
router.get('/:id/stats', getPlayerStats);
router.get('/:id/injuries', getPlayerInjuries);

// POST routes
router.post('/', validatePlayer, createPlayer);

// PUT routes
router.put('/:id', validatePlayer, updatePlayer);

// DELETE routes
router.delete('/:id', deletePlayer);

export default router;
