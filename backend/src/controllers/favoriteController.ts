import { Request, Response } from 'express';
import * as favoriteService from '../services/favoriteService';
import { AuthRequest } from '../middlewares/auth';

export async function addFavorite(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const { jobTitle,jobUrl, jobCompany, jobLogo } = req.body;
  const jobId = Number(req.body.jobId); 

  try {
    const result = await favoriteService.addFavorite(
      userId,
      jobId,
      jobTitle,
      jobUrl,
      jobCompany,
      jobLogo
    );
    res.status(201).json(result);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
}

export async function getFavorites(req: AuthRequest, res: Response) {
  const userId = req.userId!;

  try {
    const favorites = await favoriteService.getFavorites(userId);
    res.status(200).json(favorites);
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
}

export async function removeFavorite(req: AuthRequest, res: Response) {
  const userId = req.userId!;
  const { jobId } = req.params;

  try {
    await favoriteService.removeFavorite(userId, Number(jobId));
    res.status(204).send();
    return;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
    return;
  }
}
