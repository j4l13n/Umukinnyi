import express from 'express';
import userController from '../controllers/userController';
import SignupValidation from '../middlewares/signup';

const routes = express.Router();

routes.post('/signup', SignupValidation.signupvalidator, userController.signup);
routes.post('/login', userController.login);

export default routes;
