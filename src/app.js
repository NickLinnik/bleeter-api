import 'dotenv/config'
import express from 'express';
import Auth from './controllers/auth'

const app = express();
const port = '4000';

app.use(express.json())
app.use('/auth', new Auth().router)

app.listen(port, () => console.log(`Server started at http://localhost:${port} port`));