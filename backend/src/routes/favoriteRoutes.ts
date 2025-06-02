import { Router } from 'express';
import * as favoriteController from '../controllers/favoriteController';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.post('/', authMiddleware, favoriteController.addFavorite);
router.get('/', authMiddleware, favoriteController.getFavorites);
router.delete('/:jobId', authMiddleware, favoriteController.removeFavorite);

export default router;
