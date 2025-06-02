import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { corsMiddleware } from './middlewares/cors';
import favoriteRoutes from './routes/favoriteRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(corsMiddleware);

app.use('/auth', authRoutes);
app.use('/favorites', favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});