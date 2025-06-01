import { Request, Response } from 'express';
import { Favorite } from '../models/Favorite.js';

export const getFavorites = async (_: Request, res: Response) => {
  const favorites = await Favorite.findAll();
  res.json(favorites);
};

export const addFavorite = async (req: Request, res: Response) => {
  const { jobId, title, company } = req.body;
  try {
    const [favorite, created] = await Favorite.findOrCreate({
      where: { jobId },
      defaults: { title, company }
    });
    res.json(favorite);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao favoritar vaga.' });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  try {
    await Favorite.destroy({ where: { jobId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover favorito.' });
  }
};
