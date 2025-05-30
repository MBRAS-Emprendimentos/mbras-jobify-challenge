import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController.js';

const router = Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:jobId', removeFavorite);

export default router;
