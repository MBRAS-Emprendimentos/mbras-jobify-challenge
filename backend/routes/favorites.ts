import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favoriteController';

const router = Router();

router.get('/', getFavorites);
router.post('/', addFavorite);
router.delete('/:jobId', removeFavorite);

export default router;
