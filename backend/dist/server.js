import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './config/db.js';
import favoriteRoutes from './routes/favorites.js';
import './models/Favorite.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/favorites', favoriteRoutes);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado ao banco com sucesso!');
        await sequelize.sync({ force: true });
        console.log('Tabelas sincronizadas');
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.error('Erro ao iniciar o servidor:', error);
    }
};
start();
