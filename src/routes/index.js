import express from 'express';
import users from './users';
import players from './players';

const routes = express.Router();

routes.use('/api', users);
routes.use('/api', players);

export default routes;
