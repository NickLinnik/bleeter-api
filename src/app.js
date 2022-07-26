import 'dotenv/config';
import express from 'express';
import AuthController from './controllers/authController';
import UsersController from './controllers/usersController';
import AdminController from './controllers/adminController';
import {User} from './models';

const app = express();
const authController = new AuthController();

app.use(express.json());

app.use('/auth', authController.router);
app.use(authController.authorizeUser);
app.use('/admin', authController.authorizeAdmin);

app.use('/admin', new AdminController().router);
app.use('/users', new UsersController().router);

app.listen(process.env.PORT, () =>
  console.log(`Server started at http://${process.env.HOST}:${process.env.PORT} port`));
