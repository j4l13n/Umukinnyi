import express from 'express';
import playerController from '../controllers/playerController';

const routes = express.Router();

routes.post('/players', playerController.createPlayer);
routes.get('/players', playerController.getAllPlayers);
routes.put('/players/:id', playerController.updatePlayer);

export default routes;
