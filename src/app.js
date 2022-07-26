import 'dotenv/config';
import express from 'express';
import AuthController from './controllers/authController';
import UsersController from './controllers/usersController';

const app = express();
const authController = new AuthController();
const usersController = new UsersController();

app.use(express.json());

app.use('/auth', authController.router);
app.use(authController.authorize);
app.use('/users', usersController.router);

app.listen(process.env.PORT, () =>
  console.log(`Server started at http://${process.env.HOST}:${process.env.PORT} port`));
