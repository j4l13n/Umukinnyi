import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from 'swagger-jsdoc';
import routes from './routes';

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(routes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the default Authors Haven API route'
}));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runningat ${port}`);
});

export default app;
