import express from 'express';
import models from './models';

const {User} = models;

const app = express();
const port = '4000';

app.listen(port, () => console.log(`Server started at ${port} port`));